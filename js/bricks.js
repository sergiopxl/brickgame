
    var canvas = document.getElementById('myCanvas');
    var ctx = canvas.getContext("2d");
    var x = canvas.width/2;
    var y = canvas.height-20;
    var dx = 2;
    var dy = -2;
    var ballRadius = 10;
    var paddleHeight = 10;
    var paddleWidth = 180;
    var paddleX = (canvas.width-paddleWidth)/2;
    var rightPressed = false;
    var leftPressed = false;
    var brickRowCount = 6;
    var brickColumnCount = 6;
    var brickWidth = 90;
    var brickHeight = 20;
    var brickPadding = 5;
    var brickOffsetTop = 30;
    var brickOffsetLeft = 20;
    var brickColor=1;
    var bricks = [];
    var hits = 0;
    var score = 0;
    var siguejugando=1;
    for(c = 0; c < brickColumnCount; c++){
        bricks[c] = [];
        for(r = 0; r < brickRowCount; r++){
            bricks[c][r] = {x:0, y:0, status:1, special:0};
        }
    }
/* #### addEventListener #### */
    document.addEventListener("keydown",keyDownHandler, false);
    document.addEventListener("keyup",keyUpHandler,false);
    function keyDownHandler(e){
        if(e.keyCode==39){
            rightPressed=true;
        }else if(e.keyCode == 37){
            leftPressed=true;
        }
    }
    function keyUpHandler(e){
        if(e.keyCode == 39){
            rightPressed=false;
        }else if(e.keyCode==37){
            leftPressed=false;
        }
    }
/* #### fin addEventListener #### */
/* #### drawing functions #### */
    function drawBall(){
        ctx.beginPath();
        ctx.arc(x,y,ballRadius,0,Math.PI*2);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
    }
    function drawPaddle(){
        ctx.beginPath();
        ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
    }
    function drawBricks(){
        for(c=0; c<brickColumnCount; c++){
            for(r=0; r<brickRowCount; r++){
                if(bricks[c][r].status == 1){
                    var brickX = (c*(brickWidth+brickPadding)+brickOffsetLeft);
                    var brickY = (r*(brickHeight+brickPadding)+brickOffsetTop);
                    bricks[c][r].x = brickX;
                    bricks[c][r].y = brickY;
                    ctx.beginPath();
                    ctx.rect(brickX,brickY,brickWidth,brickHeight);

                    if((c*r+(c-r))%7==0){
                        bricks[c][r].special = 1;
                        ctx.fillStyle = "#dd44aa";
                    }else{
                        ctx.fillStyle = "#00d599";
                    }
                    ctx.fill();
                    ctx.closePath();
                }
            }
        }
    }
    function drawScore(){
        ctx.font = "16px Arial";
        ctx.fillStyle = "#333";
        ctx.fillText("Score: "+score, 8, 20);
    }
    /* #### fin drawing functions #### */
    /* #### control de colisión con ladrillos #### */
    function colisionDetection(){
        for(c=0; c<brickColumnCount; c++){
            for(r=0; r<brickRowCount; r++){
                var b = bricks[c][r];
                if(b.status==1){
                    siguejugando = 1;
                    if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
                        dy = -dy;
                        b.status = 0;
                        if(b.special==1){
                            score+=40;
                        }else{
                            score+=10;
                        }
                        hits++;
                    }
                }
                if(hits>=brickRowCount*brickColumnCount){
                    alert("ganaste");
                    document.location.reload();
                }
            }
        }
    }
    /* #### fin control de colisión con ladrillos #### */
    /* #### Función principal #### */
    function draw(){
        ctx.clearRect(0,0,canvas.width , canvas.height);
        drawBall();
        drawPaddle();
        drawBricks();
        colisionDetection();
        drawScore();
        if(y + dy < ballRadius){
            dy=-dy;
        }else if( y + dy > canvas.height-ballRadius){
            if(x > paddleX && x < paddleX +paddleWidth){
                dy=-dy;
            }else{
                alert("game over");
                document.location.reload();
            }
        }

        if(x + dx > canvas.width - ballRadius || x + dx < ballRadius){
            dx=dx*(-1);
        }
        if(rightPressed && paddleX < canvas.width - paddleWidth){
            paddleX +=4;
        }else if(leftPressed && paddleX > 0){
            paddleX -=4;
        }
        x += dx;
        y += dy;
    }
    /* #### fin función principal #### */
    function arranca(){
        setInterval(draw, 10);
    }
