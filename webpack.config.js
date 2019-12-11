const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
module.exports = {
    entry:'./src/app.jsx',
    output:{
        path:path.resolve(__dirname,'dist'),
        publicPath:'/dist/',
        filename:'js/app.js'
    },
    resolve:{
      alias:{
        page:path.resolve(__dirname,'src/page'),
        component:path.resolve(__dirname,'src/component')
      }
    },
    module: {
        rules: [
          // react语法的处理
          {
            test: /\.m?jsx$/,
            exclude: /(node_modules)/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['env','react']
              }
            }
          },
          // css文件的处理
          {
            test:/\.css$/,
            use: ExtractTextPlugin.extract({
              fallback: "style-loader",
              use: "css-loader"
            })
          },
          // sass文件的处理
          {
            test:/\.scss$/,
            use: ExtractTextPlugin.extract({
              fallback: "style-loader",
              use: ["css-loader","sass-loader"]
            })
          },
          // 图片的配置
          {
            test:/\.(png|jpg|gif)$/,
            use:[
              {
                loader:'url-loader',
                options:{
                  limit:8192,
                  name:'resource/[name].[ext]'
                }
              }
            ]
          },
          // 字体文件处理
          {
            test:/\.(eot|svg|ttf|woff|woff2)$/,
            use:[
              {
                loader:'url-loader',
                options:{
                  limit:8192,
                  name:'resource/[name].[ext]'
                }
              }
            ]
          }
        ]
      },
    plugins:[
      // 处理html文件
        new HtmlWebpackPlugin({
            template:"./src/index.html",
            favicon:"./favicon.ico"
        }),
        // 独立css文件
        new ExtractTextPlugin("css/[name].css"),
        // 提出公共模块(webpack自带的插件)
        new webpack.optimize.CommonsChunkPlugin({
          name:'common',
          filename:'base.js'
        })
    ],
    devServer:{
      port:3000,
      historyApiFallback: {  // 访问一个路径的时候如果是404 会返回到指定的页面
        index: '/dist/index.html' //访问根目录的时候访问指定的页面
    },
    }
}