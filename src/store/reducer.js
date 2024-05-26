// src/reducer.js
import { ADD_DATA, FETCH_DATA_REQUEST, FETCH_DATA_SUCCESS, FETCH_DATA_FAILURE, UPDATE_TOTAL_LIMIT } from './actions';

const initialState = {
  data: [],
  loading: false,
  error: null,
  totalLimit: null
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DATA_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case FETCH_DATA_SUCCESS:
      return {
        ...state,
        loading: false
      };
    case FETCH_DATA_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case ADD_DATA:
      return {
        ...state,
        data: [...state.data, ...action.payload]
      };
    case UPDATE_TOTAL_LIMIT:
      return {
        ...state,
        totalLimit: action.payload,
      };
    default:
      return state;
  }
};

export default rootReducer;
