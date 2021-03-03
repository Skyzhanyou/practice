# -*- coding:utf-8 -*-
"""
定义表单类
"""

from flask_wtf import FlaskForm
from wtforms import validators, StringField, PasswordField, SubmitField, DateTimeField


# 登录表单
class UserForm(FlaskForm):
    name = StringField('用户名：', [validators.DataRequired()])
    pwd = PasswordField('密码：', [validators.DataRequired()])
    submit = SubmitField('提交')


# todoList添加表单
class AddTodoForm(FlaskForm):
    content = StringField('content：', [validators.DataRequired()])
    time = StringField('time：', [validators.DataRequired()])
    submit = SubmitField('add')


# todo查询表单
class SearchForm(FlaskForm):
    content = StringField([validators.DataRequired()])
    submit = SubmitField('search')


# todo编辑表单
class EditForm(FlaskForm):
    content = StringField('change content：', [validators.DataRequired()])
    esubmit = SubmitField('change')
