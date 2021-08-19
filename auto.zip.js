const fs = require('fs');
const child_process = require('child_process');
const os = require('os');
const path = require('path');
const moment = require('moment');
const homedir = os.homedir();
const time = moment().format('YYYYMMDDHHmm');
const filename = `dist${time}.zip`;
const zipfile = path.join(`${homedir}/Desktop/${filename}`);
const spawn = child_process.spawnSync;

const startZip = async () => {
    // await autoReload.run();

    if (fs.existsSync(zipfile)) {
        fs.unlinkSync(zipfile);
    }

    spawn('zip', ['-r', zipfile, `./build/.`], {
        cwd: './'
    });
}




startZip();