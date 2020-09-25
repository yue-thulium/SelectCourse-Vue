import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store'
import ElementUI from 'element-ui';
import VueI18n from 'vue-i18n';
import { messages } from './components/common/i18n';
import 'element-ui/lib/theme-chalk/index.css'; // 默认主题
// import './assets/css/theme-green/index.css'; // 浅绿色主题
import './assets/css/icon.css';
import './components/common/directives';
import 'babel-polyfill';
import {getRequest} from './utils/axiousApi'
import {postRequest} from './utils/axiousApi'
import {uploadFileRequest} from './utils/axiousApi'
import {getToken} from "@/utils/auth";
import whiteList from './router/modules/whiteList'
import md5 from 'js-md5';
import SlideVerify from 'vue-monoplasty-slide-verify';
import ro from 'element-ui/src/locale/lang/ro';

Vue.config.productionTip = false;
Vue.use(VueI18n);
Vue.use(SlideVerify);
Vue.use(ElementUI, {
    size: 'small'
});
const i18n = new VueI18n({
    locale: 'zh',
    messages
});
Vue.prototype.getRequest = getRequest;
Vue.prototype.postRequest = postRequest;
Vue.prototype.uploadFileRequest = uploadFileRequest;
Vue.prototype.$md5 = md5;

// //使用钩子函数对路由进行权限跳转
router.beforeEach(async(to, from, next) => {
    const hasToken = getToken();
    if(to.meta) {
        document.title = to.meta.title||to.params.text;
    }
    if (hasToken) {
        if (to.path === '/login') {
            next({path : '/dashboard'})
        } else {
            const hasRoles = store.getters.roles && store.getters.roles.length > 0;
            if (hasRoles) {
                next()
            } else {
                try {
                    // get user info
                    // note: roles must be a object array! such as: ['admin'] or ,['developer','editor']
                    const { role } = await store.dispatch('user/getInfo');
                    // generate accessible routes map based on roles
                    const accessRoutes = await store.dispatch('permission/generateRoutes', store.getters.roles);
                    // dynamically add accessible routes
                    router.addRoutes(accessRoutes);

                    // hack method to ensure that addRoutes is complete
                    // set the replace: true, so the navigation will not leave a history record
                    next({ ...to, replace: true })
                } catch (error) {
                    await store.dispatch('user/resetToken');
                    messages.error(error || 'Has Error');
                    next('/login')
                }
            }
        }
    } else {
        /* has no token*/

        if (whiteList.indexOf(to.path) !== -1) {
            // in the free login whitelist, go directly
            next()
        } else {
            // other pages that do not have permission to access are redirected to the login page.
            next('/login')
        }
    }
});

new Vue({
    router,
    i18n,
    store,
    render: h => h(App)
}).$mount('#app');
