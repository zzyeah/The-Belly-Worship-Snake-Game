var snake = new Snake(); // 蛇的实例
snake.head = null; // 蛇头 
snake.tail = null; // 蛇尾

var directionNum = { // 用于与蛇头做运算,得出蛇的运动方向
    left: {
        x: -1,
        y: 0
    },
    right: {
        x: 1,
        y: 0
    },
    top: {
        x: 0,
        y: -1
    },
    bottom: {
        x: 0,
        y: 1
    }
};

snake.init = function () {
    var snakeHead = SquareFactory.create('SnakeHead', 3, 1, 'deeppink');
    var snakeBody1 = SquareFactory.create('SnakeBody', 2, 1, 'green');
    var snakeBody2 = SquareFactory.create('SnakeBody', 1, 1, 'green');

    snake.head = snakeHead;
    snake.tail = snakeBody2;

    ground.remove(snakeHead.x, snakeHead.y);
    ground.append(snakeHead);

    ground.remove(snakeBody1.x, snakeBody1.y);
    ground.append(snakeBody1);

    ground.remove(snakeBody2.x, snakeBody2.y);
    ground.append(snakeBody2);

    snakeHead.next = snakeBody1;
    snakeHead.last = null;

    snakeBody1.next = snakeBody2;
    snakeBody1.last = snakeHead;

    snakeBody2.next = null;
    snakeBody2.last = snakeBody1;

    this.direction = directionNum.right; // 默认走的方向是右边
}

// 获取蛇头将要走到下一个方块
snake.getCollideSquare = function () {
    var nextSquare = ground.squareTable[this.head.y + this.direction.y][this.head.x + this.direction.x];
    // console.log(nextSquare.collide);
    this.collideMethod[nextSquare.collide](nextSquare);
}

snake.collideMethod = {
    move(square, boolean) {
        // console.log('move');
        // 旧蛇头的位置创建一个新身体
        var newBody = SquareFactory.create('SnakeBody', snake.head.x, snake.head.y, 'green');

        // 更新链表的关系
        newBody.next = snake.head.next;
        newBody.last = null;
        newBody.next.last = newBody;

        ground.remove(snake.head.x, snake.head.y);
        ground.append(newBody);

        // 在碰撞方块的位置创建一个新蛇头
        var newHead = SquareFactory.create('SnakeHead', square.x, square.y, 'deeppink');

        // 更新链表的关系
        newHead.next = newBody;
        newHead.last = null;
        newBody.last = newHead;

        ground.remove(square.x, square.y);
        ground.append(newHead);

        snake.head = newHead; // 更新蛇头

        if(!boolean) {
            // 条件成立表示自身调用,需要删除最后一节身体
            var newFloor = SquareFactory.create('Floor', snake.tail.x, snake.tail.y, 'gray');
            ground.remove(snake.tail.x, snake.tail.y);
            ground.append(newFloor);

            snake.tail = snake.tail.last; // 更新蛇尾
        }
        
    },
    eat(square) {
        // console.log('eat');
        this.move(square,true);
        game.score ++;
        createFood();
    },
    die() {
        // console.log('die');
        game.over();
    }
}

// snake.init();

// snake.getCollideSquare();
