var canvasWidth = 300; // 画布宽度 与html中一致
var canvasHeight = 200; // 画布高度
var lineMargin = 3; // 间距
var lineNum = 50; // 限数量
var lineW = 6; // 线宽
var lineMaxH = 80; // 最大高度
var lineMinH = 0; // 最小高度

var line = {};
var lines = [];
var colorArr = ['rgba(239,179,241,1.0)', 'rgba(165,250,253,1.0)', 'rgba(231,138,247,1.0)', 'rgba(255,255,255,1.0)']; // 颜色数组


window.onload = function () {
    initCanvas();
}

// 初始化Canvas
function initCanvas() {
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");


    addLine();

    setInterval(function(){
        updateLine(ctx);
    },25);
    


    // drawLine(ctx, 10, (canvasHeight - 100) / 2, 4, 100, 'rgba(0,255,0,1)', 'rgba(255,0,0,1)', 'rgba(255,0,0,0.1)');
}


// 绘制线
function drawLine(ctx, x, y, w, h, c, ssc, sec) {

    // 绘制上方阴影
    ctx.beginPath();
    ctx.lineCap = "round";
    ctx.moveTo(x, y - h/2);
    ctx.lineTo(x, y);
    ctx.lineWidth = w;
    var grd=ctx.createLinearGradient(x, y - h/2, x, y);
    grd.addColorStop(0,sec);
    grd.addColorStop(1,ssc);
    ctx.strokeStyle = grd;
    ctx.stroke();
    ctx.closePath();

    // 绘制下方阴影
    ctx.beginPath();
    ctx.lineCap = "round";
    ctx.moveTo(x, y + h);
    ctx.lineTo(x, y + 3*h/2);
    ctx.lineWidth = w;
    var grd1=ctx.createLinearGradient(x, y + h, x, y + 3*h/2);
    grd1.addColorStop(0,ssc);
    grd1.addColorStop(1,sec);
    ctx.strokeStyle = grd1;
    ctx.stroke();
    ctx.closePath();

    // 绘制中间线
    ctx.beginPath();
    ctx.lineCap = "round";
    ctx.moveTo(x, y);
    ctx.lineTo(x, y + h);
    ctx.lineWidth = w;
    ctx.strokeStyle = c;
    ctx.stroke();
    ctx.closePath();
}

function addLine() {
    for(var i = 0; i < lineNum; i ++) {
        var lineH = Math.round(Math.random() * lineMaxH);
        var cIndex = Math.round(Math.random() * (colorArr.length - 1));
        var c = colorArr[cIndex];
        var c1 = c.replace('1.0','0');

        line = {
            x: lineMargin * (i + 1)  + lineW * i,
            y: (canvasHeight - lineH) / 2,
            h: lineH,
            w: lineW,
            Vl: 5,
            c: c,
            ssc: c,
            sec: c1
        }

        lines.push(line);
    }

}
// 更新线
function updateLine(ctx) {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    for(var i = 0; i < lines.length; i++) {
        var l = lines[i];
        if(l.h > lineMaxH || l.h <lineMinH) {
            l.Vl = -l.Vl;
        }
        l.h += l.Vl;
        l.y = (canvasHeight - l.h) / 2;

        drawLine(ctx,l.x,l.y,l.w,l.h,l.c,l.ssc,l.sec);
    }
}
