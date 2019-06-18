# wrap-hook

## Install

`npm i -S wrap-hook`


## How to use

```js
import wraphook from 'wrap-hook'

const TRUSY_BEFORE = () => true;
const AFTER_CALL = ()=>{ console.log('after is called!')}

const wrapped = wraphook({ before: TRUSY_BEFORE, after: AFTER_CALL });
wrapped((callback) => {
  console.log('write business code here.')
  callback();
});
// write business code here.
// after is called!
```

```js
import wraphook from 'wrap-hook'

const FALSY_BEFORE = () => false;
const AFTER_CALL = ()=>{ console.log('after is called!')}

const wrapped = wraphook({ before: FALSY_BEFORE, after: AFTER_CALL });
wrapped((callback) => {
  console.log('write business code here.')
  callback();
});
// no log!
```