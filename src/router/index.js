import Vue from 'vue';
import Router from 'vue-router';
import VueRouter from 'vue-router'
import commonRouter from "@/router/modules/common";
import studentRouter from '@/router/modules/student';
import teacherRouter from '@/router/modules/teacher';

Vue.use(Router);
/**
 *
 * hidden: true                   动态加载菜单栏，不用理会
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           重定向
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    权限控制（示例 ：roles ：['user', 'normal']）
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */



//所有权限通用路由表
//如首页和登录页和一些不用权限的公用页面
//游客界面
export const constantRouterMap = [
    {
        path: '/',
        redirect: '/dashboard'
    },
    {
        path: '/login',
        component: () => import(/* webpackChunkName: "login" */ '../components/common/loginPage.vue'),
        meta: { title: '选课系统' }
    },
    {
        path: '/register',
        component: () => import(/* webpackChunkName: "login" */ '../components/common/registerPage.vue'),
        meta: { title: '用户注册' }
    },
    {
        path: '/test',
        component: () => import(/* webpackChunkName: "login" */ '../components/common/text.vue'),
        meta: { title: '测试' }
    },
    {
        path: '*',
        redirect: '/404'
    },
    commonRouter,
];

//异步挂载的路由
//动态需要根据权限加载的路由表
//登录后访问的
export const asyncRouterMap = [
    //避免过长而不易维护

    /**
     * 公共路由（测试使用）
     */
    studentRouter,
    teacherRouter,


    // 404 page must be placed at the end !!!
    { path: '*', redirect: '/404', hidden: true }
];

export function resetRouter() {
    const newRouter = createRouter();
    router.matcher = newRouter.matcher // reset router
}

//实例化vue的时候只挂载constantRouter
const createRouter = () => new VueRouter({
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRouterMap,
    //history会去掉url的#，但是需要全路径访问，并且刷新会访问后端，所以默认的是hash模式
    //mode: 'history'
});

const router = createRouter();

export default router
