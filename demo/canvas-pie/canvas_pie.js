// 设计思路
// 1、封装绘制扇形方法drawSector()、绘制图片方法drawImage()；
// 2、封装创建百分比图片对象方法createPrecentImage()方法、创建王者图片对象方法createKingImage()；
// 3、封装获取扇形数组方法getSectors()（包含创建扇形对象）、获取百分比图片对象数组方法getPrecentImages()；
// 4、封装绘制饼图方法drawPie()、绘制王者图片方法drawPie()、绘制百分比图片方法drawPrecentImage()【drawPie()中调用】；
// 5、调用drawPie()、drawPie()。

//注：
// 1、图片路径
// 2、变量score（分值）、precents（百分比数组） 复制


var score;
var precents; 
var colors = ["#EB4F30", "#FF9B59", "#5F85FF"]; // 饼图颜色
var centerX = 250; // 饼图中心坐标X
var centerY = 250; // 饼图中心坐标Y
var offset = 10; // 第一个扇形偏移量
var r = 120; // 扇形半径



window.onload = function () {

    // 赋值
    score = 8; // 分值
    precents = ["20%", "40%", "40%"]; // 百分比数组


    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");

    var point = drawPie(ctx, precents); // 绘制饼图
    var kingImage = createKingImage(score); // 创建王者图片对象
    drawKingImage(ctx,point.x + 20,point.y,kingImage); // 绘制王者图片
}



// 绘制饼图
function drawPie(ctx, precents) {
    if (precents.length != 3) {
        return;
    }

    var sectors = getSectors(precents);

    var point = {
        x:0,
        y:0
    }

    for (var i = 0; i < sectors.length; i++) {
        var sector = sectors[i];
        // 1.绘制扇形
        drawSector(ctx, sector.x, sector.y, sector.r, sector.sAngle, sector.eAngle, sector.color);

        // 2.绘制百分比图片
        // 2.1.获取百分比图片对象数组
        var precentImages = getPrecentImages(precents[i]);
        // 2.2.计算百分比图片整体宽高
        var totalPrecentImageW = 0;
        var totalPrecentImageH = 0;
        for (var j = 0; j < precentImages.length; j++) {
            var precentImage = precentImages[j];
            if(j == 0) {
                totalPrecentImageW = totalPrecentImageW + precentImage.width;
            } else {
                totalPrecentImageW = totalPrecentImageW + precentImage.width + precentImage.marginLeft;
            }
            totalPrecentImageH = precentImage.height;
        }

        // 2.3.绘制线条
        var x1 = sector.x + r * Math.cos(sector.sAngle + (sector.eAngle - sector.sAngle) / 2);
        var y1 = sector.y + r * Math.sin(sector.sAngle + (sector.eAngle - sector.sAngle) / 2);
        var l = 0;
        if (i == 1) {
            l = r + 10;
        } else {
            l = r + 40;
        }
        var x2 = sector.x + l * Math.cos(sector.sAngle + (sector.eAngle - sector.sAngle) / 2);
        var y2 = sector.y + l * Math.sin(sector.sAngle + (sector.eAngle - sector.sAngle) / 2);

        var x3 = 0;
        var y3 = y2;
        if (x2 > sector.x) {
            x3 = x2 + totalPrecentImageW + 20;
        } else {
            x3 = x2 - totalPrecentImageW - 20;
        }

        drwaLine(ctx,x1,y1,x2,y2,2,"#000000");
        drwaLine(ctx,x2,y2,x3,y3,2,"#000000");
        // 2.4.计算百分比图片左上角坐标
        var x = 0;
        if (x3 > x2) {
            x = x2 + 10;
        } else {
            x = x3 + 10;
        }
        var y = y2 - totalPrecentImageH - 5;
        
        // 2.5.绘制百分比图片
        drawPrecentImage(ctx, x, y, precentImages);

        if (i == 0) {
            point = {
                x: x3,
                y: y3 - totalPrecentImageH - 10
            }
        }

    }

    return point;
}


// 绘制百分比图片
function drawPrecentImage(ctx, x, y, precentImages) {
    var precentMarginX = 3;
    for (var i = 0; i < precentImages.length; i++) {
        var precentImage = precentImages[i];
        if (i > 0) {
            var lastPrecentImage = precentImages[i - 1];
            x = x + lastPrecentImage.width + precentImage.marginLeft;
        }
        drawImage(ctx, x, y, precentImage.width, precentImage.height, precentImage.src);
    }
}

// 绘制王者图片
function drawKingImage(ctx, x, y, kingImage) {
    drawImage(ctx, x, y, kingImage.width, kingImage.height, kingImage.src);
}


// 绘制扇形
function drawSector(ctx, x, y, r, sAngle, eAngle, c) {

    // 绘制填充弧形
    if (eAngle - sAngle > Math.PI) { // 角度大于180度
        // 先绘制180度
        ctx.beginPath();
        ctx.arc(x, y, r, sAngle, sAngle + Math.PI);
        ctx.fillStyle = c;
        ctx.fill();
        ctx.closePath();
        // 后绘制剩余部分
        ctx.beginPath();
        ctx.moveTo(Math.cos(sAngle + Math.PI - 0.1) * r + x, Math.sin(sAngle + Math.PI - 0.1) * r + y);
        ctx.lineTo(x, y);
        ctx.lineTo(Math.cos(eAngle) * r + x, Math.sin(eAngle) * r + y);
        ctx.arc(x, y, r, sAngle + Math.PI - 0.1, eAngle);
        ctx.fillStyle = c;
        ctx.fill();
        ctx.closePath();
    } else {
        ctx.beginPath();
        ctx.moveTo(Math.cos(sAngle) * r + x, Math.sin(sAngle) * r + y);
        ctx.lineTo(x, y);
        ctx.lineTo(Math.cos(eAngle) * r + x, Math.sin(eAngle) * r + y);
        ctx.arc(x, y, r, sAngle, eAngle);
        ctx.fillStyle = c;
        ctx.fill();
        ctx.closePath();
    }

    // 绘制弧形边线一
    ctx.beginPath();
    ctx.moveTo(Math.cos(sAngle) * r + x, Math.sin(sAngle) * r + y);
    ctx.lineTo(x, y);
    ctx.strokeStyle = "#1A1A1A";
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.closePath();
    // 绘制弧形边线二
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(Math.cos(eAngle) * r + x, Math.sin(eAngle) * r + y);
    ctx.strokeStyle = "#1A1A1A";
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.closePath();
    // 绘制弧形线
    ctx.beginPath();
    ctx.arc(x, y, r, sAngle, eAngle);
    ctx.strokeStyle = "#1A1A1A";
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.closePath();
}

// 绘制图片
function drawImage(ctx, x, y, w, h, src) {
    ctx.beginPath();
    var img = new Image();
    img.src = src;
    img.onload = function () {
        ctx.drawImage(img, x, y, w, h);
        ctx.closePath();
    }
}

// 绘制线条
function drwaLine(ctx,x1,y1,x2,y2,w,c) {
    ctx.beginPath();
    ctx.moveTo(x1,y1);
    ctx.lineTo(x2,y2);
    ctx.lineWidth = w;
    ctx.strokeStyle = c;
    ctx.stroke();
}


// 获取扇形数组
function getSectors(precents) {
    if (precents.length != 3) {
        console.log("百分比数组元素个数不为3！");
        return;
    }
    var sectors = [];
    var sAngle = Math.PI * 3 / 2;
    for (var i = 0; i < precents.length; i++) {
        var floatValue = parseInt(precents[i]) / 100;
        var radian = Math.PI * 2 * floatValue;
        var x = centerX;
        var y = centerY;
        if (i == 0) {
            x = centerX + offset * Math.cos(sAngle + radian / 2);
            y = centerY + offset * Math.sin(sAngle + radian / 2);
        }
        sector = {
            x: x,
            y: y,
            r: r,
            sAngle: sAngle,
            eAngle: sAngle + radian,
            color: colors[i]
        }
        sAngle = sAngle + radian;
        sectors.push(sector);
    }
    return sectors;
}


// 获取百分比图片对象数组
function getPrecentImages(precent) {
    if (precent.length <= 0) {
        return;
    }
    var precentImages = [];
    for (var i = 0; i < precent.length; i++) {
        var char = precent.charAt(i);
        var precentImage = createPrecentImage(char);
        precentImages.push(precentImage);
    }
    return precentImages;
}

// 创建百分比图片对象
function createPrecentImage(numChar) {
    var width = 0;
    var src = "";
    if (numChar == "0") {
        width = 22;
        src = "image/0.png";
    } else if (numChar == "1") {
        width = 8;
        src = "image/1.png";
    } else if (numChar == "2") {
        width = 16;
        src = "image/2.png";
    } else if (numChar == "3") {
        width = 16;
        src = "image/3.png";
    } else if (numChar == "4") {
        width = 16;
        src = "image/4.png";
    } else if (numChar == "5") {
        width = 16;
        src = "image/5.png";
    } else if (numChar == "6") {
        width = 16;
        src = "image/6.png";
    } else if (numChar == "7") {
        width = 18;
        src = "image/7.png";
    } else if (numChar == "8") {
        width = 16;
        src = "image/8.png";
    } else if (numChar == "9") {
        width = 18;
        src = "image/9.png";
    } else if (numChar == "%") {
        width = 22;
        src = "image/precent.png";
    } else {
        console.log("百分比含有异常字符");
        return;
    }

    var precentImage = {
        width: width,
        height: 21,
        src: src,
        marginLeft: 1
    }

    return precentImage;
}


// 创建王者图片对象
function createKingImage(score) {
    var src = "";
    if (score >= 8) {
        src = "image/arrow_gxwz.png";
    } else if (score >= 4) {
        src = "image/arrow_zhwz.png";
    } else if (score > 0) {
        src = "image/arrow_sjwz.png";
    } else {
        console.log("得分不在0～9范围之内");
        return;
    }
    var kingImage = {
        width: 229,
        height: 33,
        src: src
    }

    return kingImage;
}