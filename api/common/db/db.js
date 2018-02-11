/**
 * mysql connection handler at the beginning of the request
 * @param {Object} ctx
 * @param {Function} next
 */

 // get the standard promise-mysql object to decorate
const mysql = require('mysql2/promise');

async function mysqlConnection(ctx, next) {

    // get a new mysql connection from the pool - the error handling for this is separate because we have not added the error handler middleware yet
    // adding the error handler middleware before this step somehow results in a lock-up after the first error - probably something to do with the release of db connection
    try {
        ctx.db = await getDbConnection(ctx.app.env, false);
    } catch (err) {
        ctx.status = 500;
        ctx.body = { status: 'Error', error: 'Cannot connect to the database.' };
        ctx.log.error(err);
        return;
    }

    // continue with the api handling middleware
    await next();

    // return connection back to the pool as the control comes back up (through error or success)
    ctx.db.release();
}

/**
 * decorator for additional easy mysql access functions - multiple statements flag determines if we will be allowed to execute multiple statements in a single call
 * disabled for online - used only for batch execution of db patches
 */
async function getDbConnection(env, multipleStatements) {
    // initialize the connection pool if it was not initialized already
    if (!global.connectionPool) {
        global.connectionPool = mysql.createPool({
            connectionLimit: 100,
            host     : 'us-cdbr-iron-east-05.cleardb.net',
            user     : 'b553ca7a78e543',
            password : '1aaa6461',
            database : 'heroku_ef33faaed6da36b'
        });
    }
    // get standard database connection from the pool
    var db = await global.connectionPool.getConnection();

    // enable named parameters in queries
    db.connection.config.namedPlaceholders = true;

    // cache the native mysql2 node execute function
    db._execute = db.execute;
    // wrap the native execute method so we can convert properties of params from undefined to null because undefined crashes mysql2 and causes multiple restarts
    db.execute = function (sql, params) {

        if (params && typeof params === 'object') {

            for (let param in params) {

                if (!params.hasOwnProperty(param)) continue;

                // convert undefined to null to prevent mysql2 node module crashes
                if (params[param] === undefined) params[param] = null;
            }
        }

        return db._execute(sql, params);
    };
    // cache the native mysql2 node query function
    db._query = db.query;

    // wrap the native query method so we can convert properties of params from undefined to null because undefined crashes mysql2 and causes multiple restarts
    db.query = function (sql, params) {

        if (params instanceof Array) {

            for (let i = 0; i < params.length; i++) {

                // convert undefined to null to prevent mysql2 node module crashes
                if (params[i] === undefined) params[i] = null;
            }
        }
        let q = db._query(sql, params);

        return q;
    };

    /*
    * function to copy a table to a new table name. used for ETL and drops the table if it exists already. This also brings data
    */
    db.copy_table = async ({ table_to_copy, new_table_name }) => {
        await db.query(`DROP TABLE IF EXISTS ${new_table_name}`);
        await db.query(`CREATE TABLE ${new_table_name} LIKE ${table_to_copy}`);
        await db.query(`INSERT ${new_table_name} SELECT * FROM ${table_to_copy}`);
    };

    /*
        * function to return all rows from a select query
        */
    db.select_all = async function(sql, params) {
        // execute the query and get the results
        let result = await db.query(sql, params);

        // now go through the columns and convert booleans as needed
        for (let col of result[1]) if (col.columnType == 1 && col.columnLength == 1) for (let row of result[0]) if (row[col.name] == 1) row[col.name] = true; else row[col.name] = false;

        // if there are no results, just return an empty array - otherwise the results are located in the first element of the array
        if (result[0]) return result[0]; else return [];
    };

    /*
        * function to return all rows from a select query as an associative array
        */
    db.select_assoc = async function(sql, params) {

        // execute the query and get the result
        const results = await this.select_all(sql, params);

        // loop through the array and build an associative version of it (object)
        var assoc_results = {};
        results.forEach(function (row) { assoc_results[row[Object.keys(row)[0]]] = row[Object.keys(row)[1]]; });
        return assoc_results;
    };

    /*
        * function to return first row from a select query
        */
    db.select_row = async function(sql, params) {

        // get all the records coming from select SQL
        const rows = await this.select_all(sql, params);

        // if there are no rows, return false;
        if (!rows[0]) return false;

        // return the row
        return rows[0];
    };

    /*
        * function to return first column of the first row from a select query
        */
    db.select_val = async function(sql, params) {

        // get the first row coming from the Select SQL
        const row = await this.select_row(sql, params);

        // if there are no rows coming in the result, return false
        if (!row) return false;

        // return the first column of the first row
        return row[Object.keys(row)[0]];
    };

    /*
        * function to insert a record to a table
        */
    db.insert = async function(table, fields, ignoreduplicates, replace) {

        // prepare the insert SQL
        let sql = `${(replace ? 'replace ' : 'insert ') + (ignoreduplicates ? 'ignore ' : '')} into ${table} set `;
        for (let field in fields) sql += ` ${field} = :${field},`;
        sql = sql.slice(0, -1);

        // if some of the fields are boolean, convert them to integers
        for (let field in fields) if (typeof(fields[field]) == 'boolean') fields[field] = (fields[field] ? 1 : 0);

        // execute the SQL and get the result in case the query returns an insert ID (for tables with auto_increment keys)
        const result = await this.execute(sql, fields);

        // return insert ID if there is one in the result set - otherwise return zero
        if (result[0] && result[0].insertId) return result[0].insertId; else return 0;
    };

    /*
        * function to update a record in a table
        */
    db.update = async function(table, fields, keyfield, constantfields, sqlfields, keysfieldnewval) {

        // prepare the update sql statement
        let sql = `update ${table} set `;
        if (fields) for (let col in fields) if (col != keyfield) sql += ` ${col} = :${col},`;
        if (constantfields) constantfields.forEach(function (col) { if (col != keyfield) sql += ` ${col} = ${col},`; });
        if (sqlfields) for (let col in sqlfields) if (col != keyfield) sql += ` ${col} = ${sqlfields[col]},`;
        if (keysfieldnewval) sql += ` ${keyfield} = :keyfieldnewval,`;
        sql = sql.slice(0, -1);
        sql += ` where ${keyfield} = :${keyfield}`;

        // if some of the fields are boolean, convert them to integers
        for (let field in fields) if (typeof(fields[field]) == 'boolean') fields[field] = (fields[field] ? 1 : 0);

        // if the key field is getting updated, add it to the parameters
        if (keysfieldnewval) fields.keyfieldnewval = keysfieldnewval;

        // execute the update sql statement
        return await this.execute(sql, fields);
    };

    /*
    * function to insert if record does not exist or update if existed
    */
    db.upsert = (table, fields, keys = Object.keys(fields)) => db.upsertMultiple(table, keys, [ fields ]);

    /**
     * upserts multiple rows at once
     */
    db.upsertMultiple = (table, keys, arrayRowsObject) => {

        // if there are no rows to upsert, just return null to avoid an error
        if (!arrayRowsObject.length) return null;

        const arrayRowsArray = [];
        for (let row of arrayRowsObject) {
            arrayRowsArray.push(keys.map(key => row[key]));
        }
        const sql = `INSERT INTO ${table} (${keys.join(', ')}) VALUES ? ON DUPLICATE KEY UPDATE ${keys.map(key => `${key} = VALUES(${key})`).join(',\n')}`;
        return db.query(sql, [ arrayRowsArray ]);
    };

    /*
    * function to delete a record in a table
    */
    db.delete = async function(table, keyfield, keyval) {

        // prepare delete sql statement
        let sql = `delete from ${table} where ${keyfield} = ?`;

        // execute the delete sql statement
        return await this.execute(sql, [ keyval ]);
    };

    /*
    * function to delete a record in a table
    */
    db.delete_all = async function(table) {

        // prepare delete sql statement
        let sql = `truncate table ${table}`;

        // execute the delete sql statement
        return await this.execute(sql);
    };

    // shorten the escape method
    db.escape = value => db.connection.escape(value);

    // return the new connection
    return db;
}

// export mysql connection generator function
module.exports = {
	connect: mysqlConnection
};