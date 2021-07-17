module.exports.getCallerFile = function getCallerFile() {
  const originalFunc = Error.prepareStackTrace;

  var callerfile;

  try {
    const err = new Error();
    var currentfile;

    Error.prepareStackTrace = function (err, stack) {
      return stack;
    }

    currentfile = err.stack?.shift().getFileName();

    while (err.stack?.length) {
      callerfile = err.stack.shift().getFileName();

      if (currentfile !== callerfile) break;
    }
  } catch (e) {}

  Error.prepareStackTrace = originalFunc;

  return callerfile;
}