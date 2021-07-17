"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.times = void 0;
function times(times, action) {
    for (let index = 0; index < times; index++) {
        action(index);
    }
}
exports.times = times;
//# sourceMappingURL=count.js.map