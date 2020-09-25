const getters = {
    username: state => state.user.name,
    token: state => state.user.token,
    email: state => state.user.email,
    roles: state => state.user.roles,
    sex: state => state.user.sex,
    phone: state => state.user.phone,
    birthdata: state => state.user.birthdata,
    collapse: state =>state.controlSidebar.collapse,
    messageCount: state =>state.controlSidebar.messageCount,
}

export default getters
