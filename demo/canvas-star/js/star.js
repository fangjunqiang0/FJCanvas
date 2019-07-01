var ScreenH = window.screen.height;
var ScreenW = window.screen.width;

var circles = [];
var ctx;

window.onload = function () {

    var canvas = document.getElementById("canvas");
    var style = 'width:' + ScreenW + 'px;' + 'height:' + ScreenH + 'px;' + "background: #000";
    canvas.setAttribute('style', style);
    canvas.setAttribute('height', ScreenH * 2);
    canvas.setAttribute('width', ScreenW * 2);
    ctx = canvas.getContext("2d");

    acircles(200);

    requestAnimationFrame(updateCircles);


};

function drawLine(ctx, x1, y1, x2, y2, color) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineWidth = 2;
    ctx.strokeStyle = color;
    ctx.stroke();
}

function updateCircles() {
    ctx.clearRect(0, 0, ScreenW * 2, ScreenH * 2);
    for (var i = 0; i < circles.length; i++) {
        var e1 = circles[i];
        e1.x += e1.vx;
        e1.y += e1.vy;

        if (e1.x > ScreenW * 2 || e1.x < 0) {
            e1.vx = -e1.vx;
        }

        if (e1.y > ScreenH * 2 || e1.y < 0) {
            e1.vy = -e1.vy;
        }

        drawCircle(ctx, e1.x, e1.y, e1.r, e1.color);

        for (var j = i + 1; j < circles.length; j++) {
            var e2 = circles[j];
            var absX = Math.abs(e1.x - e2.x);
            var absY = Math.abs(e1.y - e2.y);
            if (absX < 200 && absY < 200) {
                drawLine(ctx, e1.x, e1.y, e2.x, e2.y, e1.color);
            }
        }
    }



    requestAnimationFrame(updateCircles);

}


function acircles(num) {
    for (var i = 0; i < num; i++) {
        var c = createCircle();
        circles.push(c);
    }
}



function createCircle() {
    var r1 = randomNum(-2, 2);
    r1 = r1 == 0 ? 0.1 : r1;
    var r2 = randomNum(-2, 2);
    r2 = r2 == 0 ? 0.1 : r2;
    var circle = {
        x: Math.round(Math.random() * ScreenW * 2),
        y: Math.round(Math.random() * ScreenH * 2),
        r: 6,
        color: Color(),
        vx: r1,
        vy: r2,
    };
    return circle;
}

function drawCircle(ctx, x, y, r, color) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill();
}

//生成从minNum到maxNum的随机数
function randomNum(minNum, maxNum) {
    switch (arguments.length) {
        case 1:
            return parseInt(Math.random() * minNum + 1, 10);
        case 2:
            return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
        default:
            return 0;
    }
}


function Color(min) {
    min = min || 0;
    var r = colorValue(min);
    var g = colorValue(min);
    var b = colorValue(min);
    return createColorStyle(r, g, b);
}

function colorValue(min) {
    return Math.floor(Math.random() * 255 + min);
}

function createColorStyle(r, g, b) {
    return 'rgba(' + r + ',' + g + ',' + b + ', 0.8)';
}