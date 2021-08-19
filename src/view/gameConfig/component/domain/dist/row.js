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
var react_1 = require("react");
var antd_1 = require("antd");
var _fetch_1 = require("@fetch");
var icons_1 = require("@ant-design/icons");
function Index(props) {
    var _this = this;
    var name = props.name, url = props.url, keyName = props.keyName, update = props.update;
    var _a = react_1.useState(false), edit = _a[0], setEdit = _a[1];
    var _b = react_1.useState(false), loading = _b[0], setLoading = _b[1];
    var _c = react_1.useState(''), val = _c[0], setVal = _c[1];
    react_1.useEffect(function () {
        if (url) {
            setVal(url);
        }
    }, [url]);
    var setDomain = react_1.useCallback(function () { return __awaiter(_this, void 0, void 0, function () {
        var res;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!val.trim()) {
                        antd_1.message.error("不能为空");
                        return [2 /*return*/];
                    }
                    ;
                    setLoading(true);
                    return [4 /*yield*/, _fetch_1["default"]
                            .post("config/set/domain", (_a = {},
                            _a[keyName] = val.trim(),
                            _a))["finally"](function () {
                            setLoading(false);
                        })];
                case 1:
                    res = _b.sent();
                    if (res.code === 0) {
                        antd_1.message.success("保存成功");
                        setEdit(false);
                        update();
                    }
                    ;
                    return [2 /*return*/];
            }
        });
    }); }, [val]);
    return (React.createElement("div", { className: "row-box" },
        React.createElement("div", { className: "name-group" },
            React.createElement("h6", null, name),
            React.createElement("div", { className: "input" }, edit ? (React.createElement(antd_1.Input, { style: { width: 310 }, placeholder: "\u8BF7\u8F93\u5165\u5730\u5740", defaultValue: url, onChange: function (e) { return setVal(e.target.value); } })) : (React.createElement("span", null, url)))),
        React.createElement("div", { className: "eidt-group" }, edit ? (React.createElement(React.Fragment, null,
            React.createElement("a", { onClick: setDomain },
                loading && (React.createElement(icons_1.LoadingOutlined, { style: { marginRight: 10 } })),
                "\u4FDD\u5B58"),
            React.createElement("a", { onClick: function () {
                    setVal(url);
                    setEdit(false);
                } }, "\u53D6\u6D88"))) : (React.createElement("a", { onClick: function () { return setEdit(true); } }, "\u7F16\u8F91")))));
}
exports["default"] = Index;
