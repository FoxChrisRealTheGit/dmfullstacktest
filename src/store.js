import {createStore, applyMiddleware} from 'redux';
import reducer from './ducks/users';
import promisemiddleware from 'redux-promise-middleware';

export default createStore(reducer, applyMiddleware(promisemiddleware()));
