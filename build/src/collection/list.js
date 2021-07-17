"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fromArray = exports.of = exports.empty = exports.ListImpl = void 0;
const stream_1 = require("./stream");
const util_1 = require("./util");
class ListImpl {
    constructor(payload) {
        this.raw = payload;
    }
    size() {
        return this.raw.length;
    }
    push(element) {
        this.raw.push(element);
    }
    pushAll(elements) {
        elements.forEach(this.push);
    }
    get(index) {
        return this.raw[index];
    }
    getIf(condition) {
        const next = [];
        for (const element of this.raw) {
            if (condition(element))
                next.push(element);
        }
        return next;
    }
    remove(element) {
        this.raw = util_1.remove(this.raw, element);
    }
    removeIf(condition) {
        this.forEach(element => {
            if (condition(element)) {
                this.raw = util_1.remove(this.raw, element);
            }
        });
    }
    forEach(func) {
        this.raw.forEach(func);
    }
    stream() {
        return stream_1.makeStream(this.raw);
    }
}
exports.ListImpl = ListImpl;
function empty() {
    return new ListImpl([]);
}
exports.empty = empty;
function of(...elements) {
    return fromArray(elements);
}
exports.of = of;
function fromArray(array) {
    return new ListImpl(array);
}
exports.fromArray = fromArray;
//# sourceMappingURL=list.js.map