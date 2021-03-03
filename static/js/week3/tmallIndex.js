var $wrap = $(".wrap");
var index = 0;

// 切图
function next_pic() {
    index++;
    if (index > 5) {
        index = 0;
    }
    showCurrentDot();
    var newLeft;
    if ($wrap.css('left') === "-7920px") { //最后一张图的情况
        newLeft = -1320;                    //切换到第一张图，1320为图片宽度
    } else {
        newLeft = parseInt($wrap.css('left')) - 1320; //切换到下一张图片位置
    }
    $wrap.css('left', newLeft + "px");
    // console.log(index);
}

// 自动播放
var timer = null;

function autoPlay() {
    timer = setInterval(function () {
        next_pic();
    }, 2000);
}
autoPlay();
//console.log(typeof timer);

// 鼠标移至图片停止播放
var $container = $(".container.width");
$container.mouseenter(function () {
    clearInterval(timer);
})
$container.mouseleave(function () {
    autoPlay();
})

// 图标变换
var $dots = $(".buttons span");
// console.log(dots);
function showCurrentDot() {
    for (var i = 0, len = $dots.length; i < len; i++) {
        $dots[i].className = "";
    }
    $dots[index].className = "on";
}

// 点击图标切图
for (var i = 0, len = $dots.length; i < len; i++) {
    (function (i) {
        // console.log(dots[i]);
        $dots[i].onclick = function () {
            var dis = index - i;
            // console.log(dis);
            if (index == 5 && parseInt($wrap.css('left')) !== -7920) {
                dis = dis - 6;
            }
            if (index == 0 && parseInt($wrap.css('left')) !== -1320) {
                dis = 6 + dis;
            }
            $wrap.css('left', parseInt($wrap.css('left')) + dis * 1320 + "px");
            index = i;
            showCurrentDot();
        }
    })(i);
}