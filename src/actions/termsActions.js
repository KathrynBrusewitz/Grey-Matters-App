import { push } from 'react-router-redux';
import axios from 'axios';
import queryString from 'query-string';
import { AsyncStorage } from 'react-native';
import { baseURL } from '../constants';

// Types
export const termsConstants = {
  GET_TERMS_REQUEST: 'GET_TERMS_REQUEST',
  GET_TERMS_SUCCESS: 'GET_TERMS_SUCCESS',
  GET_TERMS_FAILURE: 'GET_TERMS_FAILURE',

  GET_TERM_REQUEST: 'GET_TERM_REQUEST',
  GET_TERM_SUCCESS: 'GET_TERM_SUCCESS',
  GET_TERM_FAILURE: 'GET_TERM_FAILURE',

  CLEAR_TERM: 'CLEAR_TERM',
};

// Creators
export const termsActions = {
  getTerm,
  getTerms,
  clearTerm,
};

// Implementations
function getTerms(filters = {}) {
  const query = queryString.stringify(filters);
  return dispatch => {
    dispatch(request());

    AsyncStorage.getItem('@GreyMattersApp:token')
    .then(token => {
      axios({
        method: 'get',
        url: `/terms?${query}`,
        baseURL,
        headers: {'x-access-token': token},
      })
      .then(res => {
        if (res.data.success) {
          dispatch(success(res.data.payload));
        } else {
          dispatch(failure());
          console.log(res.data.message);
        }
      })
      .catch(error => {
        dispatch(failure());
        console.log(error.response.data.message);
      });
    })
    .catch(error => {
      dispatch(failure());
      console.log('Cannot get token from storage');
    });
  };

  function request() { return { type: termsConstants.GET_TERMS_REQUEST } }
  function success(payload) { return { type: termsConstants.GET_TERMS_SUCCESS, payload } }
  function failure() { return { type: termsConstants.GET_TERMS_FAILURE } }
}

function getTerm(id) {
  return dispatch => {
    dispatch(request());

    AsyncStorage.getItem('@GreyMattersApp:token')
    .then(token => {
      axios({
        method: 'get',
        url: `/terms/${id}`,
        baseURL,
        headers: {'x-access-token': token},
      })
      .then(res => {
        if (res.data.success) {
          dispatch(success(res.data.payload));
        } else {
          dispatch(failure());
          console.log(res.data.message);
        }
      })
      .catch(error => {
        dispatch(failure());
        console.log(error.response.data.message);
      });
    })
    .catch(error => {
      dispatch(failure());
      console.log('Cannot get token from storage');
    });
  };

  function request() { return { type: termsConstants.GET_TERM_REQUEST } }
  function success(payload) { return { type: termsConstants.GET_TERM_SUCCESS, payload } }
  function failure() { return { type: termsConstants.GET_TERM_FAILURE } }
}

function clearTerm() {
  return {type: termsConstants.CLEAR_TERM}
}
