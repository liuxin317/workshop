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
var domain_1 = require("./component/domain");
var _fetch_1 = require("@fetch");
require("./style.scss");
var Index = function () {
    var handleClick = function (e) {
        console.log("click ", e);
    };
    var _a = react_1.useState(true), loading = _a[0], setLoading = _a[1];
    var _b = react_1.useState(true), update = _b[0], setUpdate = _b[1];
    var _c = react_1.useState({
        feedbackUrl: '',
        gameUrl: '',
        shareUrl: '',
        wsUrl: ''
    }), domains = _c[0], setDomains = _c[1];
    react_1.useEffect(function () {
        if (update) {
            getDomain();
            setUpdate(false);
        }
    }, [update]);
    var getDomain = react_1.useCallback(function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setLoading(true);
                    return [4 /*yield*/, _fetch_1["default"].post("config/get/domain")["finally"](function () {
                            setLoading(false);
                        })];
                case 1:
                    res = _a.sent();
                    setDomains(res.data);
                    return [2 /*return*/];
            }
        });
    }); }, []);
    return (react_1["default"].createElement("section", { className: "game-config__box" },
        react_1["default"].createElement(antd_1.Menu, { onClick: handleClick, style: { width: 256 }, defaultSelectedKeys: ["1"], mode: "inline" },
            react_1["default"].createElement(antd_1.Menu.Item, { key: "1" }, "\u57DF\u540D\u914D\u7F6E")),
        react_1["default"].createElement("div", { className: "content" },
            react_1["default"].createElement(antd_1.Spin, { spinning: loading },
                react_1["default"].createElement(domain_1["default"], { data: domains, update: function () { return setUpdate(true); } })))));
};
exports["default"] = Index;
