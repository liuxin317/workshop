const Client = require('./ssh');
const path = require('path');
const fs = require('fs');
const sftp = new Client();

/**
 * 远程目前配置
 */
const remoteDirectory = 'wwwroot';
const remoteRoot = `/h5-trial-admin/${remoteDirectory}`;
const remoteIndex = `${remoteRoot}/index.html`;
const remoteStatic = `${remoteRoot}/static`;

/**
 * 本地目录配置
 */
const loading = path.join(__dirname, 'update', 'index.html');
const build = path.join(__dirname, 'build');
const index = path.join(build, 'index.html');
const static = path.join(build, 'static');

async function run() {

    let localBuildFiles = fs.readdirSync(build, {
        encoding: 'utf8',
        withFileTypes: true
    });
    localBuildFiles = localBuildFiles.filter(e => e.name !== 'index.html' && !e.isDirectory())
    // return;

    try {
        console.log('-------')
        console.log('ssh连接中...')
        await sftp.connect({
            host: '61.14.252.11',
            port: '20007',
            username: 'ftp808140',
            password: 'rkq7Jx-cuS1K+0',
        });
        console.log('ssh连接成功!')
        console.log('-------')

        console.log('Loading 更新加载中...')
        await sftp.put(loading, remoteIndex);
        console.log('Loading update: 加载完成')

        let list = await sftp.list(remoteRoot);
        list = list.filter(it => it.type !== 'd' && it.name !== 'index.html');
        for await (item of list) {
            const file = `${remoteRoot}/${item.name}`;
            await sftp.delete(file);
            console.log('Deleted file:', file);
        }

        try {
            console.log('正在删除远端目录:', remoteStatic);
            await sftp.rmdir(remoteStatic, true);
            console.log('删除完成!')
            console.log('-------')
        } catch (err) { }
        try {
            console.log('创建目录:', remoteStatic);
            await sftp.mkdir(remoteStatic, true);
            console.log('创建完成');
            console.log('-------')
        } catch (err) {
        }
        console.log('开始上传...');

        for await (item of localBuildFiles) {
            const local = path.join(build, item.name);
            await sftp.put(local, `${remoteRoot}/${item.name}`);
            console.log(`Listener: Uploaded ${local}`);
        }
        sftp.on('upload', info => {
            console.log(`Listener: Uploaded ${info.source}`);
        });
        await sftp.uploadDir(static, remoteStatic);
        await sftp.put(index, remoteIndex);
    } finally {
        sftp.end();
    }
};

run().then(() => {
    console.log('Upload End: h5-try-play 测试服更新完成!');
}).catch(err => {
    console.log(`main error: ${err.message}`)
});