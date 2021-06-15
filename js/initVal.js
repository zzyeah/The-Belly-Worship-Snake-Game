/**
 * 存储全局性的东西
 *  1. 常用的变量
 *  2. 创建一个最基础的方块构造函数
 *  3. 根据方块构造函数,创建各个元素对象(构造函数)
 *  4. 存储蛇头与其他格子碰撞后的处理方式
 */

// 游戏区域的大小
var tr = 30,    // 宽度(列数)
    td = 30;    // 高度(行数)

// 每个方块的大小
var squareWidth = 20;

// 游戏区域一开始的坐标
var positionX = 200,
    positionY = 100;

// 蛇的移动间隔
var interValTime = 300;

// 方块的构造函数
function Square(x, y, width, height, dom) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.viewContent = dom || document.createElement('div');
}

Square.prototype.upDate = function (x, y) {  
    this.x = x;
    this.y = y;
    this.viewContent.style.left = x * squareWidth + 'px'
    this.viewContent.style.top = y * squareWidth + 'px'
}

// 创建元素对象
var Ground = tool.single(Square); // 游戏场景
var Floor = tool.extends(Square); // 地板(非单例)
var Wall = tool.extends(Square);  // 围墙

var SnakeHead = tool.single(Square); // 蛇头 
var SnakeBody = tool.extends(Square); // 蛇身
var Snake = tool.single(); // 蛇
var Food = tool.single(Square); // 食物
var Game = tool.single(); // 游戏

// 蛇头与下一个方块碰撞后的处理方式
var collideType = {
    move: 'move',
    eat: 'eat',
    die: 'die',
}