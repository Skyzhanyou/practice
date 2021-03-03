# -*- coding:utf-8 -*-
"""
练习蓝图路由、flask_login
"""
import re

from flask import Blueprint, render_template, redirect, url_for, request
from flask_login import login_required, login_user, logout_user, current_user
from models.mongoEngine import User, Methods, TodoList

# 引入用户表单模块
from forms.forms import UserForm, AddTodoForm, SearchForm, EditForm

test = Blueprint('test', __name__)


# 主页导航
@test.route('/', methods=('GET', 'POST'))
def index():
    """

    """
    return render_template('index.html')


# 天猫商品详情页
@test.route('/tmallInfo/', methods=('GET', 'POST'))
def tmallInfo():
    """

    """
    return render_template('tmall/tmallInfo.html')


# 天猫首页
@test.route('/tmallIndex/', methods=('GET', 'POST'))
def tmallIndex():
    """

    """
    return render_template('tmall/tmallIndex.html')


# 天猫商品列表页
@test.route('/tmall/', methods=('GET', 'POST'))
def tmall():
    """

    """
    return render_template('tmall/tmall.html')


# 淘宝商品列表页
@test.route('/taobao/', methods=('GET', 'POST'))
def taobao():
    """

    """
    return render_template('taobao/taobao.html')


# 页面1
@test.route('/page1/', methods=('GET', 'POST'))
def page1():
    """

    """
    return render_template('page/page1.html')


# 页面2
@test.route('/page2/', methods=('GET', 'POST'))
def page2():
    """

    """
    return render_template('page/page2.html')


# jQuery练习
@test.route('/jqTest/', methods=('GET', 'POST'))
def jqTest():
    """

    """
    return render_template('jqTest/jqTest.html')


# js练习
@test.route('/jsTest/', methods=('GET', 'POST'))
def jsTest():
    """

    """
    return render_template('jsTest/jsTest.html')


# ajax测试文件
@test.route('/ajaxTest/', methods=('GET', 'POST'))
def ajaxTest():
    """

    """
    return render_template('jsTest/ajaxTest')


# 数据仪表盘
@test.route('/dashboard/', methods=('GET', 'POST'))
def dashboard():
    """

    """
    return render_template('dashboard/dashboard.html')


# 柱状图数据
@test.route('/obama_budget_proposal_2012.list/', methods=('GET', 'POST'))
def obama():
    """

    """
    return render_template('dashboard/obama_budget_proposal_2012.list.json')


# 妹子ui
@test.route('/amaze/')
def amaze():
    return render_template('amaze/amaze.html')


# todo登录
@test.route('/tlogin/', methods=['GET', 'POST'])
def tlogin():
    form = UserForm()  # 表单对象
    warn = ''
    if form.validate_on_submit():  # 表单提交
        user_data = User.objects(user_name=form.name.data).first()  # 数据库用户认证
        if user_data:
            if form.pwd.data == user_data.user_pwd:
                login_user(user_data)
                return redirect(url_for('test.todo'))
            else:
                warn = '密码错误'
        else:
            warn = '用户不存在'

    return render_template('todo/tlogin.html',
                           title="Sign In",
                           form=form,
                           warn=warn)


# todo登录成功
@test.route('/todo/', methods=['GET', 'POST'])
@login_required
def todo():
    user_name = current_user.user_name  # 用户
    todo_list = TodoList.objects(user_name=user_name).all().order_by(
        '-t')  # todo list数据
    form = AddTodoForm()  # 添加表单
    sform = SearchForm()  # 查询表单
    eform = EditForm()  # 编辑表单
    warn = ''  # 提示信息

    # todo添加逻辑
    if form.submit.data and form.validate_on_submit():
        time = re.sub(r'[T]', ' ', request.form['time'])
        # print(time)
        warn = Methods(user_name).add_todo(form.content.data, time)
        if warn == '添加成功':
            return redirect(url_for('test.todo'))

    # todo查询逻辑
    elif sform.submit.data and sform.validate_on_submit():
        # 按时间戳查询
        # time = re.sub(r'[T]', ' ', request.form['stime'])
        # warn = Methods(user_name).search_todo(time)

        # 字符串匹配查询
        warn = Methods(user_name).search_by_str(sform.content.data)

        # 时间段查询

        if warn == '无结果':
            todo_list = []
        else:
            todo_list = warn

        return render_template('todo/todo.html',
                               user_name=user_name,
                               form=form,
                               sform=sform,
                               eform=eform,
                               warn=warn,
                               todo_list=todo_list)

    # todo编辑
    # elif eform.esubmit.data and eform.validate_on_submit():
    #     etime = re.sub(r'[T]', ' ', request.form['etime'])
    #     ctime = re.sub(r'[T]', ' ', request.form['ctime'])
    #     warn = Methods(user_name).update_todo(etime, eform.content.data, ctime)
    #     # print(warn)
    #     if warn != '时间错误':
    #         return redirect(url_for('test.todo'))

    return render_template('todo/todo.html',
                           user_name=user_name,
                           form=form,
                           sform=sform,
                           eform=eform,
                           warn=warn,
                           todo_list=todo_list)


# todo登出
@test.route('/tlogout/', methods=['GET', 'POST'])
@login_required
def tlogout():
    logout_user()
    return redirect(url_for('test.tlogin'))


# todo注册
@test.route('/tsignin/', methods=['GET', 'POST'])
def tsignin():
    form = UserForm()
    warn = ''
    if form.validate_on_submit():
        warn = Methods(form.name.data).add_user(form.pwd.data)

    return render_template('todo/tsignin.html', form=form, warn=warn)


# todo删除
@test.route('/delTodo/', methods=['POST'])
@login_required
def del_todo():
    user_name = current_user.user_name
    Methods(user_name).del_todo(request.form['ltime'])
    return redirect(url_for('test.todo'))


# todo状态改变
@test.route('/changeTodo/', methods=['POST'])
@login_required
def change_todo():
    user_name = current_user.user_name
    Methods(user_name).change_state(request.form['ctime'])
    return redirect(url_for('test.todo'))


# todo编辑
@test.route('/editTodo/', methods=['POST'])
@login_required
def edit_todo():
    user_name = current_user.user_name
    etime = request.form['etime']
    c_content = request.form['c_content']
    c_time = request.form['c_time']
    warn = Methods(user_name).update_todo(etime, c_content, c_time)
    if warn == '时间冲突':
        return redirect(url_for('test.todo', warn=warn))
    else:
        return redirect(url_for('test.todo'))