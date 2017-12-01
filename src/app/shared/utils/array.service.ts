import { Injectable } from '@angular/core';

@Injectable()
export class ArrayService {
    
    constructor() {
    }

    /*
     * shuffle an array
     */ 
    shuffle(arr: any[]) {
        var returnArr  = arr.slice();
        for (let i = returnArr.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = returnArr[i];
            returnArr[i] = returnArr[j];
            returnArr[j] = temp;
        }
        return returnArr;
    }

    /*
     * select a random elements from an array
     */ 
    selectRandom(arr: any[], num: number) {
       var tempArr = arr.slice();
        var returnArr = [];
        for(let i = 0; i< num; i++){ 
            returnArr.push(tempArr.splice(Math.floor(Math.random() * tempArr.length), 1)[0]);
        }
        return returnArr;
    }
}
