$(function () {
    // 淡入淡出
    $('#fade-toggle').click(function () {
        $('body>p').fadeToggle();
    })

    $('#fade-hide').click(function () {
        $('body>p').fadeOut();
    })

    $('#fade-show').click(function () {
        $('body>p').fadeIn();
    })


    // 滑入滑出
    $('#slide-toggle').click(function () {
        $('body>p').slideToggle();
    })

    $('#slide-hide').click(function () {
        $('body>p').slideUp();
    })

    $('#slide-show').click(function () {
        $('body>p').slideDown();
    })


    // 动画
    $("div.hello").click(function () {
        var hello = $("div.hello");
        hello.animate({
            left: '100px'
        }, "slow");
        hello.animate({
            fontSize: '3em'
        }, "slow");
    });


    // 停止动画
    $("#flip").click(function () {
        $("#panel").slideDown(5000);
    });
    $("#stop").click(function () {
        $("#panel").stop();
    });


    // 选择器方法
    $('#test-jquery p').click(function () {
        $('#test-jquery p:nth-child(even)').css('background-color', '#ffd351');
        $('#test-jquery p:nth-child(odd)').css('background-color', '#00d8ff');
    });

    var lang = $('ul.lang');
    var langs = $('ul.lang li');
    console.log(lang);
    console.log(langs);
    var langMap = langs.map(function () {
        return this.innerHTML;
    }).get();
    console.log(langMap);
    var dy = lang.find('.dy');
    console.log(dy);
    var a = langs.filter('.dy');
    console.log(a);
    console.log(dy == a);
    var swift = lang.find('#swift');
    console.log(swift);
    console.log(swift.next());
    console.log(swift.prev());
    var haskell = lang.find('[name = haskell]');
    console.log(haskell);

    var result = {};
    $('#test-form button').click(function () {
        $('#test-form :input').filter(function () {
            return this.type != 'radio' && this.type != 'submit' || this.checked
        }).map(function () {
            result[this.name] = this.value;
        });
        json = JSON.stringify(result);
        console.log(json);
    });

    // DOM操作
    var testUlJs = $('#test-ul li.js');
    var testUlBook = $('#test-ul li[name = book]');
    var testDelete = $('#test-ul li#delete');
    testUlJs.html('<span style="color: red">JavaScript</span>');
    testUlBook.text('JavaScript');
    testUlJs.append('<span>好用</span>');
    testDelete.remove();

    var testImg = $('#test-img img.test-img');
    //testImg.css('width', '20%*$(window).width()').css('height', '10%*$(window).height()');
    testImg.width(0.1 * $(window).width())
    testImg.height(0.1 * $(window).height())
    $('#test-img button#fade').click(function () {
        testImg.fadeToggle();
    });
    $('#test-img button#slide').click(function () {
        testImg.slideToggle();
    });

    $('#test-div button#run').click(function () {
        var text = ['Pascal', 'Lua', 'Ruby'];
        var div = $('#test-div>ul');
        for (let i = 0; i < text.length; i++) {
            div.append('<li><span>' + text[i] + '</span></li>');
        };
        var sortLi = div.find('li');
        sortLi.sort((x, y) => {
            return x.innerText >= y.innerText ? 1 : -1;
        });
        div.append(sortLi);
    });


    // ajax
    $('button.ajax-test').click(function () {
        function ajaxPrint(x) {
            $('input#ajax-test').val(x);
        };

        $.ajax('./ajaxTest', {}).done(function (data) {
            ajaxPrint('成功, 收到的数据: ' + JSON.stringify(data));
        }).fail(function (xhr, status) {
            ajaxPrint('失败: ' + xhr.status + ', 原因: ' + status);
        });
    })


    // 跨域
    // jsonp
    $('button.jsonp').click(function () {
        function jsonpPrint(x) {
            $('textarea#jsonp').val('Runoob测试数据：' + x);
        };

        $.getJSON('https://www.runoob.com/try/ajax/jsonp.php?jsoncallback=?', {}).done(function (data) {
            jsonpPrint(JSON.stringify(data));
        }).fail(function (xhr, status) {
            jsonpPrint('失败: ' + xhr.status + ', 原因: ' + status);
        });
    })
    // CORS
    $('button.cors').click(function () {
        function corsPrint(x) {
            $('textarea#cors').val('Runoob测试数据：' + x);
        };

        $.ajax('https://www.runoob.com/try/ajax/jsonp.php?jsoncallback=?', {
            dataType: 'json'
        }).done(function (data) {
            corsPrint(JSON.stringify(data));
        }).fail(function (xhr, status) {
            corsPrint('失败: ' + xhr.status + ', 原因: ' + status);
        });
    })
});