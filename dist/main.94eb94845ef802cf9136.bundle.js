webpackJsonp([12],{0:function(e,n,l){e.exports=l("cDNt")},"1LJl":function(e,n,l){"use strict";l.d(n,"a",function(){return o});var t=l("Dqrr"),o=(l.n(t),function(){function e(){this.cursorFollower0={img:"../assets/clip-art/None.png",index:1},this.cursorFollower1={img:"../assets/cursor-followers/EyesFollower.jpg",index:2},this.cursorFollowers=[],this.selectedCursorFollower=new t.BehaviorSubject(1),this.cursorFollowers.push(this.cursorFollower0),this.cursorFollowers.push(this.cursorFollower1)}return e.prototype.getCursorFollowers=function(){return this.cursorFollowers},e.ctorParameters=function(){return[]},e}())},EAJ2:function(e,n,l){"use strict";l.d(n,"a",function(){return t});var t=function(){function e(){}return e.prototype.getCookie=function(e){for(var n=e+"=",l=decodeURIComponent(document.cookie),t=l.split(";"),o=0;o<t.length;o++){for(var r=t[o];" "==r.charAt(0);)r=r.substring(1);if(0==r.indexOf(n))return r.substring(n.length,r.length)}return""},e.prototype.addCookie=function(e,n){document.cookie=e+"="+n+"; Path=/;"},e.prototype.removeCookie=function(e){document.cookie=e+"=; Path=/;"},e}()},GYNS:function(e,n,l){"use strict";l.d(n,"a",function(){return t});var t=function(){function e(){}return e.prototype.shuffle=function(e){for(var n=e.slice(),l=n.length-1;l>0;l--){var t=Math.floor(Math.random()*(l+1)),o=n[l];n[l]=n[t],n[t]=o}return n},e.prototype.selectRandom=function(e,n){for(var l=e.slice(),t=[],o=0;o<n;o++)t.push(l.splice(Math.floor(Math.random()*l.length),1)[0]);return t},e.ctorParameters=function(){return[]},e}()},UX1e:function(e,n,l){"use strict";l.d(n,"a",function(){return r});var t=l("Dqrr"),o=(l.n(t),l("xrDH")),r=(l.n(o),function(){function e(){this.selectedCursor=new t.Subject,this.cursors=[{img:"../assets/clip-art/None.png",index:1},{img:"../assets/cursors/cursor_green.png",storeImg:"../assets/cursors/cursor_green_store.png",index:2},{img:"../assets/cursors/cursor_red.png",storeImg:"../assets/cursors/cursor_red_store.png",index:3},{img:"../assets/cursors/cursor_yellow.png",storeImg:"../assets/cursors/cursor_yellow_store.png",index:4},{img:"../assets/cursors/cursor_blue.png",storeImg:"../assets/cursors/cursor_blue_store.png",index:5}]}return e.prototype.getCursors=function(){return this.cursors},e.prototype.getCursorByIndex=function(e){return o.find(this.cursors,{index:e}).img},e}())},VHzl:function(e,n,l){"use strict";l.d(n,"a",function(){return o});var t=l("Dqrr"),o=(l.n(t),function(){function e(){this.coins=new t.Subject}return e.ctorParameters=function(){return[]},e}())},cDNt:function(e,n,l){"use strict";function t(e){return L._46(0,[(e()(),L._23(0,0,null,null,0,"img",[["class","logo"],["src","../assets/clip-art/SQ.png"]],null,null,null,null,null))],null,null)}function o(e){return L._46(0,[(e()(),L._23(0,0,null,null,1,"sq-home",[],null,null,null,t,M)),L._21(1,49152,null,0,q,[],null,null)],null,null)}function r(e){return X._46(0,[(e()(),X._23(0,0,null,null,7,"a",[["id","coinWrapper"]],null,null,null,null,null)),(e()(),X._44(-1,null,["\n            "])),(e()(),X._23(2,0,null,null,0,"img",[["class","coin"],["src","../assets/clip-art/GoldCoin.png"]],null,null,null,null,null)),(e()(),X._44(3,null,["","\n            "])),X._40(4,2),(e()(),X._23(5,0,null,null,0,"img",[["class","coin"],["src","../assets/clip-art/SilverCoin.png"]],null,null,null,null,null)),(e()(),X._44(6,null,["","\n        "])),X._40(7,2)],null,function(e,n){var l=n.component;e(n,3,0,X._45(n,3,0,e(n,4,0,X._37(n.parent,0),l.goldCoins,"2.0-0"))),e(n,6,0,X._45(n,6,0,e(n,7,0,X._37(n.parent,0),l.silverCoins,"2.0-0")))})}function u(e){return X._46(0,[(e()(),X._23(0,0,null,null,6,"button",[["class","mat-button"],["color","primary"],["mat-button",""]],[[8,"disabled",0]],[[null,"click"]],function(e,n,l){var t=!0;if("click"===n){t=!1!==X._37(e,4).onClick()&&t}return t},D.b,D.a)),X._21(1,16384,null,0,N.u,[],null,null),X._21(2,180224,null,0,T.b,[X.Q,X.q,G.a,R.h],{color:[0,"color"]},null),X._21(3,16384,null,0,T.c,[],null,null),X._21(4,16384,null,0,U.m,[U.l,U.a,[8,null],X.Q,X.q],{routerLink:[0,"routerLink"]},null),X._38(5,1),(e()(),X._44(-1,0,["Sign Up"]))],function(e,n){e(n,2,0,"primary"),e(n,4,0,e(n,5,0,"/auth/signup"))},function(e,n){e(n,0,0,X._37(n,2).disabled||null)})}function i(e){return X._46(0,[(e()(),X._23(0,0,null,null,6,"button",[["class","mat-button"],["color","primary"],["mat-button",""]],[[8,"disabled",0]],[[null,"click"]],function(e,n,l){var t=!0;if("click"===n){t=!1!==X._37(e,4).onClick()&&t}return t},D.b,D.a)),X._21(1,16384,null,0,N.u,[],null,null),X._21(2,180224,null,0,T.b,[X.Q,X.q,G.a,R.h],{color:[0,"color"]},null),X._21(3,16384,null,0,T.c,[],null,null),X._21(4,16384,null,0,U.m,[U.l,U.a,[8,null],X.Q,X.q],{routerLink:[0,"routerLink"]},null),X._38(5,1),(e()(),X._44(-1,0,["Login"]))],function(e,n){e(n,2,0,"primary"),e(n,4,0,e(n,5,0,"/auth/login"))},function(e,n){e(n,0,0,X._37(n,2).disabled||null)})}function s(e){return X._46(0,[(e()(),X._23(0,0,null,null,4,"button",[["class","mat-button"],["color","primary"],["mat-button",""]],[[8,"disabled",0]],[[null,"click"]],function(e,n,l){var t=!0,o=e.component;if("click"===n){t=!1!==o.logout()&&t}return t},D.b,D.a)),X._21(1,16384,null,0,N.u,[],null,null),X._21(2,180224,null,0,T.b,[X.Q,X.q,G.a,R.h],{color:[0,"color"]},null),X._21(3,16384,null,0,T.c,[],null,null),(e()(),X._44(-1,0,["Logout"]))],function(e,n){e(n,2,0,"primary")},function(e,n){e(n,0,0,X._37(n,2).disabled||null)})}function a(e){return X._46(0,[X._39(0,V.d,[X.D]),(e()(),X._23(1,0,null,null,51,"mat-toolbar",[["class","menu-toolbar mat-toolbar"],["fxFlex",""],["md-scroll-shrink",""],["role","toolbar"]],null,null,null,Y.b,Y.a)),X._21(2,737280,null,0,W.e,[W.m,X.q,X.Q,[3,W.h],[3,W.j]],{flex:[0,"flex"]},null),X._21(3,16384,null,0,N.u,[],null,null),X._21(4,49152,null,0,Z.a,[X.Q,X.q],null,null),(e()(),X._44(-1,0,["\n    "])),(e()(),X._23(6,0,null,0,45,"div",[["class","container max-width"],["fxFlex","95"],["fxFlex.gt-md","1164px"],["fxLayout","row"],["fxLayoutAlign","center center"],["fxLayoutGap","25px"]],null,null,null,null,null)),X._21(7,737280,null,0,W.h,[W.m,X.q,X.Q],{layout:[0,"layout"]},null),X._21(8,1785856,null,0,W.i,[W.m,X.q,X.Q,[2,W.h],X.J],{gap:[0,"gap"]},null),X._21(9,737280,null,0,W.g,[W.m,X.q,X.Q,[2,W.h]],{align:[0,"align"]},null),X._21(10,737280,null,0,W.e,[W.m,X.q,X.Q,[3,W.h],[3,W.j]],{flex:[0,"flex"],flexGtMd:[1,"flexGtMd"]},null),(e()(),X._44(-1,null,["\n        "])),(e()(),X._23(12,0,null,null,6,"button",[["class","navbar-brand mat-button"],["color","primary"],["mat-button",""]],[[8,"disabled",0]],[[null,"click"]],function(e,n,l){var t=!0;if("click"===n){t=!1!==X._37(e,16).onClick()&&t}return t},D.b,D.a)),X._21(13,16384,null,0,N.u,[],null,null),X._21(14,180224,null,0,T.b,[X.Q,X.q,G.a,R.h],{color:[0,"color"]},null),X._21(15,16384,null,0,T.c,[],null,null),X._21(16,16384,null,0,U.m,[U.l,U.a,[8,null],X.Q,X.q],{routerLink:[0,"routerLink"]},null),X._38(17,1),(e()(),X._44(-1,0,["SQ"])),(e()(),X._44(-1,null,["\n        "])),(e()(),X._23(20,0,null,null,6,"button",[["class","mat-button"],["color","primary"],["mat-button",""]],[[8,"disabled",0]],[[null,"click"]],function(e,n,l){var t=!0;if("click"===n){t=!1!==X._37(e,24).onClick()&&t}return t},D.b,D.a)),X._21(21,16384,null,0,N.u,[],null,null),X._21(22,180224,null,0,T.b,[X.Q,X.q,G.a,R.h],{color:[0,"color"]},null),X._21(23,16384,null,0,T.c,[],null,null),X._21(24,16384,null,0,U.m,[U.l,U.a,[8,null],X.Q,X.q],{routerLink:[0,"routerLink"]},null),X._38(25,1),(e()(),X._44(-1,0,["Home"])),(e()(),X._44(-1,null,["\n        "])),(e()(),X._23(28,0,null,null,6,"button",[["class","mat-button"],["color","primary"],["mat-button",""]],[[8,"disabled",0]],[[null,"click"]],function(e,n,l){var t=!0;if("click"===n){t=!1!==X._37(e,32).onClick()&&t}return t},D.b,D.a)),X._21(29,16384,null,0,N.u,[],null,null),X._21(30,180224,null,0,T.b,[X.Q,X.q,G.a,R.h],{color:[0,"color"]},null),X._21(31,16384,null,0,T.c,[],null,null),X._21(32,16384,null,0,U.m,[U.l,U.a,[8,null],X.Q,X.q],{routerLink:[0,"routerLink"]},null),X._38(33,1),(e()(),X._44(-1,0,["Games"])),(e()(),X._44(-1,null,["\n        "])),(e()(),X._23(36,0,null,null,0,"span",[["flex",""]],null,null,null,null,null)),(e()(),X._44(-1,null,["\n        "])),(e()(),X._17(16777216,null,null,1,null,r)),X._21(39,16384,null,0,V.k,[X._5,X._0],{ngIf:[0,"ngIf"]},null),(e()(),X._44(-1,null,["\n        "])),(e()(),X._23(41,0,null,null,0,"span",[["flex",""]],null,null,null,null,null)),(e()(),X._44(-1,null,["\n        "])),(e()(),X._17(16777216,null,null,1,null,u)),X._21(44,16384,null,0,V.k,[X._5,X._0],{ngIf:[0,"ngIf"]},null),(e()(),X._44(-1,null,["\n        "])),(e()(),X._17(16777216,null,null,1,null,i)),X._21(47,16384,null,0,V.k,[X._5,X._0],{ngIf:[0,"ngIf"]},null),(e()(),X._44(-1,null,["\n        "])),(e()(),X._17(16777216,null,null,1,null,s)),X._21(50,16384,null,0,V.k,[X._5,X._0],{ngIf:[0,"ngIf"]},null),(e()(),X._44(-1,null,["\n    "])),(e()(),X._44(-1,0,["\n"]))],function(e,n){var l=n.component;e(n,2,0,"");e(n,7,0,"row");e(n,8,0,"25px");e(n,9,0,"center center");e(n,10,0,"95","1164px");e(n,14,0,"primary"),e(n,16,0,e(n,17,0,"/"));e(n,22,0,"primary"),e(n,24,0,e(n,25,0,"/profile"));e(n,30,0,"primary"),e(n,32,0,e(n,33,0,"/games")),e(n,39,0,l.userService.isLoggedIn()),e(n,44,0,!l.userService.isLoggedIn()),e(n,47,0,!l.userService.isLoggedIn()),e(n,50,0,l.userService.isLoggedIn())},function(e,n){e(n,12,0,X._37(n,14).disabled||null),e(n,20,0,X._37(n,22).disabled||null),e(n,28,0,X._37(n,30).disabled||null)})}function c(e){return X._46(0,[(e()(),X._23(0,0,null,null,1,"sq-navbar",[],null,null,null,a,te)),X._21(1,4243456,null,0,B,[U.l,K.a,$.a,ee.a,ne.a],null,null)],null,null)}function h(e){return se._46(0,[se._42(402653184,1,{leftEye:0}),se._42(402653184,2,{leftEyeball:0}),se._42(402653184,3,{rightEye:0}),se._42(402653184,4,{rightEyeball:0}),(e()(),se._23(4,0,null,null,9,"div",[],null,null,null,null,null)),(e()(),se._44(-1,null,["\n    "])),(e()(),se._23(6,0,[[1,0],["lOEye",1]],null,2,"div",[["class","outerEye"],["id","lOEye"]],[[24,"@move",0]],[[null,"@move.done"]],function(e,n,l){var t=!0,o=e.component;if("@move.done"===n){t=!1!==o.onDone(l)&&t}return t},null,null)),(e()(),se._44(-1,null,["    \n        "])),(e()(),se._23(8,0,[[2,0],["lIEye",1]],null,0,"div",[["class","innerEye"],["id","lIEye"]],null,null,null,null,null)),(e()(),se._44(-1,null,["\n    "])),(e()(),se._23(10,0,[[3,0],["rOEye",1]],null,2,"div",[["class","outerEye"],["id","rOEye"]],null,null,null,null,null)),(e()(),se._44(-1,null,["\n        "])),(e()(),se._23(12,0,[[4,0],["rIEye",1]],null,0,"div",[["class","innerEye"],["id","rIEye"]],null,null,null,null,null)),(e()(),se._44(-1,null,["\n"])),(e()(),se._44(-1,null,["\n"]))],null,function(e,n){e(n,6,0,n.component.moveState)})}function p(e){return se._46(0,[(e()(),se._23(0,0,null,null,1,"sq-eyes",[],null,null,null,h,ce)),se._21(1,4243456,null,0,ie,[se.P],null,null)],null,null)}function _(e){return ye._46(0,[(e()(),ye._23(0,0,null,null,4,"div",[],null,null,null,null,null)),(e()(),ye._44(-1,null,["\n        "])),(e()(),ye._23(2,0,null,null,1,"sq-eyes",[],null,null,null,h,ce)),ye._21(3,4243456,null,0,ie,[ye.P],{xPos:[0,"xPos"],yPos:[1,"yPos"]},null),(e()(),ye._44(-1,null,["\n    "]))],function(e,n){var l=n.component;e(n,3,0,l.xPos,l.yPos)},null)}function y(e){return ye._46(0,[ye._42(402653184,1,{cursorFollower:0}),(e()(),ye._23(1,16777216,[[1,3],["cursorFollower",1]],null,0,"div",[],null,null,null,null,null)),(e()(),ye._44(-1,null,["\n"])),(e()(),ye._23(3,0,null,null,5,"div",[],[[24,"@show",0]],null,null,null,null)),ye._21(4,16384,null,0,fe.o,[],{ngSwitch:[0,"ngSwitch"]},null),(e()(),ye._44(-1,null,["\n    "])),(e()(),ye._17(16777216,null,null,1,null,_)),ye._21(7,278528,null,0,fe.p,[ye._5,ye._0,fe.o],{ngSwitchCase:[0,"ngSwitchCase"]},null),(e()(),ye._44(-1,null,["\n"])),(e()(),ye._44(-1,null,["\n"]))],function(e,n){e(n,4,0,n.component.cursorFollowerService.selectedCursorFollower.value);e(n,7,0,2)},function(e,n){e(n,3,0,n.component.show)})}function f(e){return ye._46(0,[(e()(),ye._23(0,16777216,null,null,1,"sq-cursor-follower",[],null,null,null,y,ge)),ye._21(1,4243456,null,0,_e,[ye._5,ye.m,me.a,ye.q],null,null)],null,null)}function m(e){return be._46(0,[(e()(),be._23(0,0,null,null,1,"ng2-toasty",[],null,null,null,ve.b,ve.a)),be._21(1,114688,null,0,Se.a,[Ee.a,Ee.c],{position:[0,"position"]},null),(e()(),be._44(-1,null,["\n"])),(e()(),be._23(3,0,null,null,1,"sq-navbar",[],null,null,null,a,te)),be._21(4,4243456,[["nav",4]],0,B,[xe.l,ke.a,we.a,Ce.a,Pe.a],null,null),(e()(),be._44(-1,null,["\n"])),(e()(),be._23(6,16777216,null,null,1,"router-outlet",[],null,null,null,null,null)),be._21(7,212992,null,0,xe.p,[xe.b,be._5,be.m,[8,null],be.j],null,null),(e()(),be._44(-1,null,["\n"])),(e()(),be._23(9,0,null,null,0,"div",[],null,[["window","mousemove"]],function(e,n,l){var t=!0,o=e.component;if("window:mousemove"===n){t=!1!==o.mouseMove(l)&&t}return t},null,null)),(e()(),be._44(-1,null,["\n"])),(e()(),be._23(11,16777216,null,null,1,"sq-cursor-follower",[],null,null,null,y,ge)),be._21(12,4243456,null,0,_e,[be._5,be.m,Pe.a,be.q],{xPos:[0,"xPos"],yPos:[1,"yPos"]},null),(e()(),be._44(-1,null,["\n"]))],function(e,n){var l=n.component;e(n,1,0,"top-center"),e(n,7,0),e(n,12,0,l.xPos,l.yPos)},null)}function d(e){return be._46(0,[(e()(),be._23(0,0,null,null,1,"sq-app",[],null,null,null,m,Fe)),be._21(1,49152,null,0,C,[Ce.a,qe.a,we.a,Pe.a,be.P],null,null)],null,null)}Object.defineProperty(n,"__esModule",{value:!0});var g={production:!0},b=l("rgUS"),v=(l.n(b),function(){function e(){}return e}()),S=l("/oeL"),E=l("UX1e"),x=l("1LJl"),k=l("shAM"),w=l("VHzl"),C=function(){function e(e,n,l,t,o){var r=this;this.cursorService=e,this.apiService=n,this.coinsService=l,this.cursorFollowerService=t,this.renderer=o,this.xPos=0,this.yPos=0,this.cursorFollower="0",this.test=!1,this.cursorService.selectedCursor.subscribe(function(e){r.setCursor(e)}),this.apiService.post("getStudent",{}).subscribe(function(e){"Success"==e.status&&(r.cursorFollowerService.selectedCursorFollower.next(e.cursorFollowerId),r.setCursor(e.cursorId),r.coinsService.coins.next(e.coins))})}return e.prototype.mouseMove=function(e){var n=Math.max(document.documentElement.scrollLeft,document.body.scrollLeft),l=Math.max(document.documentElement.scrollTop,document.body.scrollTop);this.xPos=e.clientX+n,this.yPos=e.clientY+l},e.prototype.setCursor=function(e){1==e?this.renderer.setElementStyle(document.body,"cursor",null):this.renderer.setElementStyle(document.body,"cursor","url("+this.cursorService.getCursorByIndex(e)+"), pointer")},e.ctorParameters=function(){return[{type:E.a},{type:k.a},{type:w.a},{type:x.a},{type:S.P}]},e}(),P=[".logo[_ngcontent-%COMP%]{margin:auto;display:block}"],q=function(){function e(){}return e.ctorParameters=function(){return[]},e}(),L=l("/oeL"),F=[P],M=L._20({encapsulation:0,styles:F,data:{}}),z=L._18("sq-home",q,o,{},{},[]),I=[""],j=[".coin[_ngcontent-%COMP%]{width:20px;height:20px;display:inline-block}#coinWrapper[_ngcontent-%COMP%]{width:150px}a[_ngcontent-%COMP%]{padding-right:4%;text-decoration:none;text-align:center;font-family:Palatino Linotype,Book Antiqua,Palatino,serif}button[_ngcontent-%COMP%]:focus{outline:0}button[_ngcontent-%COMP%]{width:100px;height:50px;font-family:Palatino Linotype,Book Antiqua,Palatino,serif}.menu-toolbar[_ngcontent-%COMP%]{min-width:700px;background-color:#87cefa;color:#fff;min-height:60px;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;margin-bottom:25px}"],O=l("BkNc"),Q=l("UX1e"),J=l("1LJl"),A=l("VHzl"),H=l("kOp9"),B=function(){function e(e,n,l,t,o){this.router=e,this.userService=n,this.coinsService=l,this.cursorService=t,this.cursorFollowerService=o,this.silverCoins=0,this.goldCoins=0}return e.prototype.ngAfterViewInit=function(){var e=this;this.coinsService.coins.subscribe(function(n){e.silverCoins=n%100,e.goldCoins=Math.floor(n/100)})},e.prototype.logout=function(){this.userService.logout(),this.router.navigateByUrl("/home")},e.ctorParameters=function(){return[{type:O.l},{type:H.a},{type:A.a},{type:Q.a},{type:J.a}]},e}(),X=l("/oeL"),D=l("wjk8"),N=l("j5BN"),T=l("ghl+"),G=l("V8+5"),R=l("8Xfy"),U=l("BkNc"),V=l("qbdv"),Y=l("Co17"),W=l("zQfh"),Z=l("YXpL"),K=l("kOp9"),$=l("VHzl"),ee=l("UX1e"),ne=l("1LJl"),le=[j],te=X._20({encapsulation:0,styles:le,data:{}}),oe=(X._18("sq-navbar",B,c,{},{},[]),[""]),re=[".outerEye[_ngcontent-%COMP%]{display:inline-block}.innerEye[_ngcontent-%COMP%], .outerEye[_ngcontent-%COMP%]{border:solid #000;border-radius:50px;position:absolute}.innerEye[_ngcontent-%COMP%]{width:1px;height:1px;background:#000}"],ue=l("/oeL"),ie=function(){function e(e){this.renderer=e,this.moveState="state1",this.eyesCenterX=0,this.eyesCenterY=0,this.xDormant=!0,this.lerpSpeed=.05,this.eyeSize=30,this.eyeballSize=8,this.eyeballCen=0,this.xPos=900,this.yPos=200}return e.prototype.ngAfterViewInit=function(){this.renderer.setElementStyle(this.leftEye.nativeElement,"height",this.eyeSize+"px"),this.renderer.setElementStyle(this.leftEye.nativeElement,"width",this.eyeSize+"px"),this.renderer.setElementStyle(this.rightEye.nativeElement,"height",this.eyeSize+"px"),this.renderer.setElementStyle(this.rightEye.nativeElement,"width",this.eyeSize+"px"),this.renderer.setElementStyle(this.leftEyeball.nativeElement,"height",this.eyeballSize+"px"),this.renderer.setElementStyle(this.leftEyeball.nativeElement,"width",this.eyeballSize+"px"),this.renderer.setElementStyle(this.rightEyeball.nativeElement,"height",this.eyeballSize+"px"),this.renderer.setElementStyle(this.rightEyeball.nativeElement,"width",this.eyeballSize+"px"),this.renderer.setElementStyle(this.leftEye.nativeElement,"left",this.xPos+"px"),this.renderer.setElementStyle(this.leftEye.nativeElement,"top",this.yPos+400+"px"),this.renderer.setElementStyle(this.rightEye.nativeElement,"left",this.xPos+"px"),this.renderer.setElementStyle(this.rightEye.nativeElement,"top",this.yPos+400+"px"),this.eyeballCen=this.eyeSize/2-this.eyeballSize+1,this.renderer.setElementStyle(this.leftEyeball.nativeElement,"left",this.eyeballCen+"px"),this.renderer.setElementStyle(this.leftEyeball.nativeElement,"top",this.eyeballCen+"px"),this.renderer.setElementStyle(this.rightEyeball.nativeElement,"left",this.eyeballCen+"px"),this.renderer.setElementStyle(this.rightEyeball.nativeElement,"top",this.eyeballCen+"px")},e.prototype.onDone=function(e){this.moveEyes()},e.prototype.moveEyes=function(){var e=parseFloat(this.leftEye.nativeElement.style.left),n=parseFloat(this.leftEye.nativeElement.style.top),l=-(this.eyeSize+this.eyeSize/2),t=this.yPos-n;t=t<0?50:-80;var o=Math.sqrt(Math.pow(this.xPos+l-e,2)+Math.pow(this.yPos+t-n,2)),r=(this.xPos+l-e)/o,u=(this.yPos+t-n)/o,i=Math.abs(r),s=Math.abs(u);this.renderer.setElementStyle(this.leftEye.nativeElement,"left",e+i*this.lerpSpeed*(this.xPos+l-e)+"px"),this.renderer.setElementStyle(this.leftEye.nativeElement,"top",n+s*this.lerpSpeed*(this.yPos+t-n)+"px"),this.renderer.setElementStyle(this.rightEye.nativeElement,"left",parseFloat(this.leftEye.nativeElement.style.left)+2*this.eyeSize+"px"),this.renderer.setElementStyle(this.rightEye.nativeElement,"top",n+s*this.lerpSpeed*(this.yPos+t-n)+"px"),this.moveEyeballs(l,e,n),"state1"==this.moveState?this.moveState="state2":this.moveState="state1"},e.prototype.moveEyeballs=function(e,n,l){var t=Math.sqrt(Math.pow(this.xPos+e-n,2)+Math.pow(this.yPos-l,2)),o=(this.xPos+e-n)/t,r=(this.yPos-l)/t;this.renderer.setElementStyle(this.leftEyeball.nativeElement,"left",this.eyeballCen+(this.eyeSize/2-this.eyeballSize/2)*o+"px"),this.renderer.setElementStyle(this.leftEyeball.nativeElement,"top",this.eyeballCen+(this.eyeSize/2-this.eyeballSize/2)*r+"px"),this.renderer.setElementStyle(this.rightEyeball.nativeElement,"left",this.eyeballCen+(this.eyeSize/2-this.eyeballSize/2)*o+"px"),this.renderer.setElementStyle(this.rightEyeball.nativeElement,"top",this.eyeballCen+(this.eyeSize/2-this.eyeballSize/2)*r+"px")},e.ctorParameters=function(){return[{type:ue.P}]},e}(),se=l("/oeL"),ae=[re],ce=se._20({encapsulation:0,styles:ae,data:{animation:[{type:7,name:"move",definitions:[{type:0,name:"void",styles:{type:6,styles:{opacity:0},offset:null},options:void 0},{type:0,name:"state1",styles:{type:6,styles:{opacity:1},offset:null},options:void 0},{type:0,name:"state2",styles:{type:6,styles:{opacity:1},offset:null},options:void 0},{type:1,expr:"state1 <=> state2",animation:{type:4,styles:null,timings:1},options:null},{type:1,expr:"void => state1",animation:{type:4,styles:null,timings:1},options:null}],options:{}}]}}),he=(se._18("sq-eyes",ie,p,{xPos:"xPos",yPos:"yPos"},{},[]),l("/oeL")),pe=l("1LJl"),_e=function(){function e(e,n,l,t){this.viewContainerRef=e,this.componentFactoryResolver=n,this.cursorFollowerService=l,this.elementRef=t,this.cursorFollowerIndex=1,this.cursorFollowerReady=!1,this.show="invisible"}return e.prototype.ngAfterViewInit=function(){var e=this;this.cursorFollowerService.selectedCursorFollower.subscribe(function(n){e.show=1!=n?"visible":"invisible"})},e.ctorParameters=function(){return[{type:he._5},{type:he.m},{type:pe.a},{type:he.q}]},e}(),ye=l("/oeL"),fe=l("qbdv"),me=l("1LJl"),de=[oe],ge=ye._20({encapsulation:0,styles:de,data:{animation:[{type:7,name:"show",definitions:[{type:0,name:"invisible",styles:{type:6,styles:{opacity:0},offset:null},options:void 0},{type:0,name:"visible",styles:{type:6,styles:{opacity:1},offset:null},options:void 0},{type:1,expr:"invisible => visible",animation:{type:4,styles:null,timings:2e3},options:null},{type:1,expr:"visible => invisible",animation:{type:4,styles:null,timings:1e3},options:null}],options:{}}]}}),be=(ye._18("sq-cursor-follower",_e,f,{xPos:"xPos",yPos:"yPos"},{},[]),l("/oeL")),ve=l("H1A7"),Se=l("ExPf"),Ee=l("Q0LZ"),xe=l("BkNc"),ke=l("kOp9"),we=l("VHzl"),Ce=l("UX1e"),Pe=l("1LJl"),qe=l("shAM"),Le=[I],Fe=be._20({encapsulation:0,styles:Le,data:{}}),Me=be._18("sq-app",C,d,{},{},[]),ze=l("/oeL"),Ie=l("qbdv"),je=l("fc+i"),Oe=l("f9zQ"),Qe=l("fL27"),Je=l("EyWH"),Ae=l("bm2B"),He=l("CPp0"),Be=l("zQfh"),Xe=l("l6RC"),De=l("V8+5"),Ne=l("8Xfy"),Te=l("Q0LZ"),Ge=l("BkNc"),Re=l("EAJ2"),Ue=l("VHzl"),Ve=l("shAM"),Ye=l("GYNS"),We=l("1LJl"),Ze=l("UX1e"),Ke=l("xqL3"),$e=l("kOp9"),en=l("j5BN"),nn=l("YXpL"),ln=l("ghl+"),tn=l("56Rf"),on=ze._19(v,[C],function(e){return ze._34([ze._35(512,ze.m,ze._15,[[8,[z,Me]],[3,ze.m],ze.H]),ze._35(5120,ze.D,ze._33,[[3,ze.D]]),ze._35(4608,Ie.m,Ie.l,[ze.D]),ze._35(5120,ze.c,ze._24,[]),ze._35(5120,ze.B,ze._30,[]),ze._35(5120,ze.C,ze._31,[]),ze._35(4608,je.c,je.t,[Ie.c]),ze._35(6144,ze.T,null,[je.c]),ze._35(4608,je.f,je.g,[]),ze._35(5120,je.d,function(e,n,l,t){return[new je.l(e),new je.p(n),new je.o(l,t)]},[Ie.c,Ie.c,Ie.c,je.f]),ze._35(4608,je.e,je.e,[je.d,ze.J]),ze._35(135680,je.n,je.n,[Ie.c]),ze._35(4608,je.m,je.m,[je.e,je.n]),ze._35(5120,Oe.a,Qe.d,[]),ze._35(5120,Oe.c,Qe.e,[]),ze._35(4608,Oe.b,Qe.c,[Oe.a,Oe.c]),ze._35(5120,ze.R,Qe.f,[je.m,Oe.b,ze.J]),ze._35(6144,je.q,null,[je.n]),ze._35(4608,ze._1,ze._1,[ze.J]),ze._35(4608,je.h,je.h,[Ie.c]),ze._35(4608,je.j,je.j,[Ie.c]),ze._35(4608,Je.b,Qe.b,[ze.R,je.b]),ze._35(4608,Ae.t,Ae.t,[]),ze._35(4608,Ae.e,Ae.e,[]),ze._35(4608,He.c,He.c,[]),ze._35(4608,He.h,He.b,[]),ze._35(5120,He.j,He.k,[]),ze._35(4608,He.i,He.i,[He.c,He.h,He.j]),ze._35(4608,He.g,He.a,[]),ze._35(5120,He.e,He.l,[He.i,He.g]),ze._35(5120,Be.a,Be.c,[]),ze._35(4608,Be.b,Be.b,[Be.a]),ze._35(4608,Be.l,Be.l,[ze.J,Ie.c]),ze._35(5120,Be.m,Be.k,[[3,Be.m],Be.b,Be.l]),ze._35(5120,Be.p,Be.o,[[3,Be.p],Be.l,Be.b]),ze._35(6144,Xe.b,null,[je.b]),ze._35(4608,Xe.c,Xe.c,[[2,Xe.b]]),ze._35(4608,De.a,De.a,[]),ze._35(4608,Ne.j,Ne.j,[De.a]),ze._35(4608,Ne.i,Ne.i,[Ne.j,De.a,ze.J]),ze._35(136192,Ne.e,Ne.c,[[3,Ne.e],De.a]),ze._35(5120,Ne.n,Ne.m,[[3,Ne.n],[2,Ne.k],De.a]),ze._35(5120,Ne.h,Ne.f,[[3,Ne.h],ze.J,De.a]),ze._35(4608,Te.a,Te.a,[]),ze._35(5120,Te.c,Te.d,[Te.a]),ze._35(5120,Ge.a,Ge.y,[Ge.l]),ze._35(4608,Ge.e,Ge.e,[]),ze._35(6144,Ge.g,null,[Ge.e]),ze._35(135680,Ge.q,Ge.q,[Ge.l,ze.G,ze.k,ze.z,Ge.g]),ze._35(4608,Ge.f,Ge.f,[]),ze._35(5120,Ge.i,Ge.B,[Ge.z]),ze._35(5120,ze.b,function(e){return[e]},[Ge.i]),ze._35(4608,Re.a,Re.a,[]),ze._35(4608,Ue.a,Ue.a,[]),ze._35(4608,Ve.a,Ve.a,[He.e,Re.a,Ue.a]),ze._35(4608,Ye.a,Ye.a,[]),ze._35(4608,We.a,We.a,[]),ze._35(4608,Ze.a,Ze.a,[]),ze._35(4608,Ke.a,Ke.a,[Te.a,Te.c]),ze._35(4608,$e.a,$e.a,[Re.a,We.a,Ze.a]),ze._35(512,Ie.b,Ie.b,[]),ze._35(1024,ze.r,je.r,[]),ze._35(1024,ze.I,function(){return[Ge.u()]},[]),ze._35(512,Ge.z,Ge.z,[ze.z]),ze._35(1024,ze.d,function(e,n,l){return[je.s(e,n),Ge.A(l)]},[[2,je.i],[2,ze.I],Ge.z]),ze._35(512,ze.e,ze.e,[[2,ze.d]]),ze._35(131584,ze._22,ze._22,[ze.J,ze._16,ze.z,ze.r,ze.m,ze.e]),ze._35(2048,ze.g,null,[ze._22]),ze._35(512,ze.f,ze.f,[ze.g]),ze._35(512,je.a,je.a,[[3,je.a]]),ze._35(512,Qe.a,Qe.a,[]),ze._35(512,Ae.r,Ae.r,[]),ze._35(512,Ae.h,Ae.h,[]),ze._35(512,Ae.o,Ae.o,[]),ze._35(512,He.f,He.f,[]),ze._35(512,Be.n,Be.n,[]),ze._35(512,Be.f,Be.f,[]),ze._35(512,en.c,en.c,[]),ze._35(512,Xe.a,Xe.a,[]),ze._35(256,en.g,!0,[]),ze._35(512,en.m,en.m,[[2,en.g]]),ze._35(512,nn.b,nn.b,[]),ze._35(512,De.b,De.b,[]),ze._35(512,en.y,en.y,[]),ze._35(512,Ne.a,Ne.a,[]),ze._35(512,ln.d,ln.d,[]),ze._35(512,tn.b,tn.b,[]),ze._35(1024,Ge.t,Ge.w,[[3,Ge.l]]),ze._35(512,Ge.s,Ge.c,[]),ze._35(512,Ge.b,Ge.b,[]),ze._35(256,Ge.h,{},[]),ze._35(1024,Ie.h,Ge.v,[Ie.s,[2,Ie.a],Ge.h]),ze._35(512,Ie.g,Ie.g,[Ie.h]),ze._35(512,ze.k,ze.k,[]),ze._35(512,ze.G,ze.Y,[ze.k,[2,ze.Z]]),ze._35(1024,Ge.j,function(){return[[{path:"",redirectTo:"/home",pathMatch:"full"},{path:"home",component:q},{path:"games",loadChildren:"./student/games/games.module#GamesModule"},{path:"profile",loadChildren:"./student/user-profile/user-profile.module#UserProfileModule"},{path:"auth",loadChildren:"./auth/auth.module#AuthModule"}]]},[]),ze._35(1024,Ge.l,Ge.x,[ze.g,Ge.s,Ge.b,Ie.g,ze.z,ze.G,ze.k,Ge.j,Ge.h,[2,Ge.r],[2,Ge.k]]),ze._35(512,Ge.o,Ge.o,[[2,Ge.t],[2,Ge.l]]),ze._35(512,v,v,[])])}),rn=l("/oeL"),un=l("fc+i");g.production&&Object(rn._9)(),Object(un.k)().bootstrapModuleFactory(on)},gFIY:function(e,n,l){function t(e){var n=o[e];return n?Promise.all(n.slice(1).map(l.e)).then(function(){return l(n[0])}):Promise.reject(new Error("Cannot find module '"+e+"'."))}var o={"./apple-drop/apple-drop.module.ngfactory":["MF+9",0,9],"./auth/auth.module.ngfactory":["HHkH",0,10],"./math-bingo/math-bingo.module.ngfactory":["XMyv",0,7],"./math-clouds/math-clouds.module.ngfactory":["j7bj",0,6],"./pipes/pipes.module.ngfactory":["F9g6",0,1],"./student/games/games.module.ngfactory":["yG+X",0,8],"./student/user-profile/user-profile.module.ngfactory":["Ef5E",0,2],"./typing/typing.module.ngfactory":["IqHt",0,5],"./vocab-match/vocab-match.module.ngfactory":["vH1i",0,4],"./word-smith/word-smith.module.ngfactory":["Q1Se",0,3]};t.keys=function(){return Object.keys(o)},e.exports=t,t.id="gFIY"},kOp9:function(e,n,l){"use strict";l.d(n,"a",function(){return u});var t=l("EAJ2"),o=l("1LJl"),r=l("UX1e"),u=function(){function e(e,n,l){this.cookiesService=e,this.cursorFollowerService=n,this.cursorService=l,this.grade=0}return e.prototype.logIn=function(e){this.cookiesService.addCookie("sessionToken",e.sessionToken),this.cursorService.selectedCursor.next(e.cursorId),this.cursorFollowerService.selectedCursorFollower.next(e.cursorFollowerId),this.grade=e.grade},e.prototype.isLoggedIn=function(){return!!this.cookiesService.getCookie("sessionToken")},e.prototype.logout=function(){this.isLoggedIn()&&(this.cursorService.selectedCursor.next(1),this.cursorFollowerService.selectedCursorFollower.next(1),this.grade=0,this.cookiesService.removeCookie("sessionToken"))},e.ctorParameters=function(){return[{type:t.a},{type:o.a},{type:r.a}]},e}()},shAM:function(e,n,l){"use strict";l.d(n,"a",function(){return i});var t=l("Dqrr"),o=(l.n(t),l("CPp0")),r=l("EAJ2"),u=l("VHzl"),i=function(){function e(e,n,l){this.http=e,this.cookieService=n,this.coinsService=l}return e.prototype.patch=function(e,n){var l=this.cookieService.getCookie("token");return l&&(n.token=l),this.http.patch("https://scholarquest.herokuapp.com/api/"+e,n).map(function(e){return e.json()}).catch(function(e){return t.Observable.throw(e.json())})},e.prototype.post=function(e,n){var l=this.cookieService.getCookie("sessionToken"),r=new o.d({"Content-Type":"application/json"}),u=new o.g({headers:r});return l&&(n.sessionToken=l),this.http.post("https://scholarquest.herokuapp.com/api/"+e,JSON.stringify(n),u).map(function(e){return e.json()}).catch(function(e){return t.Observable.throw(e)})},e.prototype.addCoins=function(e){var n=this;this.post("getStudent",{token:this.cookieService.getCookie("token")}).subscribe(function(l){n.coinsService.coins.next(l.coins+e),n.patch("student/patchStudent",{token:n.cookieService.getCookie("token"),coins:l.coins+e}).subscribe(function(e){})})},e.ctorParameters=function(){return[{type:o.e},{type:r.a},{type:u.a}]},e}()},xqL3:function(e,n,l){"use strict";l.d(n,"a",function(){return o});var t=l("56Rf"),o=function(){function e(e,n){this.toastyConfig=e,this.toastyService=n,this.toastyConfig.theme="default"}return e.prototype.setToastConf=function(e,n){return this.toastOptions={title:e,msg:n,showClose:!0,timeout:5e3,theme:"default",onAdd:function(e){},onRemove:function(e){}}},e.prototype.error=function(e){this.toastyService.error(this.setToastConf("Error",e))},e.ctorParameters=function(){return[{type:t.a},{type:t.c}]},e}()}},[0]);