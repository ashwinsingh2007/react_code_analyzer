import { put, call } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import { incrementAsync } from './counter';

it('incrementAsync Saga test', () => {
  const g = incrementAsync();

  expect(g.next().value).toEqual(call(delay, 1000));
  expect(g.next().value).toEqual(put({ type: 'INCREMENT' }));
  expect(g.next()).toEqual({ done: true, value: undefined });
});
