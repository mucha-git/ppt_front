var HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = (env) => {
    return {
        mode: 'development',
        module: {
            rules: [
                {
                    test: /\.jsx?$/,
                    loader: 'babel-loader'
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
                  loader: "file-loader?name=/fonts/[name].[ext]",
                },
            ]
        },
        resolve: {
            mainFiles: ['index', 'Index'],
            extensions: ['.js', '.jsx'],
            alias: {
                '@': path.resolve(__dirname, 'src/'),
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
                //apiUrl: process.env.REACT_APP_API_URL
                //apiUrl: 'http://localhost:7010'
                //apiUrl: 'http://dmkk.freeddns.org:7000'
                apiUrl: 'http://localhost:52171'
            })
        }
    }
}