<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-search"></i> 选课查询
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <el-table
                :data="tableData"
                border
                stripe
                class="table"
                ref="multipleTable"
            >
                <el-table-column prop="c_name" label="课程名" align="center"></el-table-column>
                <el-table-column prop="c_info" label="课程介绍" align="center">
                </el-table-column>
                <el-table-column prop="t_name" label="授课教师" align="center"></el-table-column>
                <el-table-column prop="c_room" label="授课教室" align="center">
                </el-table-column>

                <el-table-column label="班级容量" align="center">
                    <template slot-scope="scope">{{scope.row.c_num}} / 20</template>
                </el-table-column>
                <el-table-column label="操作" width="120" align="center">
                    <template slot-scope="scope">
                        <el-button
                            type="text"
                            icon="el-icon-edit"
                            :disabled="scope.row.maxFlag"
                            @click="handleEdit(scope.$index, scope.row)"
                        >选课</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination
                    background
                    layout="total, prev, pager, next"
                    :current-page="query.pageIndex"
                    :page-size="query.pageSize"
                    :total="pageTotal"
                    @current-change="handlePageChange"
                ></el-pagination>
            </div>
        </div>

        <!-- 编辑弹出框 -->
        <el-dialog title="确认选课？" :visible.sync="editVisible" width="30%" center>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit" :loading="loading">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { fetchData } from '../../api/index';
import { postRequest } from '@/utils/axiousApi';
export default {
    name: 'basetable',
    data() {
        return {
            query: {
                address: '',
                name: '',
                pageIndex: 1,
                pageSize: 10
            },
            tableData: [],
            multipleSelection: [],
            delList: [],
            editVisible: false,
            pageTotal: 0,
            form: {},
            idx: -1,
            id: -1,
            loading: false
        };
    },
    created() {
        this.getData();
    },
    methods: {
        // 获取 easy-mock 的模拟数据
        getData() {
            postRequest('/stuCourseSelect', {
                'method': 'getCanSelectCourse'
            }).then(resp => {
                var date = resp.data;
                if (date.code === 200) {
                    this.tableData = date.message;
                } else {
                    this.$message.error(date.message);
                }
            })
        },
        // 编辑操作
        handleEdit(index, row) {
            this.idx = index;
            this.form = row;
            this.editVisible = true;
            console.log(this.tableData[this.idx].c_id)
        },
        // 保存编辑
        saveEdit() {
            this.loading = true;
            postRequest('/stuCourseSelect',{
                'method':'setCourse',
                'cla_id': this.tableData[this.idx].c_id
            }).then(resp => {
                console.log(resp)
                var data = resp.data
                if (data.code == 200) {
                    this.$message.success(data.message)
                    this.getData()
                } else {
                    this.$message.error(data.message)
                    this.getData()
                }
                this.editVisible = false;
                this.loading = false;
            })
        },
        // 分页导航
        handlePageChange(val) {
            this.$set(this.query, 'pageIndex', val);
            this.getData();
        }
    }
};
</script>

<style scoped>
.handle-box {
    margin-bottom: 20px;
}

.handle-select {
    width: 120px;
}

.handle-input {
    width: 300px;
    display: inline-block;
}
.table {
    width: 100%;
    font-size: 14px;
}
.red {
    color: #ff0000;
}
.mr10 {
    margin-right: 10px;
}
.table-td-thumb {
    display: block;
    margin: auto;
    width: 40px;
    height: 40px;
}
</style>
