"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.constructUrl = void 0;
const url_1 = require("url");
exports.constructUrl = (storybookUrl, id) => {
    const url = new url_1.URL(storybookUrl);
    url.pathname = url.pathname.replace(/\/$/, '').concat('/iframe.html');
    url.searchParams.append('id', id);
    return url.toString();
};
