/* eslint-disable no-constant-condition */

import { put, call, takeEvery } from "redux-saga/effects";
import { delay } from "redux-saga";

export function* incrementAsync() {
  yield call(delay, 1000);
  yield put({ type: "INCREMENT" });
}

export function* submitcode(dataParams) {
  try {
    console.log("-----", dataParams);
    let postOptions = {
      method: "post",
      headers: new Headers({
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json"
      }),
      body: JSON.stringify(dataParams)
    };
    // const url = 'http://18.191.214.58:8000/runcommand/';
    const url = "http://127.0.0.1:8000/runcommand/";
    const response = yield call(fetch, url, postOptions);
    let data = yield call([response, response.json]);
    console.log("--response--", data);
    yield put({ type: "SHOW_MESSAGE", data });
    data = {loading:false} ;
    yield put({ type: "LOADING", data });
  } catch (e) {
    console.log("error--", e);
  }
}

export default function* counterSaga() {
  yield takeEvery("INCREMENT_ASYNC", incrementAsync);
  yield takeEvery("SUBMIT_CODE", submitcode);
}
