<template>
    <div>
        <div class="content">

            <div class="content_input">
                <div class="title">
                    <p>用户注册</p>
                </div>
                <el-form :model="param" :rules="rules" ref="login" label-width="80px" class="ms-content">
                    <el-form-item prop="username" label="用户名：">
                        <el-input v-model="param.username" clearable placeholder="用户名"
                                  style="margin-bottom: -20px"></el-input>
                    </el-form-item>
                    <el-form-item prop="password" label="密码：">
                        <el-input v-model="param.password" clearable show-password placeholder="密码"
                                  style="margin-bottom: -20px"></el-input>
                    </el-form-item>
                    <el-form-item prop="realname" label="姓名：">
                        <el-input v-model="param.realname" clearable placeholder="姓名"
                                  style="margin-bottom: -20px"></el-input>
                    </el-form-item>
                    <el-form-item label="年龄：" prop="age">
                        <el-input v-model.number="param.age" clearable placeholder="年龄"
                                  style="margin-bottom: -20px"></el-input>
                    </el-form-item>
                    <el-form-item label="性别：" prop="gender">
                        <el-radio-group v-model="param.gender">
                            <el-radio label="男" style="margin-left: 100px"></el-radio>
                            <el-radio label="女" style="margin-left: 30px"></el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="身份：" prop="role">
                        <el-radio-group v-model="param.role">
                            <el-radio label="学生" style="margin-left: 100px"></el-radio>
                            <el-radio label="教师" style="margin-left: 30px"></el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item>
                        <router-link tag="a" to="/login" style="font-size: 10px;float: right;margin-top: -20px">已有账号
                        </router-link>
                    </el-form-item>
                </el-form>
                <el-button type="primary" @click.native.prevent="submitClick" :loading="this.loading"
                           style="height: 40px;margin-left: 10px">注册
                </el-button>

            </div>

        </div>

        <el-dialog
            title="人机验证"
            :visible.sync="dialogVisible"
            center>
            <slide-verify
                ref="slideblock"
                @again="onAgain"
                @fulfilled="onFulfilled"
                @success="onSuccess"
                @fail="onFail"
                @refresh="onRefresh"
                :accuracy="accuracy"
                :slider-text="text"
            ></slide-verify>
            <div>{{this.msg}}</div>
        </el-dialog>
    </div>
</template>

<script>

import { postRequest } from '@/utils/axiousApi';

import('../../assets/js/ribbon');
// import("../../assets/js/login_index");

export default {
    name: 'loginPage',
    data() {
        return {
            username: '',
            PassWord: '',
            dialogVisible: false,
            accuracy: 5,
            text: '向右滑',
            msg: '',
            loading: false,
            param: {
                username: '',
                realname: '',
                password: '',
                gender: '',
                role: '学生',
                age: ''
            },
            rules: {
                username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
                password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
                realname: [{ required: true, message: '请输入真实姓名', trigger: 'blur' }],
                gender: [{ required: true, message: '请选择性别', trigger: 'blur' }],
                role: [{ required: true, message: '请选择身份', trigger: 'blur' }],
                age: [{ required: true, message: '年龄不能为空' }, { type: 'number', message: '年龄必须为数字值' }]
            }
        };
    },
    methods: {
        submitClick() {
            this.$refs.login.validate(valid => {
                if (valid) {
                    this.loading = true;
                    this.dialogVisible = true;
                    this.loading = false;
                } else {
                    this.$message.warning('请完善表单内容');
                    return false;
                }
            });
        },
        onSuccess(times){
            this.msg = '验证通过，耗时 +' + times + '毫秒'
            var md5pass = this.$md5(this.param.password);
            if (this.param.role === '学生') {
                postRequest('/register', {
                    'method': 'studentRegister',
                    'username': this.param.username,
                    'password': md5pass,
                    's_name': this.param.realname,
                    's_gender': this.param.gender,
                    's_age': this.param.age
                }).then(resp => {
                    var data = resp.data;
                    if (data.code == 200) {
                        this.$message.success(data.message);
                        this.$router.push('/login');
                        next();
                    } else {
                        this.$message.error(data.message);
                    }
                });
            } else if (this.param.role === '教师') {
                postRequest('/register', {
                    'method': 'teacherRegister',
                    'username': this.param.username,
                    'password': md5pass,
                    't_name': this.param.realname,
                    't_gender': this.param.gender,
                    't_age': this.param.age
                }).then(resp => {
                    var data = resp.data;
                    if (data.code == 200) {
                        this.$message.success(data.message);
                        this.$router.push('/login');
                        next();
                    } else {
                        this.$message.error(data.message);
                    }
                });
            } else {
                this.$message.warning('未知错误，请刷新网页');
            }
        },
        onFail(){
            console.log('验证不通过');
            this.msg = ''
        },
        onRefresh(){
            console.log('点击了刷新小图标');
            this.msg = ''
        },
        onFulfilled() {
            console.log('刷新成功啦！');
        },
        onAgain() {
            console.log('检测到非人为操作的哦！');
            this.msg = 'try again';
            // 刷新
            this.$refs.slideblock.reset();
        },
        handleClick() {
            // 父组件直接可以调用刷新方法
            this.$refs.slideblock.reset();
        },
    }
};
</script>

<style scoped>
* {
    padding: 0;
    margin: 0;
}

.content {
    width: 700px;
    height: 500px;
    box-sizing: border-box;
    padding: 0 50px;
    border-radius: 5px;
    box-shadow: 0px 2px 12px 0px rgba(105, 105, 105, 0.07);
    background: rgba(255, 255, 255, 0.5);
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    animation: mymove 1s ease-in-out alternate;
    overflow: hidden;
    transition: 1.5s;
}

@keyframes mymove {
    0% {
        width: 0px;
        height: 5px;
    }

    10% {
        width: 50px;
        height: 5px;
    }

    15% {
        width: 100px;
        height: 5px;
    }

    20% {
        width: 150px;
        height: 5px;
    }

    25% {
        width: 200px;
        height: 5px;
    }

    30% {
        width: 250px;
        height: 5px;
    }

    35% {
        width: 300px;
        height: 5px;
    }

    40% {
        width: 350px;
        height: 5px;
    }

    45% {
        width: 450px;
        height: 5px;
    }

    50% {
        width: 500px;
        height: 5px;
    }

    55% {
        height: 30px;
    }

    60% {
        height: 60px;
    }

    65% {
        height: 90px;
    }

    70% {
        height: 120px;
    }

    75% {
        height: 150px;
    }

    80% {
        height: 180px;
    }

    85% {
        height: 210px;
    }

    90% {
        height: 240px;
    }

    95% {
        height: 240px;
    }

    100% {
        height: 300px;
    }
}

.content_input {
    width: 400px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

}

.content_button {
    margin-top: 10px;
}

.el-input {
    margin-bottom: 25px;
}

.title {
    text-align: center;
    font-size: 24px;
    margin-bottom: 30px;
    font-weight: bold;
    color: #606266;
}

.el-button--primary {
    width: 100%;

}
</style>