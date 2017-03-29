var webpack = require('webpack');
var path=require('path');
var htmlWebpackPlugin=require('html-webpack-plugin');//�Զ�����js���
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
              include:path.join(__dirname,'./src'),//ת���﷨�ķ�Χ��./src
              exclude:path.join(__dirname,'./node_modules'),//����node_modules�е��ļ�ת���﷨
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
            filename:'index.html',//���ɵ�html�ļ���
            template:'index.html',
            inject:'body'//�������ɵ�js��body�л�����head��

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