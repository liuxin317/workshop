const { whenProd, } = require("@craco/craco");
const TerserPlugin = require('terser-webpack-plugin');
const AutoZip = require("./auto.zip");
const CracoAntDesignPlugin = require('craco-antd');
const webpack = require("webpack");
const CracoAlias = require('craco-alias');

module.exports = {
    eslint: {
        enable: false,
    },
    typescript: false,
    webpack: {
        plugins: [
            ...whenProd(() => [
                new TerserPlugin({
                    terserOptions: {
                        compress: {
                            ecma: 5,
                            warnings: false,
                            comparisons: false,
                            inline: 2,
                            drop_debugger: true,
                            drop_console: true
                        }
                    }
                }),
            ], []),
            new webpack.ProvidePlugin({
                React: 'react',
                ReactDOM: 'react-dom',
                fetch: ['@fetch', 'default'],
                moment: 'moment',
                util: ['@util', 'default'],
                md5: ['@util/md5.js', 'default'],
            })
        ],
    },
    plugins: [
        {
            plugin: CracoAlias,
            options: {
                source: "tsconfig",
                baseUrl: './src',
                tsConfigPath: "./tsconfig.extend.json",
                aliases: {
                    "@com": './src/components/',
                    "@store": './src/store/',
                    "@action": './src/store/action/',
                    "@style": './src/style/',
                    "@img": './src/img/',
                    "@audio": './src/audio/',
                    "@view": './src/view/',
                    "@util": './src/util/',
                    "@fetch": './src/util/fetch.ts',
                    "@config": './src/config/',
                }
            }
        },
        {
            plugin: CracoAntDesignPlugin,
            /**
             * 定义antd主题色
             */
            // options: {
            //     customizeTheme: {
            //         "@primary-color": "#000",
            //         "@link-color": "#fff"
            //     }
            // }
        },
        ...whenProd(() => [
            {
                plugin: AutoZip,
            }
        ], []),
    ],
    devServer: (devServerConfig, { env, paths, proxy, allowedHost }) => {
        return {
            ...devServerConfig,
            proxy: {
                '/api/': {
                    target: 'https://www.qxe68.com:7035',
                    secure: false,
                },
            }
        };
    },
}

