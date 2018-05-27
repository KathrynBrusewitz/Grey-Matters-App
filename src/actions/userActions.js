import { push } from 'react-router-redux';
import axios from 'axios';
import { baseURL } from './index';

// Types
export const userConstants = {

  LOGIN_REQUEST: 'AUTH_LOGIN_REQUEST',
  LOGIN_SUCCESS: 'AUTH_LOGIN_SUCCESS',
  LOGIN_FAILURE: 'AUTH_LOGIN_FAILURE',

  UPDATE_USER_REQUEST: 'UPDATE_USER_REQUEST',
  UPDATE_USER_SUCCESS: 'UPDATE_USER_SUCCESS',
  UPDATE_USER_FAILURE: 'UPDATE_USER_FAILURE',

  SIGNUP_REQUEST: 'AUTH_SIGNUP_REQUEST',
  SIGNUP_SUCCESS: 'AUTH_SIGNUP_SUCCESS',
  SIGNUP_FAILURE: 'AUTH_SIGNUP_FAILURE',

  LOGOUT: 'AUTH_LOGOUT',
  RESET_LINK_SUCCESS: 'RESET_LINK_SUCCESS',
  RESET_LINK_FAILURE: 'RESET_LINK_FAILURE',

  CLEAR_MESSAGE: 'USER_CLEAR_MESSAGE',
  CLEAR_CONFIRMATION: 'USER_CLEAR_CONFIRMATION',
  ERROR_MESSAGE: 'USER_ERROR_MESSAGE',
  
};

// Creators
export const userActions = {
  login,
  logout,
  signup,
  updateUser,
  sendResetLink,
  errorMessage,
  clearMessage,
  clearConfirmation,
};

// Implementations
function login({ email, password, history }) {
  return dispatch => {
    dispatch(request());
    axios({
      method: 'post',
      url: '/authenticate',
      baseURL,
      data: {
        email,
        password,
        entry: 'app',
      }
    })
    .then(res => {
      if (res.data.success) {
        dispatch(success(res.data));
        history.push('/');
        // cookies.set('token', res.data.token, { path: '/' }); //TODO: find app equivalent of this
      } else {
        dispatch(failure(res.data.message));
      }
    })
    .catch(error => {
      console.log(error);
      dispatch(failure('Unable to Complete Request'));
    });
  };

  function request() { return { type: userConstants.LOGIN_REQUEST } }
  function success(data) { return { type: userConstants.LOGIN_SUCCESS, data } }
  function failure(message) { return { type: userConstants.LOGIN_FAILURE, message } }
}

function logout({ history }) {
  return dispatch => {
    dispatch(success());
    history.push('/');
  };

  function success() { return { type: userConstants.LOGOUT } }
}

function sendResetLink() {
  return dispatch => {
    // axios({
    //   method: 'post',
    //   url: '/authenticate',
    //   baseURL,
    //   data: {
    //     email,
    //     password,
    //     entry: 'app',
    //   }
    // })
    // .then(res => {
    //   if (res.data.success) {
    //     dispatch(success());
    //     history.push('/');
    //   } else {
    //     dispatch(failure(res.data.message));
    //   }
    // })
    // .catch(error => {
    //   console.log(error);
    //   dispatch(failure('Unable to Complete Request'));
    // });
  };

  function success() { return { type: userConstants.RESET_LINK_SUCCESS } }
  function failure(message) { return { type: userConstants.RESET_LINK_FAILURE, message } }
}

function signup({ name, email, password, role='reader' }) {
  return dispatch => {
    dispatch(request());

    axios({
      method: 'post',
      url: '/createUser',
      baseURL,
      data: {
        name,
        email,
        password,
        role,
      }
    })
    .then(res => {
      if (res.data.success) {
        dispatch(success(res.data));
        // dispatch(push('/profile'));
      } else {
        dispatch(failure(res.data.message));
      }
    })
    .catch(error => {
      dispatch(failure('Unable to Complete Request'));
    });
  };

  function request() { return { type: userConstants.SIGNUP_REQUEST } }
  function success(data) { return { type: userConstants.SIGNUP_SUCCESS, data } }
  function failure(message) { return { type: userConstants.SIGNUP_FAILURE, message } }
}

function updateUser(fields, id, token) {
  return dispatch => {
    dispatch(request());

    axios({
      method: 'put',
      url: `/users/${id}`,
      baseURL,
      data: {
        ...fields,
      },
      headers: {'x-access-token': token},
    })
    .then(res => {
      if (res.data.success) {
        dispatch(success(res.data.payload));
        // dispatch(push('/users'));
        // dispatch(alertActions.success('Successfully updated!'));
      } else {
        dispatch(failure());
        console.log(res.data.message);
        // dispatch(alertActions.error(res.data.message));
      }
    })
    .catch(error => {
      dispatch(failure(error));
      console.log(error);
      // dispatch(alertActions.error('Unable to update user'));
    });
  };

  function request() { return { type: userConstants.UPDATE_USER_REQUEST } }
  function success(payload) { return { type: userConstants.UPDATE_USER_SUCCESS, payload } }
  function failure() { return { type: userConstants.UPDATE_USER_FAILURE } }
}

function errorMessage(message) {
  return { type: userConstants.ERROR_MESSAGE, message: message }
}

function clearMessage() {
  return { type: userConstants.CLEAR_MESSAGE }
}

function clearConfirmation() {
  return { type: userConstants.CLEAR_CONFIRMATION }
}
