<template>
    <div class="content">

        <div class="content_input">
            <div class="title">
                <p>用户登录</p>
            </div>
            <el-form :model="param" :rules="rules" ref="login" label-width="0px" class="ms-content">
                <el-form-item prop="username">
                    <el-input v-model="param.username" clearable placeholder="用户名"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input v-model="param.password" clearable show-password placeholder="密码"></el-input>
                </el-form-item>
                <el-form-item>
                    <router-link tag="a" to="/register" style="font-size: 10px;float: right;margin-top: -20px;margin-left: 20px">忘记密码？</router-link>
                    <router-link tag="a" to="/register" style="font-size: 10px;float: right;margin-top: -20px">没有账号？</router-link>
                </el-form-item>
                <el-form-item class="login-btn">
                    <el-button type="primary" @click.native.prevent="submitClick" :loading="this.loading" style="height: 40px">登录</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>

import("../../assets/js/ribbon");
// import("../../assets/js/login_index");

export default {
    name: 'loginPage',
    data() {
        return {
            UserName: '',
            PassWord: '',
            loading: false,
            param: {
                username: 'wuyue',
                password: '123456',
            },
            sendParam: {
                username: '',
                password: '',
            },
            rules: {
                username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
                password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
            },
        };
    },
    methods: {
        submitClick() {
            this.$refs.login.validate(valid => {
                if (valid) {
                    this.loading = true;
                    var md5Pass = this.$md5(this.param.password)
                    this.sendParam.username = this.param.username
                    this.sendParam.password = md5Pass
                    this.$store.dispatch('user/login', this.sendParam)
                        .then(() => {
                            this.$message.success('登陆成功！')
                            this.$router.push('/dashboard');
                            next();
                            this.loading = false
                        })
                        .catch(() => {
                            this.loading = false
                        })
                } else {
                    console.log('error submit!!')
                    return false
                }
            });
        }
    }
};
</script>

<style scoped>
* {
    padding: 0;
    margin: 0;
}

.content {
    width: 500px;
    height: 400px;
    box-sizing: border-box;
    padding: 0 50px;
    border-radius: 5px;
    box-shadow: 0px 2px 12px 0px rgba(105, 105, 105, 0.07);
    background: rgba(255, 255, 255, 0.5);
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    animation: mymove 1s ease-in-out  alternate;
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
    width: 300px;
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