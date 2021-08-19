"use strict";
exports.__esModule = true;
var row_1 = require("./row");
function Index(props) {
    var data = props.data, update = props.update;
    return (React.createElement("div", { className: "domain-box" },
        React.createElement("h4", { className: "title" }, "\u57DF\u540D\u8BBE\u7F6E"),
        React.createElement(row_1["default"], { name: "\u5206\u4EAB\u5730\u5740", url: data.shareUrl, keyName: "shareUrl", update: update }),
        React.createElement(row_1["default"], { name: "WS\u5730\u5740", url: data.wsUrl, keyName: "wsUrl", update: update }),
        React.createElement(row_1["default"], { name: "\u56FE\u7247\u5730\u5740", url: data.feedbackUrl, keyName: "feedbackUrl", update: update }),
        React.createElement(row_1["default"], { name: "\u6E38\u620F\u5730\u5740\uFF0F\u8DF3\u8F6C\u5730\u5740", url: data.gameUrl, keyName: "gameUrl", update: update })));
}
exports["default"] = Index;
;
