"use strict";
exports.__esModule = true;
exports.NOTICE_GAME = exports.NOTICE_OBJECT = exports.DISABLED_DATE_TREE_MONTH = exports.Logo = exports.LOGO = void 0;
var react_1 = require("react");
var moment_1 = require("moment");
var icons_1 = require("@ant-design/icons");
var logo_png_1 = require("@img/logo.png");
var logo_white_png_1 = require("@img/logo-white.png");
var logo_icon_png_1 = require("@img/logo-icon.png");
exports.LOGO = react_1["default"].createElement(icons_1.TwitterOutlined, null);
exports.Logo = function (_a) {
    var _b = _a.width, width = _b === void 0 ? 180 : _b, _c = _a.white, white = _c === void 0 ? false : _c, _d = _a.text, text = _d === void 0 ? true : _d;
    if (text) {
        return react_1["default"].createElement("img", { src: white ? logo_white_png_1["default"] : logo_png_1["default"], width: width });
    }
    else {
        return react_1["default"].createElement("img", { src: logo_icon_png_1["default"], width: width });
    }
};
//日期范围最近3个月
exports.DISABLED_DATE_TREE_MONTH = function (current) {
    var today = moment_1["default"]().endOf('day');
    var before = moment_1["default"]().subtract(3, 'month').startOf('day');
    return current && (current > today || current < before);
};
exports.NOTICE_OBJECT = [
    { name: '各级代理', value: 'ADMIN' },
    { name: '一级代理', value: 'AGLV1' },
    { name: '二级代理', value: 'AGLV2' },
    { name: '三级代理', value: 'AGLV3' },
];
exports.NOTICE_GAME = [
    { name: '全部代理', value: 0 },
    { name: '代理', value: 1 },
    { name: '玩家', value: 2 },
];
