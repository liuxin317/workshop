import { message } from 'antd'

//免错误通知code
const no_message_code: number[] = [
    10,                 //绑定谷歌 
    1001,               //开启谷歌code输入框 
];
//退出
const logout_code: number[] = [401, 402];

// 成功
const success_code: number[] = [0, 200];

//错误信息提示队列
const message_error_que: any = [];

declare type Method = 'get' | 'post';

const baseURL = '/api/';
let controller:any = new AbortController();
const connectTime:number = 1200000;

export class XhrFetch {
    constructor() {

    }
    get(url: string, body?: any) {
        return this.send(url, 'get', body);
    }
    post(url: string, body?: any) {
        return this.send(url, 'post', body,);
    }
    async send(url: string, method: Method, body?: any,): Promise<any> {

        let currentResponse: Response;

        const requestHeaders = new Headers({
            'Content-Type': 'application/json;charset=UTF-8',
            'Authorization': localStorage.getItem('token') || '',
        });
        const isFormdata: boolean = body instanceof FormData;
        if (isFormdata) {
            requestHeaders.delete('Content-Type');
        };

        return new Promise((resolve, reject) => {
            this._fetch(
                window.fetch(
                    `${baseURL}${url}`,
                    {
                        method,
                        headers: requestHeaders,
                        body: isFormdata ? body : JSON.stringify(body),
                        signal: controller.signal,
                    }
                )
                .then(response => {
                    currentResponse = response;
                    /**ƒ
                     * ok
                     */
                    if (response.ok) {
                        const contentType: string = (response.headers as any).get('content-type').toLocaleLowerCase();

                        //stream
                        if (['stream', 'excel', 'download', 'blob'].some(it => contentType.includes(it))) {
                            return response.blob()
                        }

                        return response.json();
                    }
                    else {
                        throw new Error(response.statusText);
                    }

                })
                .then(data => {
                    /**
                     * is stream type
                     */
                    if (data instanceof Blob) {
                        return resolve({
                            code: 0,
                            headers: currentResponse.headers,
                            data,
                        });
                    }

                    const {
                        code,
                        msg,
                    } = data;

                    //API约定成功
                    if (success_code.includes(code)) return resolve(data);
                    message.error(msg);

                    //强制退出code
                    if (logout_code.includes(code)) {
                        
                    }

                    //需要提示错误信息code
                    if (!no_message_code.includes(code)) {

                        if (!message_error_que.length) {
                            const i = message.error(msg, 3, () => {
                                message_error_que.pop();
                            });
                            message_error_que.push(i);
                        }
                    }
                    reject(data);
                })
                //网络错误
                .catch(error => {
                    message.error(error.message || 'Network response was not ok.');
                    reject(error);
                })
            ,
            connectTime
            )
        })
    }

    /**
     * fetch设置超时时间
     * @param {*} fetch_promise
     * @param {*} timeout
     */
     _fetch(fetch_promise, timeout) {
        var abort_fn = null;

        //这是一个可以被reject的promise
        var abort_promise = new Promise(function(resolve, reject) {
            abort_fn = function() {
                reject('abort promise');
            };
        });

        //这里使用Promise.race，以最快 resolve 或 reject 的结果来传入后续绑定的回调
        var abortable_promise = Promise.race([fetch_promise, abort_promise]);

        setTimeout(function() {
            abort_fn();
        }, timeout);

        return abortable_promise;
    }

    // 终止请求
    stopRequest() {
        controller.abort();
    }
}
export default new XhrFetch();