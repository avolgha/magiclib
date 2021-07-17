"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFile = exports.makeDir = exports.makeFile = exports.writeFile = exports.readFileAndMap = exports.readFile = exports.existsDir = exports.existsFile = void 0;
const fs = require("fs");
function existsFile(path) {
    return fs.existsSync(path);
}
exports.existsFile = existsFile;
function existsDir(path) {
    return fs.existsSync(path);
}
exports.existsDir = existsDir;
function readFile(path) {
    if (!existsFile(path))
        throw new Error('File does not exists');
    return fs.readFileSync(path, { encoding: 'utf-8' });
}
exports.readFile = readFile;
function readFileAndMap(path, mapper) {
    return mapper(readFile(path));
}
exports.readFileAndMap = readFileAndMap;
function writeFile(path, data) {
    if (!existsFile(path))
        throw new Error('File does not exists');
    fs.writeFileSync(path, data, { encoding: 'utf-8' });
}
exports.writeFile = writeFile;
function makeFile(path) {
    if (existsFile(path))
        throw new Error('File does exists');
    fs.writeFileSync(path, '');
}
exports.makeFile = makeFile;
function makeDir(path) {
    if (existsDir(path))
        throw new Error('Directory does exists');
    fs.mkdirSync(path);
}
exports.makeDir = makeDir;
function deleteFile(path) {
    if (!existsFile(path))
        throw new Error('File does not exists');
    fs.unlinkSync(path);
}
exports.deleteFile = deleteFile;
//# sourceMappingURL=filesystem.js.map