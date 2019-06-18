import wraphook from '../index'

describe('wraphook', () => {
  let originalTimeout;
  const DELAY = 500;
  let isExecuted = null;
  const TRUSY_BEFORE = () => true;
  const FALSY_BEFORE = () => false;
  const TRUSY_PROMISE_BEFORE = () => new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, DELAY)
  });
  const FALSY_PROMISE_BEFORE = () => new Promise((resolve) => {
    setTimeout(() => {
      resolve(false);
    }, DELAY)
  });
  beforeEach(function () {
    isExecuted = false;
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
  });
  afterEach(function() {
    isExecuted = null;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
});
  it('is a function', () => expect(wraphook).toEqual(jasmine.any(Function)))

  it('executed without hook', () => {
    const wrapped = wraphook();
    wrapped(() => {
      isExecuted = !isExecuted;
    });
    expect(isExecuted).toEqual(true)
  })

  it('executed with trusy before hook', () => {
    const wrapped = wraphook({ before: TRUSY_BEFORE });
    wrapped(() => {
      isExecuted = !isExecuted;
    });
    expect(isExecuted).toEqual(true)
  })

  it('not execute with falsy before hook', () => {
    const wrapped = wraphook({ before: FALSY_BEFORE });
    wrapped(() => {
      isExecuted = !isExecuted;
    });
    expect(isExecuted).toEqual(false)
  })

  it('executed with trusy promise before hook', (done) => {
    const wrapped = wraphook({
      before: TRUSY_PROMISE_BEFORE,
      after: () => {
        console.log('after executed 1111111')
      },
    });
    wrapped((callback) => {
      isExecuted = true;
      callback()
    });
    setTimeout(() => {
      expect(isExecuted).toBeTruthy();
      done();
    },DELAY + 500);
  })

  it('not executed with falsy promise before hook', (done) => {
    const wrapped = wraphook({
      before: FALSY_PROMISE_BEFORE,
      after: () => {
        console.log('after executed 2222222')
      },
    });
    wrapped(() => {
      isExecuted = true;
    });
    setTimeout(() => {
      expect(isExecuted).toBeFalsy()
      done();
    }, DELAY + 500);
  })
})
