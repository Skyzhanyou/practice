# -*- coding:utf-8 -*-
import os

from datetime import timedelta
from flask import Flask
from flask_login import LoginManager
from views.test import test

# 引入user模块
from models.mongoEngine import User

# 初始化 Flask Application
app = Flask(__name__)

# 设置flask缓存时长
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = timedelta(seconds=1)

# flask_login配置
app.secret_key = os.urandom(24)
login_manager = LoginManager()
login_manager.session_protection = 'strong'
login_manager.login_view = 'test.tlogin'
login_manager.init_app(app)


@login_manager.user_loader
def load_user(user_id):
    user = User.objects(id=user_id).first()
    return user


# 注册蓝图路由
app.register_blueprint(test, url_prefix='/')

# 启动Flask服务
if __name__ == '__main__':
    app.run(debug=True)
