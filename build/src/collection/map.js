"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = exports.createFromPairs = exports.empty = exports.MapImpl = void 0;
const logic_1 = require("../util/logic");
const list_1 = require("./list");
const stream_1 = require("./stream");
class MapImpl {
    constructor() {
        this._keys = [];
        this._values = [];
    }
    size() {
        const keysLength = this._keys.length;
        const valuesLength = this._values.length;
        if (keysLength !== valuesLength) {
            throw new Error(`keys length and values length aren't the same: ${keysLength > valuesLength
                ? keysLength - valuesLength + ' more keys'
                : valuesLength - keysLength + ' more values'}`);
        }
        return keysLength;
    }
    stream() {
        return stream_1.makeStream(this.toPairs());
    }
    forEach(func) {
        this.toPairs().forEach(func);
    }
    keys() {
        return list_1.fromArray(this._keys);
    }
    values() {
        return list_1.fromArray(this._values);
    }
    remove(index) {
        this.size();
        if (this._keys[index]) {
            this._keys = logic_1.without(this._keys, index);
            this._values = logic_1.without(this._values, index);
        }
    }
    put(key, value) {
        const keysLength = this._keys.length;
        const valuesLength = this._values.length;
        if (keysLength !== valuesLength) {
            throw new Error(`keys length and values length aren't the same: ${keysLength > valuesLength
                ? keysLength - valuesLength + ' more keys'
                : valuesLength - keysLength + ' more values'}`);
        }
        this._keys.push(key);
        this._values.push(value);
    }
    get(key) {
        if (!this.containsKey(key))
            return undefined;
        const index = this._keys.indexOf(key);
        return this._values[index];
    }
    containsKey(key) {
        return stream_1.makeStream(this._keys).anyMatch(element => element === key);
    }
    containsValue(value) {
        return stream_1.makeStream(this._values).anyMatch(element => element === value);
    }
    list() {
        return list_1.fromArray(this.toPairs());
    }
    toPairs() {
        this.size();
        const next = [];
        for (let index = 0; index < this.keys().size(); index++) {
            const key = this._keys[index];
            const value = this._values[index];
            next.push({
                left() {
                    return key;
                },
                right() {
                    return value;
                },
            });
        }
        return next;
    }
}
exports.MapImpl = MapImpl;
function empty() {
    return new MapImpl();
}
exports.empty = empty;
function createFromPairs(pairs) {
    const map = empty();
    pairs.forEach(pair => map.put(pair.left(), pair.right()));
    return map;
}
exports.createFromPairs = createFromPairs;
function create(keys, values) {
    const map = empty();
    let currentIndex = 0;
    for (const key of keys) {
        map.put(key, values[currentIndex]);
        currentIndex++;
    }
    return map;
}
exports.create = create;
//# sourceMappingURL=map.js.map