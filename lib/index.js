'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = wraphook;
/**
 * before: 
 * can be variable, falsy means stop executing `func`;
 * can be function, return falsy means stop executing `func`;
 * can be promise, promise resolve falsy means stop executing `func`;
 * 
 * after:
 * callback after `func` executed;
 */
function wraphook(opt) {
  opt = opt || {};
  if (!('before' in opt) || opt.before === undefined) {
    opt.before = true;
  }
  var _opt = opt,
      before = _opt.before,
      after = _opt.after;

  return function (func) {
    var doIt = true;
    if (!before) {
      // undefined,null,false,0等等falsy表示拦截，不再往下执行
      return;
    }
    if (typeof before === 'function') {
      doIt = before();
    }
    if (doIt.then) {
      // 返回promise，在promise中返回是否执行的标志
      doIt.then(function (reallyDoIt) {
        if (reallyDoIt) {
          func(after);
        }
      });
    } else if (doIt) {
      // 返回是否执行的标志
      func(after);
    }
  };
};