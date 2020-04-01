// import env_default from "./environment.default";

function doLog(level, co, ...data) {
  co(`[${level}][${new Date().toISOString()}]:`, ...data);
}

console.log = function (...data) {
};
console.info = (function (co) {
  return function (...data) {
    doLog('INFO', co, ...data);
  }
})(console.info);
console.warn = function (...data) {
};
console.error = (function (co) {
  return function (...data) {
    doLog('ERROR', co, ...data);
  }
})(console.error);
console.debug = function (...data) {
};

export const environment = {
  production: true
};
