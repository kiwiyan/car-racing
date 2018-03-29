
(function () {
    function CarGame(allTime, propMill, fixM) {
        this.speed = 10;  //默认速度
        this.backdrop;  //背景图
        this.tmp = [];
        this.easel = document.getElementById("gameContainer");  //画布
        this.stage = new createjs.Stage('gameContainer');

        createjs.Ticker.timingMode = createjs.Ticker.RAF;
    }
    CarGame.prototype = {
        init: function (manifeste) {
            if (!this.easel) {
                console.log('缺少画布，初始化失败');
                return;
            }
            this.preLoad(manifest);
        },

        // 预加载资源及绘制背景
        preLoad: function (manifest) {
            var loader = new createjs.LoadQueue(false);
            loader.loadManifest(manifest);
            loader.on("complete", handleComplete, this); // 加载完资源后，触发handleComplete事件，开始绘制背景

            function handleComplete() {
                var car = loader.getResult("car"),

                bg1 = loader.getResult("bg1");
                this.drawBg(bg1); // 绘制背景
                this.drawRole(car); // 绘制汽车
            }

        },
        drawBg: function (bg) {
            var that = this;
            
            this.backdrop = new createjs.Bitmap(bg);
            this.backdrop.x = 0;
            this.backdrop.y = 0;
            // this.stage.addChild(that.backdrop); 
            this.w = bg.width; // 背景图的原生宽高
            this.h = bg.height;

            //创建一个背景副本，无缝连接
            var copyy = -bg.height; 
            this.copy = new createjs.Bitmap(bg);
            this.copy.x = 0;
            this.copy.y = copyy; // 副本图片往上一个图片高度

            // g
            // bgGroup = new createjs.Container();

            // bgGroup.name = 'bgGroup';
            // bgGroup.addChild(this.backdrop);
            // bgGroup.addChild(this.copy);
            //g
            //test

            // this.backdrop.rotation = 0;
            // this.backdrop.regX = 50; // 设置中心为旋转点-汽车大小为100*180
            // this.backdrop.regY = 90;

            // this.copy.rotation = 0;
            // this.copy.regX = 50; // 设置中心为旋转点-汽车大小为100*180
            // this.copy.regY = 90;
            //test

            that.stage.addChild(that.backdrop); // 舞台添加画布
            that.stage.addChild(that.copy); // 舞台副本添加到画布

            createjs.Ticker.addEventListener("tick", tick); // 一个集中的滴答声和心跳在设定的时间间隔广播，相当于setTimeout

            function tick(event) {
                if (!event.paused) {
                    //舞台逐帧逻辑处理函数
                    that.backdrop.y = that.speed + that.backdrop.y; // 背景往下移动，即加上速度
                    that.copy.y = that.speed + that.copy.y;  // 背景副本往下移动

                    if (that.copy.y > -1) { // -40
                        that.backdrop.y = that.copy.y + copyy; // 背景副本往下移动还剩40px的刘海时，背景排到背景副本的身后，再准备下移
                    }
                    if (that.copy.y > -copyy - 1) { // -100 背景副本还有100px走完时，往后插到背景身后，准备继续往下走
                        that.copy.y = copyy + that.backdrop.y;
                    }
                    that.stage.update(event);
                }
            }

            // this.tick = tick;
        },
        drawRole: function (car) { 
            var that = this,
            roleGroup = new createjs.Container();
            car = new createjs.Bitmap(car);

            roleGroup.name = 'role';
            roleGroup.addChild(car);

            this.roleGroup = roleGroup;


            this.roleGroup.y = 1344 - 156 - 218;
            this.roleGroup.x = 375 - 5 - 2; //375 - 50 - 2
            this.roleGroup.rotation = 0;
            this.roleGroup.regX = 50; // 设置中心为旋转点-汽车大小为100*180
            this.roleGroup.regY = 90;

            this.stage.addChild(that.roleGroup);

            createjs.Ticker.addEventListener("tick", tick); 

            var btnLeft = document.querySelector('.btn-left');
            var btnRight = document.querySelector('.btn-right');

            btnLeft.addEventListener('touchstart', function() {
                console.log('left down')

                moveLeft();
            });

            btnRight.addEventListener('mousedown', function() {
                console.log('right down');
                moveRight();
            })

            
            function moveLeft() {
                that.roleGroup.x -= 23;
                that.roleGroup.rotation -= 10;
                

                console.log(that.roleGroup.regX)
            }
            function moveRight() {
                that.roleGroup.x += 23;
                that.roleGroup.rotation += 10;
                // that.backdrop.rotation -= 0.1;
                // that.copy.rotation -= 0.1;
            }

            function tick(event) {
                that.stage.update(event);
            }


        }
    }
    window.CarGame = CarGame;
})();