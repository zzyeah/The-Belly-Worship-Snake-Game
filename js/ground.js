var ground = new Ground(positionX, positionY, td * squareWidth, tr * squareWidth);

ground.init = function () {
    this.viewContent.style.position = 'absolute';
    this.viewContent.style.left = this.x + 'px';
    this.viewContent.style.top = this.y + 'px';
    this.viewContent.style.width = this.width + 'px';
    this.viewContent.style.height = this.height + 'px';
    this.viewContent.style.background = 'orange';
    document.body.appendChild(this.viewContent);

    this.squareTable = [
    ];

    for (var y = 0; y < tr; y++) { // 外层循环走的是行数,(y轴坐标)
        this.squareTable[y] = new Array(td);
        for (var x = 0; x < td; x++) { // 里层循环走的是列数(x轴坐标)
            if (x == 0 || x == td - 1 || y == 0 || y == tr - 1) {
                // 围墙身上
                var newSquare = SquareFactory.create('Wall', x, y, 'black'); // 围墙
            } else {
                var newSquare = SquareFactory.create('Floor', x, y, 'gray'); // 地板
            }
            this.squareTable[y][x] = newSquare;
            this.viewContent.appendChild(newSquare.viewContent);
        }
    }

    // console.log(this.squareTable);

    // var newSquare = SquareFactory.create('Floor', x, y, 'black');

}

// ground.init();
// var newSquare = SquareFactory.create('Floor', 0, 0, 'black');
// console.log(newSquare);

ground.remove = function (x, y) { // 删除一个小方块
    var curSquare = this.squareTable[y][x];
    this.viewContent.removeChild(curSquare.viewContent); // 删除dom
    this.squareTable[y][x] = null; // 删除数据
}

ground.append = function (square) { // 添加一个小方块
    this.viewContent.appendChild(square.viewContent);  // 添加到DOM里
    this.squareTable[square.y][square.x] = square; // 添加到数据里 
}

