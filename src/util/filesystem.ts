import * as fs from 'fs';

export function existsFile(path: string): boolean {
  return fs.existsSync(path);
}

export function existsDir(path: string): boolean {
  return fs.existsSync(path);
}

export function readFile(path: string): string {
  if (!existsFile(path)) throw new Error('File does not exists');
  return fs.readFileSync(path, {encoding: 'utf-8'});
}

export function readFileAndMap<N>(
  path: string,
  mapper: (object: string) => N
): N {
  return mapper(readFile(path));
}

export function writeFile(path: string, data: string) {
  if (!existsFile(path)) throw new Error('File does not exists');
  fs.writeFileSync(path, data, {encoding: 'utf-8'});
}

export function makeFile(path: string) {
  if (existsFile(path)) throw new Error('File does exists');
  fs.writeFileSync(path, '');
}

export function makeDir(path: string) {
  if (existsDir(path)) throw new Error('Directory does exists');
  fs.mkdirSync(path);
}

export function deleteFile(path: string) {
  if (!existsFile(path)) throw new Error('File does not exists');
  fs.unlinkSync(path);
}
