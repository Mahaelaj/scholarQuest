import { Injectable } from '@angular/core';


@Injectable()
export class CookiesService {
    
    /*
     * get the value of a cookie
     */ 
    getCookie(cname: string) {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for(var i = 0; i <ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    addCookie(cookieKey: string, cookieValue: string) {
        document.cookie = cookieKey + '=' + cookieValue + '; Path=/;';
    }

    removeCookie(cname: string) {
        document.cookie = cname +'=; Path=/;';
    }
}
