import { all, call, delay, put, take, takeLatest } from 'redux-saga/effects'
import es6promise from 'es6-promise'
import 'isomorphic-unfetch'

import { actionTypes } from './actions'

es6promise.polyfill()
 
function * search(key) {
    return [{"title": "University of Blah Blah", "city": "London", "country": "UK", "state": "England", "link": "/university-of-blah-blah"},
    {"title": "University of Florida", "city": "Florida", "country": "UK", "state": "England", "link": "/universityOfFlorida"}];
}

function* rootSaga() {
  yield all([ 
    takeLatest(actionTypes.SEARCH, search),
  ])
}

export default rootSaga