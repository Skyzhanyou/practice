// 字符串方法
console.log('// 字符串方法')
var s = 'hello, world';
console.log(s.length);
console.log(s[5]);
console.log(s.charAt(5));
console.log(s.toUpperCase());
console.log(s.toLowerCase());
console.log(s.indexOf('world'));
console.log(s.indexOf('World'));
console.log(s.substring(0, 5));
console.log(s.substring(7));
console.log(s.slice(0));


// 数组方法
console.log('// 数组方法')
var arr = [1, 2, 3.14, 'Hello', null, true];
console.log(arr.length);
arr.length = 2;
console.log(arr);
arr.length = 8;
console.log(arr);
arr[9] = 'd';
console.log(arr);
console.log(arr.indexOf(2));
console.log(arr.slice(0, 3));
arr.push('A', 'B');
console.log(arr);
arr.pop();
console.log(arr);
arr.unshift('A', 'B');
console.log(arr);
arr.shift();
console.log(arr);
console.log(arr.sort());
console.log(arr.reverse());
arr.splice(2, 3, 'Google', 'Facebook'); // 从索引2开始删除3个元素,然后再添加两个元素:
console.log(arr);
arr.splice(2, 2); // 只删除,不添加:
console.log(arr);
console.log(arr.concat(1, 2, [3, 4]));
console.log(arr.join('-'));
console.log(arr.map(x => x * x));
var arr1 = [1, 2, 2, 5, 6, 8, 456, 31, 2];
console.log(arr1.reduce((x, y) => x * y));
console.log(arr1.filter((x) => x % 2 !== 0));


// 对象
console.log('// 对象')
var xiaoming = {
    name: '小明',
    birth: 1990,
    school: 'No.1 Middle School',
    height: 1.70,
    weight: 65,
    score: null
};
console.log(xiaoming.name);
console.log('name' in xiaoming);


// 循环
console.log('// 循环')
var arr = ['Apple', 'Google', 'Microsoft'];
var i, x;
for (i = 0; i < arr.length; i++) {
    x = arr[i];
    console.log(x);
}
// iterable
var o = {
    name: 'Jack',
    age: 20,
    city: 'Beijing'
};
for (var key in o) {
    console.log(key);
    if (o.hasOwnProperty(key)) {
        console.log(key);
    }
}

var a = [1, 2, 3, 698, 84, 54, 4];
for (var b of a) {
    console.log(b);
}


// Map和Set
console.log('// Map和Set')
var m = new Map([
    ['Michael', 95],
    ['Bob', 75],
    ['Tracy', 85]
]);
console.log(m.get('Michael'));
m.set('Adam', 67);
console.log(m);
console.log(m.has('Adam'));
m.delete('Adam');
console.log(m);

var s = new Set([1, 2, 3, 3, '3']);
console.log(s);
s.add(4);
console.log(s);
s.add(4);
console.log(s);
s.delete(4);
console.log(s);


// 函数
console.log('// 函数')

function abs(x) {
    if (x >= 0) {
        return x;
    } else {
        return -x;
    }
}
console.log(abs(-9));

function foo(x) {
    console.log('x = ' + x); // 10
    for (var i = 0; i < arguments.length; i++) {
        console.log('arg ' + i + ' = ' + arguments[i]); // 10, 20, 30
    }
}
foo(10, 20, 30);

function foo1(a, b, ...rest) {
    console.log('a = ' + a);
    console.log('b = ' + b);
    console.log(rest);
}
foo1(1, 2, 3, 4, 5);

var xiaoming = {
    name: '小明',
    birth: 1990,
    age: function () {
        var y = new Date().getFullYear();
        return y - this.birth;
    }
};
console.log(xiaoming.age);
console.log(xiaoming.age());


// class类
console.log('// class类');
class Animal {
    constructor(name) {
        this.name = name;
    }
}
class Cat extends Animal {
    say() {
        return 'Hello, ' + this.name + '!';
    }
}
var cat = new Cat('哆啦A梦');
console.log(cat.say());


// 浏览器对象
console.log('// 浏览器对象');
console.log('window inner size: ' + window.innerWidth + ' x ' + window.innerHeight);
console.log('appName = ' + navigator.appName);
console.log('appVersion = ' + navigator.appVersion);
console.log('language = ' + navigator.language);
console.log('platform = ' + navigator.platform);
console.log('userAgent = ' + navigator.userAgent);
console.log('Screen size = ' + screen.width + ' x ' + screen.height);
console.log(location.protocol);
console.log(location.host);
console.log(location.port);
console.log(location.pathname);
console.log(location.search);
console.log(location.hash);
document.title = '努力学习JavaScript!';
var menu = document.getElementById('drink-menu');
var drinks = document.getElementsByTagName('dt');
var i, s;

s = '提供的饮料有:';
for (i = 0; i < drinks.length; i++) {
    s = s + drinks[i].innerHTML + ',';
}
console.log(s);
console.log(document.cookie);


// 操作DOM
console.log('// 操作DOM');
var js = document.getElementById('test-js');
var div = document.getElementById('test-div');
js.innerHTML = 'JavaScript';
js.style.color = '#ff0000';
js.style.fontWeight = 'bold';
var newDom = document.createElement('p');
newDom.id = "newDom";
newDom.innerHTML = "新的Dom";
div.appendChild(newDom);
div.removeChild(div.children[1]);


// 操作表单
console.log('// 操作表单');

function checkRegisterForm() {
    var error = document.getElementById('test-error');

    var userName = document.getElementById('username');
    var nameReg = /^[a-zA-Z0-9]{3,10}$/;
    if (!nameReg.test(userName.value)) {
        error.innerHTML = "用户名必须是3-10位英文字母或数字";
        return false;
    }

    var pwd = document.getElementById('password');
    var pwdReg = /^.{6,20}$/;
    if (!pwdReg.test(pwd.value)) {
        error.innerHTML = "口令必须是6-20位";
        return false;
    }

    var pwd2 = document.getElementById('password-2');
    if (pwd2.value != pwd.value) {
        error.innerHTML = "两次输入口令必须一致";
        return false;
    }

    return true;
    console.log('成功操作表单');
}


// ajax
function ajax() {
    function success(text) {
        var textarea = document.getElementById('test-response-text');
        textarea.value = text;
    }

    function fail(code) {
        var textarea = document.getElementById('test-response-text');
        textarea.value = 'Error code: ' + code;
    }

    var request = new XMLHttpRequest(); // 新建XMLHttpRequest对象

    request.onreadystatechange = function () { // 状态发生变化时，函数被回调
        if (request.readyState === 4) { // 成功完成
            // 判断响应结果:
            if (request.status === 200) {
                // 成功，通过responseText拿到响应的文本:
                return success(request.responseText);
            } else {
                // 失败，根据响应码判断失败原因:
                return fail(request.status);
            }
        } else {
            // HTTP请求还在继续...
        }
    }

    // 发送请求:
    request.open('GET', './ajaxTest');
    request.send();

    alert('请求已发送，请等待响应...');
    console.log('// ajax');
    console.log('ajax请求成功');
}


// Promise
console.log('// Promise');
// 0.5秒后返回input*input的计算结果:
function multiply(input) {
    return new Promise(function (resolve, reject) {
        console.log('calculating ' + input + ' x ' + input + '...');
        setTimeout(resolve, 500, input * input);
    });
}

// 0.5秒后返回input+input的计算结果:
function add(input) {
    return new Promise(function (resolve, reject) {
        console.log('calculating ' + input + ' + ' + input + '...');
        setTimeout(resolve, 500, input + input);
    });
}

var p = new Promise(function (resolve, reject) {
    console.log('start new Promise...');
    resolve(123);
});

p.then(multiply)
    .then(add)
    .then(multiply)
    .then(add)
    .then(function (result) {
        console.log('Got value: ' + result);
    });

// ajax函数将返回Promise对象:
function proAjax() {
    function pAjax(method, url, data) {
        var request = new XMLHttpRequest();
        return new Promise(function (resolve, reject) {
            request.onreadystatechange = function () {
                if (request.readyState === 4) {
                    if (request.status === 200) {
                        resolve(request.responseText);
                    } else {
                        reject(request.status);
                    }
                }
            };
            request.open(method, url);
            request.send(data);
        });
    }
    var log = document.getElementById('test-promise-ajax-result');
    var p = pAjax('GET', './ajaxTest');
    p.then(function (text) { // 如果AJAX成功，获得响应内容
        log.value = text;
    }).catch(function (status) { // 如果AJAX失败，获得响应代码
        log.value = 'ERROR: ' + status;
    });
    console.log('通过Promise对象进行ajax请求成功');
}

window.onerror = function (msg, url, line, col, error) {
    // 直接将错误打印到控制台
    console.log(arguments)
    var err = arguments
    // console.log(err[4])

    var tr = document.createElement('tr')
    tr.innerHTML = '<td>' + err[0] + '</td><td>' +
        err[1] + '</td><td>' +
        err[2] + '</td><td>' +
        err[3] + '</td><td>' +
        err[4] + '</td>'
    document.getElementById('js-log').appendChild(tr)

    // 方便在未打开控制台的时候，记录错误对象
    // window.demoError = arguments
    // console.error(window.demoError)

}

var per = window.performance;
console.log(per)

window.addEventListener('error', function (e) {
    this.console.log(e)
})

function staticError() {
    html2canvas(document.body).then(canvas => {
        // console.log(canvas)
        var tr = document.createElement('tr')
        tr.innerHTML = '<td>static</td>'
        tr.appendChild(canvas)
        document.getElementById('static-log').appendChild(tr)
    })
}

// tr.createElement('td').innerHTML = error[1]
// tr.createElement('td').innerHTML = error[2]
// tr.createElement('td').innerHTML = error[3]
// tr.createElement('td').innerHTML = error[4]
function makeError() {
    var name = "geoff"
    var msg = "Hi, " + Name
    console.log(msg)
}
makeError()
