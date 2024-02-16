var HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = (env) => {
    return {
        mode: 'development',
        module: {
            rules: [
                {
                    test: /\.jsx?$/,
                    use: [
                        {
                            loader: 'babel-loader'
                        }
                    ]
                },
                {
                    test: /\.less$/,
                    use: [
                        { loader: 'style-loader' },
                        { loader: 'css-loader' },
                        { loader: 'less-loader' }
                    ]
                },
                {
                  test: /\.css$/,
                  use: ["style-loader", "css-loader"],
                },
                {
                  test: /\.(eot|svg|ttf|woff|woff2)(\??\#?v=[.0-9]+)?$/,
                  use: [
                    {
                        loader: 'file-loader',
                        options: {
                            limit: 1000,
                            name : '/fonts/[name].[ext]'
                        }
                    }
                ]
                  //loader: "file-loader?name=/fonts/[name].[ext]",
                },
            ]
        },
        resolve: {
            mainFiles: ['index', 'Index'],
            extensions: ['.js', '.jsx'],
            alias: {
                '@': path.resolve(__dirname, 'src/'),
            },
            fallback: { 
                "crypto": false, //require.resolve("crypto-browserify"),
                "stream": false//require.resolve("stream-browserify")  
            }
        },
        plugins: [new HtmlWebpackPlugin({
            template: './src/index.html'
        })],
        devServer: {
            historyApiFallback: true
        },
        externals: {
            // global app config object
            config: JSON.stringify({
                //version: 46,
                version: process.env.REACT_APP_VERSION,
                apiUrl: process.env.REACT_APP_API_URL
                //apiUrl: 'https://api.pielgrzymappka.pl'
                //apiUrl: 'https://apidev.pielgrzymappka.pl'
                //apiUrl: 'http://localhost:52171'
            })
        }
    }
}