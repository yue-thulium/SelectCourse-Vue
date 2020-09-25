
const studentRouter = {
    path: '/',
    component: () => import(/* webpackChunkName: "home" */ '../../components/common/Home.vue'),
    meta: { title: '自述文件' },
    children: [
        {
            path: '/showMyCourse',
            component: () => import(/* webpackChunkName: "dashboard" */ '../../components/student/ShowMyCourse'),
            meta: { title: '选课页面' },
            roles: [0,'normal']
        },
        {
            path: '/getAllCourse',
            component: () => import(/* webpackChunkName: "dashboard" */ '../../components/student/GetAllCourse'),
            meta: { title: '全部课程' },
            roles: [0,'normal']
        },
        {
            path: '/selectCourse',
            component: () => import(/* webpackChunkName: "dashboard" */ '../../components/student/SelectCourse'),
            meta: { title: '选课查询' },
            roles: [0,'normal']
        },
        {
            path: '/dropCourse',
            component: () => import(/* webpackChunkName: "dashboard" */ '../../components/student/DropCourse'),
            meta: { title: '退课选择' },
            roles: [0,'normal']
        },
        {
            path: '/changeInfo',
            component: () => import(/* webpackChunkName: "dashboard" */ '../../components/student/ChangeInfo'),
            meta: { title: '信息修改' },
            roles: [0,'normal']
        }
    ]
};

export default studentRouter;