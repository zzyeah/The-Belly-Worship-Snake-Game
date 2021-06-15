var game = new Game();
game.timer = null;
game.score = 0;
game.init = function () {
    ground.init();
    snake.init();

    createFood();

    document.onkeydown = function (ev) {
        if (ev.key == 'ArrowLeft' && snake.direction != directionNum.right) {
            snake.direction = directionNum.left;
        } else if (ev.key == 'ArrowUp' && snake.direction != directionNum.bottom) {
            snake.direction = directionNum.top;
        } else if (ev.key == 'ArrowRight' && snake.direction != directionNum.left) {
            snake.direction = directionNum.right;
        } else if (ev.key == 'ArrowDown' && snake.direction != directionNum.top) {
            snake.direction = directionNum.bottom;
        }
    }

    var btn = document.getElementById('btn')
    btn.onclick = () => {
        game.start();
    }
}
game.start = function () {
    this.timer = setInterval(() => {
        snake.getCollideSquare();
    }, interValTime);
}
game.over = function () {
    clearInterval(this.timer);
    alert(this.score);
}
game.init();


function createFood() {
    var x = null;
    var y = null;
    var flag = true; // 循环跳出的条件
    while (flag) { // 排除食物不能出现在围墙上
        // 1-28之间随机数
        x = Math.floor(Math.random() * 27 + 1)
        y = Math.floor(Math.random() * 27 + 1)

        // 排除食物不能出现在蛇的身上
        var ok = true; // for循环跳出的条件

        for (var node = snake.head; node; node = node.next) {
            if (x == node.x && y == node.y) {
                // 条件成立说明随机的xy在蛇的身上找到了
                ok = false;
                break;
            }
        }

        if (ok) {
            flag = false;
        }
    }

    // 创建食物
    var food = SquareFactory.create('Food', x, y, 'red');
    ground.remove(x, y);
    ground.append(food);
}