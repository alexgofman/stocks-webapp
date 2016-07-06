import {combineReducers} from 'redux';
import stockReducer from './reducer_stocks';

const rootReducer = combineReducers({
  stocks:stockReducer
});

export default rootReducer;