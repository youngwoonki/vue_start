// import
const path = require('path')
const HtmlPlugin = require('html-webpack-plugin') // htmp플러그인 설치했으니 import해줘야함.
const CopyPlugin = require('copy-webpack-plugin') // copy플러그인 설치했으니 import해줘야함.
const { VueLoaderPlugin } = require('vue-loader')

// export
module.exports = {
  resolve:{
    extensions: ['.js','.vue'],
    // 경로 별칭
    alias:{
      '~':path.resolve(__dirname,'src'),
      'assets':path.resolve(__dirname,'src/assets')
    }
  },
  // 파일을 읽어들이기 시작하는 진입점 설정 (js)
  entry: './src/main.js',

  // 결과물(번들)을 반환하는 설정
  output: {
    // path : path.resolve(__dirname, 'dist'), // __dirname는 절대경로
    // filename: 'main.js'
    //path : path.resolve(__dirname, 'public'),
    // filename: 'app.js'
    //filename: 'main.js',
    clean : true // 겹치는 app.js는 지워줌.
    // 위에 처럼 다 주석처리해주고 다시 run하면 기본인 main.js가 dist에 생성됨.
  },

  module:{
    rules:[
      {
        test:/\.vue$/,
        use:'vue-loader'
      },
      {
        test:/\.s?css$/,
        use:[
          'vue-style-loader',
          'style-loader',
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      },
      {
        test:/\.js$/,
        use:[
          'babel-loader'
        ]
      },
      {
        test:/\.(png|jpe?g|gif|webp)$/,
        use:'file-loader'
      }
    ]
  },

  // 번들링 후 결과물의 처리 방식 등 다양한 플러그인들을 설정
  plugins:[
    new HtmlPlugin({
      template: './index.html' // html플러그인 설치해서 import했으니 export해서 index.html가져오기.
    }),
    new CopyPlugin({
      patterns:[
        { from: 'static'} // copy플러그인 설치해서 import했으니 export해서 static폴더로부터 안에꺼 가져오는거.
      ]
    }),
    new VueLoaderPlugin()
  ],

  devServer:{
    host: 'localhost' // 서버지정해주는거
  }
}