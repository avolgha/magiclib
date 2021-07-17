"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeRequest = void 0;
const axios_1 = require("axios");
function makeRequest(type, url, body, headers) {
    let response = '';
    const axiosConfig = { url, method: type };
    if (body) {
        axiosConfig.data = body;
    }
    if (headers) {
        axiosConfig.headers = headers;
    }
    axios_1.default(axiosConfig)
        .then(result => {
        response = result.data;
    })
        .catch(error => {
        throw error;
    });
    return response !== null && response !== void 0 ? response : '';
}
exports.makeRequest = makeRequest;
//# sourceMappingURL=http.js.map