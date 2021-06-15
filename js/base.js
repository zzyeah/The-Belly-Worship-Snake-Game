const tool = {
    /**
     * 目标对象继承源对象
     * @param {*} target 目标对象
     * @param {*} origin 源对象
     */
    inherit(target, origin) {   // 继承
        // 圣杯模式
        const F = function () { };
        F.prototype = origin.prototype;
        target.prototype = new F();
        target.prototype.constructor = target
    },
    extends(origin) {   // 扩展 
        const target = function () {
            origin.apply(this, arguments);
        };
        this.inherit(target, origin);
        return target;
    },
    single(origin) {    // 单例
        const target = (function () {
            var instance;
            return function () {
                if (typeof instance == 'object') { 
                    return instance;
                }
                origin && origin.apply(this, arguments);
                instance = this;
            }
        })();
        origin && this.inherit(target, origin);
        return target;
    }
};

function Square(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
}
Square.prototype.collide = function () {
    console.log('collide');
}

// function Food(){
// }
// tool.inherit(Food,Square);
// var f= new Food();
// f.collide();

// var Food = tool.extends(Square);
// var f = new Food(10, 20, 100, 100);
// console.log(f.width);
// f.collide();

// var Food = tool.single(Square);
// var f1 = new Food(10, 20, 100, 100);
// var f2 = new Food();
// console.log(f1 == f2);
// console.log(f2.x);