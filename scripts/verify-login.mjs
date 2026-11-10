import assert from 'node:assert/strict';
import {loginErrorMessage} from '../src/features/auth/loginFeedback.ts';
assert.match(loginErrorMessage({response:{status:401}}), /اسم المستخدم/);
assert.match(loginErrorMessage({response:{status:403}}), /اسم المستخدم/);
assert.match(loginErrorMessage({response:{status:429}}), /انتظر/);
assert.match(loginErrorMessage({response:{status:503}}), /غير متاحة/);
assert.match(loginErrorMessage({code:'ECONNABORTED'}), /اتصال الشبكة/);
assert.match(loginErrorMessage(null), /اتصال الشبكة/);
console.log('PASS: credential rejection, rate limiting, service failure, timeout and network error feedback');
