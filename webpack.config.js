var webpack = require('webpack');
var path=require('path');
var htmlWebpackPlugin=require('html-webpack-plugin');//自动载入js插件
module.exports={
    context:__dirname,
    entry:'./src/app.js',
    output:{
        path:path.join(__dirname, './dist'),
        filename:'js/[name].bundle.js'
    },
    module:{
      loaders:[
          {
              test:/\.js$/,
              loader:'babel-loader',
              include:path.join(__dirname,'./src'),//转换语法的范围是./src
              exclude:path.join(__dirname,'./node_modules'),//不让node_modules中的文件转换语法
              query:{
                  presets:['latest']
              }
          },
          {
              test:/\.css$/,
              loader:'style-loader!css-loader?importLoaders=1!postcss-loader'
              //loader:'style-loader!css-loader?importLoaders=1!postcss-loader'
              //loaders:['style-loader,css-loader,postcss-loader']
          },
          {
              test:/\.less$/,
              loader:'style-loader!css-loader!postcss-loader!less-loader'
          }
      ]
    },
    plugins:[
        new htmlWebpackPlugin({
            filename:'index.html',//生成的html文件名
            template:'index.html',
            inject:'body'//设置生成的js在body中还是在head中

        }),
        new webpack.LoaderOptionsPlugin({
            options: {
                postcss:[
                    require('autoprefixer')({
                        broswers:['last 5 versions']
                    })
                ]
            }
        })
    ]
}