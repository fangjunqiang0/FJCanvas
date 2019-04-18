var bgTriangleColor = '#066eb7'; // 阴影三角形颜色
var triangleColorArr = ['#2EA7DF', '#F29700', '#E3007E', '#DADF00', '#9FBDC8', '#22AB39', '#E73928']; // 颜色数组
var triangleMoveXArr = [1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 2]; // 偏移量数组
var triangleMoveYArr = [0.5,0.6,0.7,0.8,0.9,1.0]; // 偏移量数组
var triangleMarginArr = [-4, -2, 0, 2, 4, 6]; // 

var trianglerotate = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110]; // 旋转角度数组  取值区间 [0, 120)
var triangleBorderLength = [4, 6, 8, 10, 12, 14, 16, 18, 20]; // 边长数组
var triangleOffset = 5; // 阴影偏移量
var addTriangleNum = 20; // 每次添加三角数量
var triangleMargin = 30;
var canvasWidth = 375;
var canvasHeight = 600;

var firstX = -50;  // 第一个三角形X坐标
var firstY = 0; // 第一个三角形Y坐标

// 第二部分 偏移量
var offsetY = 0;
var offsetX = 0;

var triangles = [];
var triangle = {};

window.onload = function () {

    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");

    // 定时添加三角形
    setInterval(
        function () {
            addTriangle();
        }, 700
    );
    // 定时更新画布
    setInterval(
        function () {
            updateTriangle(ctx);

        }, 20
    );

    // 延迟定时清除数组元素
    setTimeout(() => {
        setInterval(function() {
            deleteTriangle();
        }, 700);
    }, 8500);

};

/*
    绘制实心等边三角形
    x,y 顶点
    l 边长
    c 填充色
    a 旋转角度
    b 是否有重叠
 */

function drawTriangle(ctx, x, y, l, c, a, b) {
    var x1, x2, x3, y1, y2, y3;
    x1 = x;
    y1 = y;
    if (a == 0) {
        x2 = x - l;
        y2 = y;
        x3 = x - l / 2;
        y3 = y + Math.sqrt(3) / 2 * l;
    } else if (a < 30) {
        x2 = x - l * Math.cos(a * Math.PI / 180);
        y2 = y + l * Math.sin(a * Math.PI / 180);
        x3 = x - l * Math.cos((a + 60) * Math.PI / 180);
        y3 = y + l * Math.sin((a + 60) * Math.PI / 180);
    } else if (a == 30) {
        x2 = x - l * Math.sqrt(3) / 2;
        y2 = y + l / 2;
        x3 = x;
        y3 = y + l;
    } else if (a < 90) {
        x2 = x - Math.cos(a * Math.PI / 180) * l;
        y2 = y + Math.sin(a * Math.PI / 180) * l;
        x3 = x + Math.cos((180 - 60 - a) * Math.PI / 180) * l;
        y3 = y + Math.sin((180 - 60 - a) * Math.PI / 180) * l;
    } else if (a == 90) {
        x2 = x;
        y2 = y + l;
        x3 = x + l * Math.sqrt(3) / 2;
        y3 = y + l / 2;
    } else if (a < 120) {
        x2 = x + l * Math.cos((180 - a) * Math.PI / 180);
        y2 = y + l * Math.sin((180 - a) * Math.PI / 180);
        x3 = x + l * Math.cos((180 - 60 - a) * Math.PI / 180);
        y3 = y + l * Math.sin((180 - 60 - a) * Math.PI / 180);
    }


    if (b) {
        ctx.beginPath();
        ctx.moveTo(x1 + triangleOffset, y1 + triangleOffset);
        ctx.lineTo(x2 + triangleOffset, y2 + triangleOffset);
        ctx.lineTo(x3 + triangleOffset, y3 + triangleOffset);
        ctx.fillStyle = bgTriangleColor;
        ctx.fill();
        ctx.closePath();

    }
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineTo(x3, y3);
    ctx.fillStyle = c;
    ctx.fill();
    ctx.closePath();


}

/**
 * 添加三角形
 */
function addTriangle() {

    for (var index = 0; index < addTriangleNum; index++) {
        let l = Math.round(Math.random() * (triangleBorderLength.length - 1));
        let Vx = Math.round(Math.random() * (triangleMoveXArr.length - 1));
        let Vy = Math.round(Math.random() * (triangleMoveYArr.length - 1));
        let color = Math.round(Math.random() * (triangleColorArr.length - 1));
        let a = Math.round(Math.random() * (trianglerotate.length - 1));
        let b = Math.round(Math.random());
        let margin = Math.round(Math.random() * (triangleMarginArr.length - 1));
        if (index == 0) {
            triangle = {
                x: firstX,
                y: firstY,
                l: triangleBorderLength[l],
                Vx: triangleMoveXArr[Vx],
                Vy: triangleMoveYArr[Vy],
                color: triangleColorArr[color],
                a: trianglerotate[a],
                b: b,
                margin: triangleMarginArr[margin],
            };
        } else if (index < 7) {
            triangle = {
                x: firstX + offsetX * index,
                y: triangleMargin * index + firstY,
                l: triangleBorderLength[l],
                Vx: triangleMoveXArr[Vx],
                Vy: triangleMoveYArr[Vy],
                color: triangleColorArr[color],
                a: trianglerotate[a],
                b: b,
                margin: triangleMarginArr[margin],
            };
        } else {
            triangle = {
                x: firstX + offsetX * index  ,
                y: triangleMargin * index + firstY + offsetY,
                l: triangleBorderLength[l],
                Vx: triangleMoveXArr[Vx],
                Vy: triangleMoveYArr[Vy],
                color: triangleColorArr[color],
                a: trianglerotate[a],
                b: b,
                margin: triangleMarginArr[margin],
            };
        }

        triangles.push(triangle);

    }
}


function deleteTriangle() {
    triangles.splice(0, addTriangleNum);
    console.log(triangles.length);
}

/**
 * 更新画布三角形
 * @param  ctx  画布
 */
function updateTriangle(ctx) {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    for (var i = 0; i < triangles.length; i++) {
        var t = triangles[i];
        t.x += t.Vx;
        t.y += t.Vy;

        drawTriangle(ctx, t.x, t.y, t.l, t.color, t.a, t.b);
    }


}