module.exports = {
    devServer: {
        port: 8090,
        // proxy: {
        //     '/': {
        //         target: 'http://localhost:8080/CourseSelect_war/',
        //         changeOrigin: true,
        //         pathRewrite: {
        //             '^/': ''
        //         }
        //     }
        // }
    },
    configureWebpack: {
        resolve:{
            alias: {
                'assets': '@/assets',
                'common': '@/common',
                'components': '@/components',
                'views': '@/views',
                'network': '@/network',
                'utils' : '@/utils',
            }
        }
    }
}
