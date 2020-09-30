module.exports={
    //部署路径与测试路径不同“/”和“./”的区别

    publicPath:'./',
    assetsDir:'static',
    outputDir:'dist',
    productionSourceMap: false,

    devServer: {
        open: process.platform === 'darwin',
        host:'0.0.0.0',
        port:'9100',
        https: false,
        hotOnle: false,
        proxy:null,
        before:app=>{}
    }
};