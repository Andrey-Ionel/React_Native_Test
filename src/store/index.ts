import { createStore, combineReducers, applyMiddleware } from 'redux';
import weatherReducer from './reducers/weatherReduser';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({ weatherReducer });
export default createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk)),
);
