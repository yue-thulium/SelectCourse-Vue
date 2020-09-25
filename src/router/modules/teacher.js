
const teacherRouter = {
    path: '/',
    component: () => import(/* webpackChunkName: "home" */ '../../components/common/Home.vue'),
    meta: { title: '自述文件' },
    children: [
        {
            path: '/myTeachCourse',
            component: () => import(/* webpackChunkName: "dashboard" */ '../../components/teacher/ShowMyCourse'),
            meta: { title: '授课页面' },
            roles: [1,'normal']
        },
        {
            path: '/getAllTeacherCourse',
            component: () => import(/* webpackChunkName: "dashboard" */ '../../components/teacher/GetAllCourse'),
            meta: { title: '全部课程' },
            roles: [1,'normal']
        },
        {
            path: '/teachCourse',
            component: () => import(/* webpackChunkName: "dashboard" */ '../../components/teacher/SelectCourse'),
            meta: { title: '授课绑定' },
            roles: [1,'normal']
        },
        {
            path: '/dropTeachCourse',
            component: () => import(/* webpackChunkName: "dashboard" */ '../../components/teacher/DropCourse'),
            meta: { title: '解除授课' },
            roles: [1,'normal']
        },
        {
            path: '/changeTeacherInfo',
            component: () => import(/* webpackChunkName: "dashboard" */ '../../components/teacher/ChangeInfo'),
            meta: { title: '信息修改' },
            roles: [1,'normal']
        }
    ]
};

export default teacherRouter;