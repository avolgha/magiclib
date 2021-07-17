"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = void 0;
function remove(array, _element) {
    const next = [];
    for (const element of array) {
        if (element !== _element) {
            next.push(element);
        }
    }
    return next;
}
exports.remove = remove;
//# sourceMappingURL=util.js.map