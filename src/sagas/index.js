import { all, fork } from 'redux-saga/effects';
import counter from './counter';

const sagas = [ counter ];

export default function *rootSaga () {
  yield all(sagas.map(saga => fork(saga)));
}
