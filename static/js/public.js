!function(win){
    var publics ={
        setLocal:function(key,value){
            localStorage.setItem(key,value)
        },
        getLocal:function(key){
            return localStorage.getItem(key)
        },
        loginJudge:function(callback){
            if(!this.getLocal("user_name") || !this.getLocal("user_id")){
                console.log(this.getLocal("user_name"),this.getLocal("user_id"));
                callback();
            }     
        },
        loginJump:function(callback){
            this.setLocal ('user_name','');
            this.setLocal ('user_id','');
            callback();
        },
        //判断移动端等
        getType:function(){
            var info = navigator.userAgent;
            console.log(info);
            return {//移动终端浏览器版本信息 
                trident: info.indexOf('Trident') > -1, //IE内核
                presto: info.indexOf('Presto') > -1, //opera内核
                webKit: info.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
                gecko: info.indexOf('Gecko') > -1 && info.indexOf('KHTML') == -1, //火狐内核
                mobile: !!info.match(/AppleWebKit.*Mobile.*/) || !!info.match(/AppleWebKit/), //是否为移动终端
                ios: !!info.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
                android: info.indexOf('Android') > -1 || info.indexOf('Linux') > -1, //android终端或者uc浏览器
                iPhone: info.indexOf('iPhone') > -1 || info.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器
                iPad: info.indexOf('iPad') > -1, //是否iPad
                webApp: info.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
              };

        },
        //移动端touch事件
        touchEvent:function(dom,booleam,callback){
            var start_x;
            var start_y;
            var end_x;
            var end_y;
            
            dom.addEventListener("touchstart", function(event) {
               // alert(JSON.stringify(event.targetTouches));
                //event.preventDefault();
                if (event.changedTouches.length == 1) {
                    var touch = event.changedTouches[0];
                    start_x = touch.pageX;
                    start_y = touch.pageY;
                };
            });
            // dom.addEventListener("touchmove", function(event) { 
            //     event.preventDefault();
            //     if (event.targetTouches.length == 1) {
            //         var touch = event.targetTouches[0];
            //         move_x = touch.pageX;
            //         move_y = touch.pageY;
            //     };
            // });
            dom.addEventListener("touchend", (event)=> {
               // event.preventDefault();
                if(booleam){
                    if(event&&event.stopPropagation) { 
                        event.stopPropagation(); 
                    } 
                    else { 
                        window.event.cancelBubble=true;     
                    }
                }
                if (event.changedTouches.length == 1) {
                var touch = event.changedTouches[0];
                end_x = touch.pageX;
                end_y = touch.pageY;
                callback(this.getSlideAngle(end_x-start_x,end_y-start_y));
                };
            })
         },
         getSlideAngle:function (dx,dy) {
            var angle;
            var num = 0;
            angle = Math.atan2(dy,dx) * 180 / Math.PI;
            if (angle >= -45 && angle < 45) {
                num = 4;  //向右
             }else if (angle >= 45 && angle < 135) {
                num = 1;   //向上
             }else if (angle >= -135 && angle < -45) {
                num = 2;   //向下
             }else if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {
                num = 3;   //向左
             }
             return num;
          }

    }
    win.Publics = publics;
}(window)