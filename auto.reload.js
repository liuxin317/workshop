const fs = require('fs');
const path = require('path');
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);
const indexHtml = resolveApp('build/index.html');
const configPackageJson = require('./package.json');

/**
 * 项目名称
 */
const projectName = configPackageJson.name;

const autoReload = {
    run() {
        return new Promise((resolve, reject) => {
            fs.readFile(indexHtml, 'utf-8', function (err, data) {
                if (err) {
                    console.error('读取文件出错');
                    throw err;
                }
                /**
                 * 找出load chunk error 位置代码
                 */
                const errorCode = data.match(/var\s.=new\sError/g);
                /**
                 * 找出chunk error 函数变量名
                 */
                let errorFunctionName = errorCode[0].split('=')[0];
                errorFunctionName = errorFunctionName.replace(/var|\s/g,'');
                errorFunctionName = `${errorFunctionName}.message`;

                /**
                 * 匹配出load error function 区块
                 */
                const errorPostion = data.match(new RegExp(errorFunctionName,'g'));
                const errorDesc = errorPostion[0];

                /**
                 * 加入错误标志,如果文件不存在，重新加载一次，
                 * 如果错误标志已存在，则跳过，防止无限循环
                 */
                const newErrorCode = `var chunkError = localStorage.getItem('chunkError');if(!chunkError){localStorage.setItem('chunkError','1');location.reload()};${errorDesc}`;
                
                /**
                 * 替换文件数据
                 */
                data = data.replace(errorDesc, newErrorCode);

                
                /**
                 * 匹配出webpack自动打包的项目名称代码
                 * /webpackJsonp${projectName}.*?;/g
                 */
                const projectNameCode = data.match(new RegExp(`webpackJsonp${projectName}.*?;`,'g'));
                const newProjectNameCode  = `${projectNameCode}localStorage.removeItem('chunkError');`;

                /**
                 * 替换文件数据
                 */
                data = data.replace(projectNameCode,newProjectNameCode);

                fs.writeFile(indexHtml, data, 'utf-8', function (errs) {
                    if (errs) {
                        console.error('修改文件出错');
                        throw errs;
                    }
                    console.info('chunkError reload success');
                    resolve();
                });
            });
        });
    }
}
module.exports = autoReload;