"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.XhrFetch = void 0;
var _store_1 = require("@store");
var antd_1 = require("antd");
//免错误通知code
var no_message_code = [
    10,
    1001,
];
//退出
var logout_code = [401, 402];
//错误信息提示队列
var message_error_que = [];
var baseURL = '/api/';
var XhrFetch = /** @class */ (function () {
    function XhrFetch() {
    }
    XhrFetch.prototype.get = function (url, body) {
        return this.send(url, 'get', body);
    };
    XhrFetch.prototype.post = function (url, body) {
        return this.send(url, 'post', body);
    };
    XhrFetch.prototype.send = function (url, method, body) {
        return __awaiter(this, void 0, Promise, function () {
            var currentResponse, requestHeaders, isFormdata;
            return __generator(this, function (_a) {
                requestHeaders = new Headers({
                    'Content-Type': 'application/json;charset=UTF-8',
                    'Authorization': localStorage.getItem('token') || ''
                });
                isFormdata = body instanceof FormData;
                if (isFormdata) {
                    requestHeaders["delete"]('Content-Type');
                }
                ;
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        window
                            .fetch("" + baseURL + url, {
                            method: method,
                            headers: requestHeaders,
                            body: isFormdata ? body : JSON.stringify(body)
                        })
                            .then(function (response) {
                            currentResponse = response;
                            /**ƒ
                             * ok
                             */
                            if (response.ok) {
                                var contentType_1 = response.headers.get('content-type').toLocaleLowerCase();
                                //stream
                                if (['stream', 'excel', 'download', 'blob'].some(function (it) { return contentType_1.includes(it); })) {
                                    return response.blob();
                                }
                                return response.json();
                            }
                            else {
                                throw new Error(response.statusText);
                            }
                        })
                            .then(function (data) {
                            /**
                             * is stream type
                             */
                            if (data instanceof Blob) {
                                return resolve({
                                    code: 0,
                                    headers: currentResponse.headers,
                                    data: data
                                });
                            }
                            var code = data.code, msg = data.msg;
                            //API约定成功
                            if (code === 0)
                                return resolve(data);
                            //强制退出code
                            if (logout_code.includes(code)) {
                                _store_1["default"].dispatch({
                                    type: 'user/logout'
                                });
                            }
                            //需要提示错误信息code
                            if (!no_message_code.includes(code)) {
                                if (!message_error_que.length) {
                                    var i = antd_1.message.error(msg, 3, function () {
                                        message_error_que.pop();
                                    });
                                    message_error_que.push(i);
                                }
                            }
                            reject(data);
                        })["catch"](function (error) {
                            antd_1.message.error(error.message || 'Network response was not ok.');
                            reject(error);
                        });
                    })];
            });
        });
    };
    return XhrFetch;
}());
exports.XhrFetch = XhrFetch;
exports["default"] = new XhrFetch();
