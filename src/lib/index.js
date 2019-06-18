/**
 * before: 
 * can be variable, falsy means stop executing `func`;
 * can be function, return falsy means stop executing `func`;
 * can be promise, promise resolve falsy means stop executing `func`;
 * 
 * after:
 * callback after `func` executed;
 */
export default function wraphook (opt) {
  opt = opt || {};
  if(!('before' in opt)){
    opt.before = true;
  }
  const { before, after } = opt;
  return (func) => {
    let doIt = true;
    if (!before) { // undefined,null,false,0等等falsy表示拦截，不再往下执行
      return;
    }
    if (typeof before === 'function') {
      doIt = before();
    }
    if (doIt.then) { // 返回promise，在promise中返回是否执行的标志
      doIt.then((reallyDoIt) => {
        if (reallyDoIt) {
          func(after);
        }
      });
    } else if (doIt) { // 返回是否执行的标志
      func(after);
    }
  }
};
