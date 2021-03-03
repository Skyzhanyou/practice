// 商品幻灯片
var imgBottom = document.getElementById('img-bottom');
imgBottom.onmouseover = function (ev) {
    var evn = ev || event; //兼容处理
    var target = evn.target || evn.srcElement; 
    // console.log(target);
    var evImg = imgBottom.getElementsByTagName('a');
    // console.log(evImg);
    for (var i = 0; i < evImg.length; i++) {
        evImg[i].getElementsByTagName('img')[0].style.border = 'none';
        // console.log(evImg[i].getElementsByTagName('img')[0]);
    }
    if (target.nodeName.toLowerCase() == 'img') {
        document.querySelector('#img-top img').setAttribute('src',target.getAttribute('src'));
        target.style.border = 'black solid 2px';
    }
}
