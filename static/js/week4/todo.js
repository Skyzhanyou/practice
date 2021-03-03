$(function () {
    let todo_list = $('#todo_list tr');
    let todo_list_content = $('#todo_list .content');
    let todo_list_time = $('#todo_list .time');
    let doBtn = $('#todo_list .btn-primary'); //状态改变按钮
    let delBtn = $('#todo_list .btn-danger'); //删除按钮
    let csrf_token = $('#csrf_token').attr('value'); //凭证，（重要）
    let addBtn = $('.glyphicon-plus'); //加号按钮
    let searchBtn = $('.glyphicon-search'); //查询按钮
    // let editBtn = $('.glyphicon-edit');                  //编辑按钮
    let editBtn = $('#todo_list .btn-info') //编辑按钮

    // console.log(editBtn)

    // 状态改变
    for (let i = 0; i < doBtn.length; i++) {
        doBtn[i].onclick = function () {
            let ctime = doBtn[i].value;
            // console.log(ctime, csrf_token);
            $.post('/changeTodo/', {
                'ctime': ctime,
                csrf_token: csrf_token
            })
            if (doBtn[i].innerHTML == 'Undone') {
                doBtn[i].innerHTML = 'Done';
                todo_list[i + 1].style.backgroundColor = '#d9edf7';
            } else {
                doBtn[i].innerHTML = 'Undone';
                todo_list[i + 1].style.backgroundColor = '#f2dede';
            }
        }
    };

    // 删除
    for (let i = 0; i < delBtn.length; i++) {
        delBtn[i].onclick = function () {
            let ltime = delBtn[i].value
            // console.log(ltime, csrf_token)
            $.post('/delTodo/', {
                'ltime': ltime,
                csrf_token: csrf_token
            })
            todo_list[i + 1].remove()
        }
    };

    // 加号点击效果
    addBtn.click(function () {
        $('.add-todo').slideToggle();
    })

    // 查询点击效果
    searchBtn.click(function () {
        $('.search-todo').slideToggle();
    })

    // 编辑
    // editBtn.click(function() {
    //     $('.eidt-todo').slideToggle();
    // })
    for (let i = 0; i < editBtn.length; i++) {

        editBtn[i].onclick = function () {
            if (editBtn[i].innerHTML != 'Submit') {
                todo_list_content[i + 1].innerHTML = '<input type="text" value="' + todo_list_content[i + 1].innerHTML + '">'
                todo_list_time[i + 1].innerHTML = '<input type="text" value="' + todo_list_time[i + 1].innerHTML + '">'
                editBtn[i].innerHTML = 'Submit'
            } else {
                todo_list_content[i + 1].innerHTML = todo_list_content[i + 1].firstChild.value
                todo_list_time[i + 1].innerHTML = todo_list_time[i + 1].firstChild.value
                editBtn[i].innerHTML = '<span class="glyphicon glyphicon-edit" aria-hidden="true"></span> Edit'
                let etime = editBtn[i].value
                let c_content = todo_list_content[i + 1].innerHTML
                let c_time = todo_list_time[i + 1].innerHTML
                // console.log(etime, c_content, c_time)
                $.post('/editTodo/', {
                    'etime': etime,
                    'c_content': c_content,
                    'c_time': c_time,
                    csrf_token: csrf_token
                })
            }
        }

    }
})