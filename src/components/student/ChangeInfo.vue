<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-settings"></i> 信息修改
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="form-box">
                <el-form ref="form" :model="form" label-width="80px">
                    <el-form-item label="姓名">
                        <el-input v-model="form.s_name"></el-input>
                    </el-form-item>
                    <el-form-item label="性别">
                        <el-radio-group v-model="form.s_gender">
                            <el-radio label="男"></el-radio>
                            <el-radio label="女"></el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="年龄">
                        <el-input v-model="form.s_age"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit" :loading="loading">确认修改</el-button>
                        <el-button>取消</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
import { getRequest, postRequest } from '@/utils/axiousApi';
import store from '@/store';

export default {
    name: 'baseform',
    data() {
        return {
            form: {},
            loading: false
        };
    },
    methods: {
        onSubmit() {
            var str = JSON.stringify(this.form);
            console.log(str)
            this.loading = true;
            postRequest('/student',{
                'method':'updateStuInfo',
                'student': str
            }).then(resp => {
                var data = resp.data;
                if (data.code == 200) {
                    this.$message.success('修改成功')
                    this.loading = false;
                } else {
                    this.$message.error('未知错误')
                    this.loading = false;
                }
            });
        }
    },
    created() {
        getRequest(`/student?method=getStudentInfo`).then(resp => {
            var data = resp.data;
            if (data.code == 200) {
                console.log(data.message)
                this.form = data.message;
            } else {
                this.$message.error('未知错误')
            }
        });
    }
};
</script>