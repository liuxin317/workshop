
import menu from '@config/menu';

export class Util {
    reg = {
        int: /^\d+$/,                                           //整数
        phone: /^1[3-9]\d{9}$/,
        username: /^[a-zA-Z0-9]{6,20}$/,
        password: /^[a-zA-Z0-9~!@#$%^&*()_\-,/.]{6,20}$/,       //密码
        money: /^(([1-9][0-9]*)|(0)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/,
    }

    formatMoney = (money: number, isFen = false, maximumFractionDigits = 2, hasYuan = true) => {
        if (isFen) money = money / 100;
        const fallbackNumber = Number.isNaN(+money) ? 0 : +money;
        const val = new Intl.NumberFormat('zh-CN', {
            style: 'decimal',
            maximumFractionDigits,
            minimumFractionDigits: maximumFractionDigits
        }).format(fallbackNumber);
        if (hasYuan) return `${val}元`; 
    }

    formatNumber = (n: number | string, maximumFractionDigits = 0) => {
        const fallbackNumber = Number.isNaN(+n) ? 0 : +n;
        return new Intl.NumberFormat('zh-CN', {
            style: 'decimal',
            maximumFractionDigits
        }).format(fallbackNumber);
    }
    /**
     * 调用  util.number(11111)             格式化数字
     * 调用  util.number(11111,true)        格式化数字 分 转换成元
     * 调用  util.number(11111,'currency')  格式化数字为金额 符号前缀
     * 调用  util.number(11111, 2)          格式化数字为,最少两位小数
     * @param {*} value 
     * @param  {...any} args 
     */
    number = (value: number, ...args: any[]) => {
        let min = 0, max = 2, style = 'decimal', isCent = false;
        const styles = ['decimal', 'currency', 'percent'];
        if (args.length <= 1) {
            let v = args[0];
            if (styles?.includes(v)) { style = v; }
            else if (Number.isInteger(v)) { min = v; }
            else if (typeof v === 'boolean') { isCent = true; min = 2; } //为分的时候，默认启用两位小数
        } else {
            const [a, b, c, d] = args;
            style = a || style;
            min = b || min;
            isCent = c || isCent;
            max = d || max;
        }
        let number = Number.isNaN(+value) ? 0 : +value;
        if (isCent) {
            number = number / 100;
        }
        const val = new Intl.NumberFormat('zh-CN', {
            style,
            minimumFractionDigits: min,
            maximumFractionDigits: max,
        }).format(number);
        return val;
    }

    getRole = () => {
        return localStorage.getItem('role');
    }

    role = () => {
        const role = this.getRole();
        return {
            isAdmin: role === 'ADMIN',                // 管理员
            isFirstAgent: role === 'AGLV1',           // 一级代理
            isSecondAgent: role === 'AGLV2',          // 二级代理
            isThirdAgent: role === 'AGLV3',           // 三级代理
        }
    }
    //用户菜单
    get menu() {
        return menu?.filter(item => {
            return item.role?.includes('all')
        });
    }

    isHeaders = (value: any) => {
        if (typeof Headers === 'undefined') {
            return false;
        }
        return value instanceof Headers;
    }

    downloadBlobFile = (response: any) => {
        let filename;
        if (this.isHeaders(response.headers)) {
            filename = response.headers.get('content-disposition').split('fileName=')[1];
        }
        filename = decodeURIComponent(filename);
        const url = window.URL.createObjectURL(response.data);
        const a = document.createElement('a');
        document.body.appendChild(a);
        a.href = url;
        a.download = filename;
        a.click();
        window.URL.revokeObjectURL(url);
    }


}

export default new Util();
