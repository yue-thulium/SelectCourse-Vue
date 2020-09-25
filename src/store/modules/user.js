import {postRequest,getRequest} from "@/utils/axiousApi";
import {getToken,setToken,removeToken} from "@/utils/auth";
import router,{reserRouter} from "@/router";
import ro from "element-ui/src/locale/lang/ro";
import da from "element-ui/src/locale/lang/da";
import {resetRouter} from "../../router";

const state = {
    token: getToken(),
    name: '',
    gender: '',
    roles: []
}

const mutations = {
    SET_TOKEN: (state, token) => {
        state.token = token
    },
    SET_NAME: (state, name) => {
        state.name = name
    },
    SET_GENDER: (state, gender) => {
        state.gender = gender
    },
    SET_ROLES: (state, role) => {
        state.roles = role
    }
}

const actions = {
    // user login
    login({ commit }, userInfo) {
        const { username, password } = userInfo;
        return new Promise((resolve, reject) => {
            postRequest('/login', {
                'method': 'login',
                'username': username.trim(),
                'password': password
            }).then(resp=> {
                var data= resp.data;
                commit('SET_TOKEN', data.message);
                setToken(data.message);
                resolve();
            }).catch(error => {
                reject(error);
            });
        })
    },

    // get user info
    getInfo({ commit}) {
        return new Promise((resolve, reject) => {
            postRequest('/login',{
                'method': 'getInf'
            }).then(response => {
                var data = response.data

                if (!data) {
                    reject('Verification failed, please Login again.')
                }

                var role = data.role
                var username = data.username

                var list = [role,'normal']

                commit('SET_ROLES', list);
                commit('SET_NAME', username);
                resolve(data)
            }).catch(error => {
               this.$message.error('网络异常')
            })
        })
    },

    // user logout
    logout({ commit, state, dispatch }) {
        return new Promise((resolve, reject) => {
                commit('SET_TOKEN', '')
                commit('SET_ROLES', [])
                removeToken()
                resetRouter()

                // reset visited views and cached views
                // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
                //dispatch('tagsView/delAllViews', null, { root: true })

                resolve()
            }).catch(error => {
                reject(error)
            })
    },

    // remove token
    resetToken({ commit }) {
        return new Promise(resolve => {
            commit('SET_TOKEN', '')
            commit('SET_ROLES', [])
            removeToken()
            resolve()
        })
    },

    // dynamically modify permissions
    changeRoles({ commit, dispatch }, role) {
        return new Promise(async resolve => {
            const token = role + '-token'

            commit('SET_TOKEN', token)
            setToken(token)

            const { roles } = await dispatch('getInfo')

            resetRouter()

            // generate accessible routes map based on roles
            const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })

            // dynamically add accessible routes
            router.addRoutes(accessRoutes)

            // reset visited views and cached views
            //dispatch('tagsView/delAllViews', null, { root: true })

            resolve()
        })
    },

    /**
     * 注册
     * @param commit
     * @param userInfo
     * @returns {Promise<unknown>}
     */
    register({ commit }, userInfo) {
        const { username, password, email, role } = userInfo;
        return new Promise((resolve, reject) => {
            postRequest('/register', {
                username: username.trim(),
                password: password,
                email: email,
                role: role
            }).then(resp=> {
                resolve(resp.data);
            }).catch(error => {
                reject(error);
            });
        })
    },

    changeName({ commit }, newName) {
        return new Promise(resolve => {
            commit('SET_NAME', newName)
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
