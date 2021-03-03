# -*- coding:utf-8 -*-
"""
封装数据库操作, 自定义元类, 定义Model组件
"""
import re

from flask_login import UserMixin
from mongoengine import DynamicDocument, StringField, IntField, connect

connect('cky', host='127.0.0.1', port=27017)


# 定义用户
class User(DynamicDocument, UserMixin):
    meta = {
        'collection': 'user',
        'strict': False
    }
    user_name = StringField(required=True, db_field='n')
    user_pwd = StringField(required=True, db_field='p')


# 定义todo内容
class TodoList(DynamicDocument):
    meta = {
        'collection': 'todo_list',
        # 'ordering' : ['-time']
    }
    user_name = StringField(required=True, db_field='n')
    content = StringField(required=True, db_field='c')
    time = StringField(required=True, db_field='t')
    done = IntField(required=True, db_field='d')


# 方法
class Methods(object):
    message = ''

    def __init__(self, u_name):
        self.u_name = u_name

    # 注册用户
    def add_user(self, u_pwd):
        user = User(
            user_name=self.u_name,
            user_pwd=u_pwd
        )
        if User.objects(user_name=user.user_name).first() is None:
            user.save()
            message = '注册成功'
            return message
        else:
            message = '用户名已存在'
            # print(message)
            return message

    # 添加todo内容
    def add_todo(self, t_content, t_time):
        todo = TodoList(
            user_name=self.u_name,
            content=t_content,
            time=t_time,
            done=0
        )
        user = User.objects(user_name=self.u_name).first()
        ttime = TodoList.objects(time=t_time).first()
        # print(ttime)
        if user:
            if ttime is None:
                todo.save()
                message = '添加成功'
                return message
                # us.update(unset__user_todo=1)     #清空todo内容
                # print(us.user_todo)
            else:
                message = '时间冲突'
                return message
        else:
            print('请注册用户')

    # 删除todo内容
    def del_todo(self, t_time):
        todo = TodoList.objects(user_name=self.u_name, time=t_time).first()
        todo.delete()

    # 按时间戳查询todo内容
    def search_todo(self, t_time):
        todo = TodoList.objects(user_name=self.u_name, time=t_time).all()
        if len(todo) == 0:
            message = '无结果'
            return message
        else:
            print(todo)
            return todo

    # 字符串匹配查询todo内容
    def search_by_str(self, t_str):
        todo_list = TodoList.objects(user_name=self.u_name).all()
        todo = []
        for i in todo_list:
            if re.match(t_str, i.content):
                todo.append(i)
        if len(todo) == 0:
            message = '无结果'
            return message
        else:
            return todo

    # 更改todo内容
    def update_todo(self, t_time, c_content, c_time):
        todo = TodoList.objects(user_name=self.u_name, time=t_time).first()
        u_todo = TodoList.objects(user_name=self.u_name, time=c_time).all()
        if len(u_todo) > 1:
            message = '时间冲突'
            print(message)
            return message
        else:
            todo.update(set__c=c_content, set__t=c_time)

    # 更改todo状态
    def change_state(self, t_time):
        todo = TodoList.objects(user_name=self.u_name, time=t_time).first()
        if todo.done == 0:
            todo.update(set__d=1)
        else:
            todo.update(set__d=0)


# 模拟注册
# add_user('cky', '123456')
# add_user('test', '123456abc')
# Methods('cky').add_user('123456')
# # print(Methods('cky').add_user('123456'))

# 模拟添加todo
# add_todo('cky', 'hello world', '2019-7-26 11:00')
# add_todo('test', 'hello world', '2019-7-26 11:00')
# Methods('cky').add_todo('hello world', '2019-7-26 11:00')

# 模拟删除todo内容
# Methods('cky').del_todo('2019-07-02 23:59')

# 模拟查询todo内容
# Methods('cky').search_todo('2019-07-01 13:00')

# 模拟更改todo内容
# Methods('cky').update_todo('2019-08-06 01:03', 'changed', '2019-07-01 12:00')

# 模拟更改todo状态
# Methods('cky').change_state('2019-07-06 00:00', 0)
# Methods('cky').change_state('2019-07-06 00:00')

# all = TodoList.objects(user_name='cky').all()
# todo = []
# for i in all:
#     print('user_name:', i.user_name)
#     print('content:', i.content)
#     print('time:', i.time)
#     print('done:', i.done)
#     print('id:', i.id, '\n')
#     if re.match('h', i.content):
#             todo.append(i)
# print(todo)