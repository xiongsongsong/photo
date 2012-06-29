/*
 * 主页入口
 * 2012/06/29 10:48
 *
 *  */

define(function (require, exports, module) {
    exports.init = function () {
        require("index/load-uploadswf").init();
    };
});
