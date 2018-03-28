
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
        preLoad: function (manifest) {
            var loader = new createjs.LoadQueue(false);
            loader.loadManifest(manifest);
            loader.on("complete", handleComplete, this); // 加载完资源后，触发handleComplete事件，开始绘制背景

            function handleComplete() {
                var car = loader.getResult("car"),

                bg1 = loader.getResult("bg1");
                this.drawBg(bg1); // 绘制背景
                this.drawRole(car);
            }

        },
        drawBg: function (bg) {
            var that = this, i = 1;
            this.backdrop = new createjs.Bitmap(bg);
            this.backdrop.x = 0;
            this.backdrop.y = 0;
            this.stage.addChild(that.backdrop);
            this.w = bg.width;
            this.h = bg.height;

            //创建一个背景副本，无缝连接
            var copyy = -bg.height;
            this.copy = new createjs.Bitmap(bg);
            this.copy.x = 0;
            this.copy.y = copyy;

            that.stage.addChild(that.backdrop);
            that.stage.addChild(that.copy);

            createjs.Ticker.addEventListener("tick", tick);

            function tick(e) {
                if (e.paused !== 1) {
                    //舞台逐帧逻辑处理函数
                    that.backdrop.y = that.speed + that.backdrop.y;
                    that.copy.y = that.speed + that.copy.y;

                    if (that.copy.y > -40) {
                        that.backdrop.y = that.copy.y + copyy;
                    }
                    if (that.copy.y > -copyy - 100) {
                        that.copy.y = copyy + that.backdrop.y;
                    }
                    that.stage.update(e);
                }
            }

            this.tick = tick;
        },
        drawRole: function (car) { 
            var that = this,
            roleGroup = new createjs.Container();
            car = new createjs.Bitmap(car);

            roleGroup.name = 'role';
            roleGroup.addChild(car);


            roleGroup.y = 1344 - 156 - 218;
            roleGroup.x = 375 - 50 - 2;

            this.stage.addChild(roleGroup);
        }
    }
    window.CarGame = CarGame;
})();