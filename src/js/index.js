function init() {
    var socket = io.connect('http://localhost:3001');
    socket.on('news', function (data) {
        console.log(data);
        socket.emit('my other event', { my: 'data' });
    });

    var stage = new createjs.Stage("demoCanvas");

    var circle = new createjs.Shape();
    circle.graphics.beginFill("DeepSkyBlue").drawCircle(0, 0, 50);
    circle.x = 100;
    circle.y = 100;
    stage.addChild(circle);

    stage.update();

    circle.addEventListener("click", handleClick);
    function handleClick(event){
        socket.emit('my other event', { my: 'data' });
    }

    createjs.Ticker.addEventListener("tick", handleTick);

    function handleTick() {
        circle.x += 10;
        if (circle.x > stage.canvas.width) { circle.x = 0; }
        socket.emit('my other event', { x: circle.x });
        stage.update();
    }
}
