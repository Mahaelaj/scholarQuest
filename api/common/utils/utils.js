const pify = require('pify');

/**
 * miscellaneous utilities used everywhere
 */
class Utils {

    /*
	 * returns the current environment in effect from web.config file of the api
	 */
	static async detectConfigEnvironment() {
        
    // get the current environment in effect
    let configxml = fs.readFileSync(`${__dirname}/../../web.config`, { encoding: 'utf8' });

    // parse the config file
    let xml = await pify(xml2js.parseString)(configxml);

    // return the node environment - should be development, staging (sb1, sb2, sb3) or production
    return xml.configuration['system.webServer'][0].iisnode[0]['$'].node_env;
}

}