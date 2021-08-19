class Methods {
    // 为不具备Iterator接口的对象提供遍历方法
    static * objectEntries(obj) {
        const propKeys = Reflect.ownKeys(obj);
        for (const propKey of propKeys) {
            yield [propKey, obj[propKey]];
        }
    }

    // 获取Cookie
    static getCookie(name) {
        var arr = document.cookie.split('; ');
        var i = 0;
        for (i = 0; i < arr.length; i++) {
            var arr2 = arr[i].split('=');

            if (String(arr2[0]) === String(name)) {
                var getC = decodeURIComponent(arr2[1]);
                return getC;
            }
        }

        return '';
    }

    // 设置cookie;
    static setCookie(name, value, iDay) {
        var oDate = new Date();

        oDate.setDate(oDate.getDate() + iDay);

        document.cookie = name + '=' + encodeURIComponent(value) + ';expires=' + oDate + "; path=/";
    }

    // 删除cookie;
    static removeCookie(name) {
        this.setCookie(name, '1', -1);
    }

    static digitUppercase(n) {
        var fraction = ['角', '分'];
        var digit = [
            '零', '壹', '贰', '叁', '肆',
            '伍', '陆', '柒', '捌', '玖'
        ];
        var unit = [
            ['元', '万', '亿'],
            ['', '拾', '佰', '仟']
        ];
        var head = n < 0 ? '欠' : '';
        n = Math.abs(n);
        var s = '';
        for (var i = 0; i < fraction.length; i++) {
            s += (digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '');
        }
        s = s || '整';
        n = Math.floor(n);
        for (let i = 0; i < unit[0].length && n > 0; i++) {
            var p = '';
            for (var j = 0; j < unit[1].length && n > 0; j++) {
                p = digit[n % 10] + unit[1][j] + p;
                n = Math.floor(n / 10);
            }
            s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s;
        }
        return head + s.replace(/(零.)*零元/, '元')
            .replace(/(零.)+/g, '零')
            .replace(/^整$/, '零元整');
    }

    /*
    * 参数说明：
    * number：要格式化的数字
    * decimals：保留几位小数
    * dec_point：小数点符号
    * thousands_sep：千分位符号
    * */
    static number_format(number, decimals, dec_point, thousands_sep) {
        number = (number + '').replace(/[^0-9+-Ee.]/g, '');
        var n = !isFinite(+number) ? 0 : +number,
            prec = !isFinite(+decimals) ? 2 : Math.abs(decimals),
            sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
            dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
            s = '',
            toFixedFix = function (n, prec) {
                var k = Math.pow(10, prec);
                return '' + Math.ceil(n * k) / k;
            };

        s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
        var re = /(-?\d+)(\d{3})/;
        while (re.test(s[0])) {
            s[0] = s[0].replace(re, "$1" + sep + "$2");
        }

        if ((s[1] || '').length < prec) {
            s[1] = s[1] || '';
            s[1] += new Array(prec - s[1].length + 1).join('0');
        }
        return s.join(dec);
    }
};

export default Methods;