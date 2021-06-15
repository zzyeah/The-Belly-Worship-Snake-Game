// 1. 创建管理者
function SquareFactory() {
}

SquareFactory.prototype.init = function (square, color, action) {
    square.viewContent.style.position = 'absolute';
    square.viewContent.style.width = square.width + 'px';
    square.viewContent.style.height = square.height + 'px';
    square.viewContent.style.background = color;

    /**
     * x代表列, y代表行
     * left = 列(x) * 宽度
     * top = 行(y) * 高度
     */
    square.viewContent.style.left = square.x * squareWidth + 'px';
    square.viewContent.style.top = square.y * squareWidth + 'px';

    square.collide = action; // 方块贴上标签
}

// 2. 包装创建方块的构建函数（子工厂、流水线）

// 创建地板的构造函数
SquareFactory.prototype.Floor = function (x, y, color) {
    var floor = new Floor(x, y, squareWidth, squareWidth);
    this.init(floor, color, collideType.move);
    return floor;
}

// 创建围墙的构造函数
SquareFactory.prototype.Wall = function (x, y, color) {
    var wall = new Wall(x, y, squareWidth, squareWidth);
    this.init(wall, color, collideType.die);
    return wall;
}

// 创建蛇头的构造函数
SquareFactory.prototype.SnakeHead = function (x, y, color) {
    var snakeHead = new SnakeHead(x, y, squareWidth, squareWidth);
    this.init(snakeHead, color, collideType.die);
    snakeHead.upDate(x, y);

    return snakeHead;
}

// 创建蛇身的构造函数
SquareFactory.prototype.SnakeBody = function (x, y, color) {
    var snakeBody = new SnakeBody(x, y, squareWidth, squareWidth);
    this.init(snakeBody, color, collideType.die);
    return snakeBody;
}

// 创建食物的构造函数
SquareFactory.prototype.Food = function (x, y, color) {
    var food = new Food(x, y, squareWidth, squareWidth);
    this.init(food, color, collideType.eat);
    food.upDate(x, y);
    return food;
}


// 3. 提供对外接口
/**
 * 
 * @param {String} type Floor Wall SnakeHead SnakeBody Food
 * @param {*} x 
 * @param {*} y 
 * @param {*} color 
 * @returns 
 */
SquareFactory.create = function (type, x, y, color) {

    if (typeof SquareFactory.prototype[type] == 'undefined') {
        throw 'no this type';
    }

    // 子工厂继承父工厂(圣杯模式)
    SquareFactory.prototype[type].prototype = new SquareFactory();

    return new SquareFactory.prototype[type](x, y, color);
}

// var newSquare = SquareFactory.create('Floor', x, y, 'black');
