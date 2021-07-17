"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.without = void 0;
function without(array, index) {
    const next = [];
    let currentIndex = 0;
    for (const element of array) {
        if (currentIndex !== index) {
            next.push(element);
        }
        currentIndex++;
    }
    return next;
}
exports.without = without;
//# sourceMappingURL=logic.js.map