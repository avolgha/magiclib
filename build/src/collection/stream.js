"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeStream = exports.StreamImpl = void 0;
class StreamImpl {
    constructor(payload) {
        this.raw = payload;
    }
    filter(condition) {
        const next = [];
        for (const element of this.raw) {
            if (condition(element))
                next.push(element);
        }
        return new StreamImpl(next);
    }
    map(mapper) {
        const next = [];
        for (const element of this.raw) {
            next.push(mapper(element));
        }
        return new StreamImpl(next);
    }
    forEach(func) {
        this.raw.forEach(element => func(element));
    }
    anyMatch(condition) {
        for (const element of this.raw) {
            if (condition(element))
                return true;
        }
        return false;
    }
    noneMatch(condition) {
        return !this.anyMatch(condition);
    }
}
exports.StreamImpl = StreamImpl;
function makeStream(array) {
    return new StreamImpl(array);
}
exports.makeStream = makeStream;
//# sourceMappingURL=stream.js.map