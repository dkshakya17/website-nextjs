import { applyMiddleware, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'

import rootReducer, { exampleInitialState } from './reducer'
import rootSaga from './saga'

function configureStore(initialState = exampleInitialState) {
    const sagaMiddleware = createSagaMiddleware()
    const store = createStore(
      rootReducer,
      initialState,
      bindMiddleware([sagaMiddleware])
    )
  
    store.sagaTask = sagaMiddleware.run(rootSaga)
  
    return store
  }
  
  export default configureStore