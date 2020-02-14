import { actionTypes } from './actions'

export const initialState = {
  Suggestions: []
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SEARCH:
      return {
        ...state
      }
 
    default:
      return state
  }
}

export default reducer