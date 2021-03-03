// alert("Hello world");
// console.log("Hello world");
// console.log(typeof typeof 2);

function _$(id) {
    return document.getElementById(id);
}

function add(num1, num2) {
    return num1 + num2;
}

function renderResult(result) {
    _$("result").innerHTML = result;
}

function addEventHandle() {
    var num1 = _$("number1").value;
    var num2 = _$("number2").value;
    // console.log(typeof(num1));
    var result = add(num1, num2);
    renderResult(result);
}

function initEvent() {
    _$("addbtn").addEventListener("click", addEventHandle, false);
}

initEvent();