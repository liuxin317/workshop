
const child_process = require('child_process');
const spawn = child_process.spawnSync;

function run() {
    // const status = spawn('git', ['status']);
    // const out = Buffer.from(status.stdout).toString();
    // console.log(status)
    // console.log(out)
    // return ;


    /**
     * git upload current
     */
    const add = spawn('git', ['add', '-A']);
    
    spawn('git', ['commit', '-m', 'h5 code -']);
    spawn('git', ['pull']);
    spawn('git', ['push']);

    console.log('git successed')
}

run();