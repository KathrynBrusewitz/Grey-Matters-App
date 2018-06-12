import { push } from 'react-router-redux';
import axios from 'axios';
import { baseURL } from '../constants';
import { analytics } from '../store';
import { AsyncStorage } from 'react-native';

// AsyncStorage.setItem('@GreyMattersApp:token', token);
// AsyncStorage.getItem('@GreyMattersApp:token');

// Types
export const userConstants = {

  GET_CURRENT_USER_REQUEST: 'GET_CURRENT_USER_REQUEST',
  GET_CURRENT_USER_SUCCESS: 'GET_CURRENT_USER_SUCCESS',
  GET_CURRENT_USER_FAILURE: 'GET_CURRENT_USER_FAILURE',

  TOKEN_LOGIN_REQUEST: 'TOKEN_LOGIN_REQUEST',
  TOKEN_LOGIN_SUCCESS: 'TOKEN_LOGIN_SUCCESS',
  TOKEN_LOGIN_FAILURE: 'TOKEN_LOGIN_FAILURE',

  BASIC_LOGIN_REQUEST: 'BASIC_LOGIN_REQUEST',
  BASIC_LOGIN_SUCCESS: 'BASIC_LOGIN_SUCCESS',
  BASIC_LOGIN_FAILURE: 'BASIC_LOGIN_FAILURE',

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
  getCurrentUser,
  tokenLogin,
  basicLogin,
  login,
  logout,
  signup,
  updateUser,
  sendResetLink,
  errorMessage,
  clearMessage,
  clearConfirmation,
};

function getCurrentUser() {
  return dispatch => {
    AsyncStorage.getItem('@GreyMattersApp:token')
      .then(token => {
        console.log('GET /me');
        dispatch(request());
        axios({
          method: 'get',
          url: '/me',
          baseURL,
          headers: { 'x-access-token': token },
        })
          .then(res => {
            if (res.data.success) {
              console.log('Successfully got current user from server.');
              dispatch(success(res.data.payload));
            } else {
              console.log(res.data.message);
              dispatch(failure());
            }
          })
          .catch(error => {
            console.log('Server error: Could not get current user with token.');
            dispatch(failure());
          });
      })
      .catch(error => {
        console.log('Could not get token from storage.');
      });
  }

  function request() { return { type: userConstants.GET_CURRENT_USER_REQUEST } }
  function success(payload) { return { type: userConstants.GET_CURRENT_USER_SUCCESS, payload } }
  function failure() { return { type: userConstants.GET_CURRENT_USER_FAILURE } }
}

function tokenLogin() {
  return dispatch => {
    dispatch(request());
    AsyncStorage.getItem('@GreyMattersApp:token')
      .then(token => {
        console.log('Token exists. Now verifying token...');
        axios({
          method: 'get',
          url: '/decode',
          baseURL,
          headers: { 'x-access-token': token },
        })
          .then(res => {
            if (res.data.success) {
              console.log('Token has been verified! Token payload has been stored in User Store.');
              dispatch(success(res.data.payload));
              if (res.data.payload._id) {
                // If _id exists, we have a user logging in, call /me route to fill in all user account data in state.user.user
                dispatch(getCurrentUser());
              }
            } else {
              console.log(res.data.message);
              console.log('Token is invalid. Removing token from storage, clearing out current user in the store, and dispatching basicLogin()');
              dispatch(failure()); // Remove current user in User Store
              dispatch(basicLogin()); // Remove current user in User Store
              AsyncStorage.removeItem('@GreyMattersApp:token', function (err) {
                if (err) {
                  console.log('There was an error in removing the token from storage.');
                } else {
                  console.log('Token successfully removed from storage.');
                }
              });
            }
          })
          .catch(error => {
            console.log(error.response.data.message);
            console.log('Token is invalid. Removing token from storage, clearing out current user in the store, and dispatching basicLogin()');
            dispatch(failure());
            dispatch(basicLogin());
            AsyncStorage.removeItem('@GreyMattersApp:token', function (err) {
              if (err) {
                console.log('There was an error in removing the token from storage.');
              } else {
                console.log('Token successfully removed from storage.');
              }
            });
          })
      })
      .catch(err => {
        console.log('There was an error in getting the token from storage.');
        dispatch(failure());
      });
  };

  function request() { return { type: userConstants.TOKEN_LOGIN_REQUEST } }
  function success(payload) { return { type: userConstants.TOKEN_LOGIN_SUCCESS, payload } }
  function failure() { return { type: userConstants.TOKEN_LOGIN_FAILURE } }
}

function basicLogin() {
  return dispatch => {
    dispatch(request());
    axios({
      method: 'post',
      url: '/login',
      baseURL,
      data: {
        entry: 'app',
      }
    })
      .then(res => {
        if (res.data.success) {
          AsyncStorage.setItem('@GreyMattersApp:token', res.data.token, function (err) {
            if (err) {
              dispatch(failure('Could not set token after successful basic login query.'));
              console.log('Could not set token after successful login query.');
            } else {
              console.log(res.data.payload);
              dispatch(success(res.data.payload));
            }
          });
        } else {
          dispatch(failure(res.data.message));
          console.log(res.data.message);
        }
      })
      .catch(error => {
        dispatch(failure());
        console.log(error.response.data.message);
      });
  };

  function request() { return { type: userConstants.BASIC_LOGIN_REQUEST } }
  function success(payload) { return { type: userConstants.BASIC_LOGIN_SUCCESS, payload } }
  function failure() { return { type: userConstants.BASIC_LOGIN_FAILURE } }
}

function login({ email, password, history }) {
  return dispatch => {
    dispatch(request());
    axios({
      method: 'post',
      url: '/login',
      baseURL,
      data: {
        email,
        password,
        entry: 'app',
      }
    })
      .then(res => {
        if (res.data.success) {
          AsyncStorage.setItem('@GreyMattersApp:token', res.data.token, function (err) {
            if (err) {
              dispatch(failure('Could not set token after successful login query.'));
              console.log('Could not set token after successful login query.');
            } else {
              dispatch(success(res.data.payload));
              history.push('/');
            }
          });
          dispatch(getCurrentUser());
        } else {
          dispatch(failure(res.data.message));
          console.log(res.data.message);
        }
      })
      .catch(error => {
        dispatch(failure(error.response.data.message));
        console.log(error.response.data.message);
      });
  };

  function request() { return { type: userConstants.LOGIN_REQUEST } }
  function success(payload) { return { type: userConstants.LOGIN_SUCCESS, payload } }
  function failure(message) { return { type: userConstants.LOGIN_FAILURE, message } }
}

function logout({ history }) {
  return dispatch => {
    AsyncStorage.removeItem('@GreyMattersApp:token', function (err) {
      if (err) {
        dispatch(failure('Could not remove token.'));
        console.log('Could not remove token.');
      } else {
        dispatch(basicLogin());
        history.push('/');
      }
    });
  };
}

function sendResetLink({ email }) {
  return dispatch => {
    axios({
      method: 'post',
      url: '/codes/resets',
      baseURL,
      data: {
        email,
      }
    })
      .then(res => {
        if (res.data.success) {
          dispatch(success());
        } else {
          dispatch(failure(res.data.message));
        }
      })
      .catch(error => {
        console.log(error);
        dispatch(failure('Unable to Complete Request'));
      });
  };

  function success() { return { type: userConstants.RESET_LINK_SUCCESS } }
  function failure(message) { return { type: userConstants.RESET_LINK_FAILURE, message } }
}

function signup({ name, email, password, roles = ['reader'], history }) {
  return dispatch => {
    dispatch(request());

    AsyncStorage.getItem('@GreyMattersApp:token')
      .then(token => {
        axios({
          method: 'post',
          url: '/users',
          baseURL,
          headers: { 'x-access-token': token },
          data: {
            name,
            email,
            password,
            roles,
          }
        })
          .then(res => {
            if (res.data.success) {
              dispatch(login({ email, password, history }));
              analytics.track({
                userId: uuid,
                event: 'Signup',
              });
            } else {
              dispatch(failure(res.data.message));
              console.log(res.data.message);
            }
          })
          .catch(error => {
            dispatch(failure('Unable to Complete Request'));
            console.log(error.response.data.message);
          });
      })
      .catch(error => {
        dispatch(failure('Unable to Complete Request'));
        console.log('Cannot get token from storage');
      });
  };

  function request() { return { type: userConstants.SIGNUP_REQUEST } }
  function success(data) { return { type: userConstants.SIGNUP_SUCCESS, data } }
  function failure(message) { return { type: userConstants.SIGNUP_FAILURE, message } }
}

function updateUser({ fields, id, history = null }) {
  return dispatch => {
    dispatch(request());
    AsyncStorage.getItem('@GreyMattersApp:token')
      .then(token => {
        axios({
          method: 'put',
          url: `/users/${id}`,
          baseURL,
          data: { ...fields },
          headers: { 'x-access-token': token },
        })
          .then(res => {
            if (res.data.success) {
              dispatch(success(res.data.payload));
              if (history) {
                history.push('/userProfile');
              }
            } else {
              dispatch(failure());
              console.log(res.data.message);
            }
          })
          .catch(error => {
            dispatch(failure());
            console.log(error);
          });
      })
      .catch(error => {
        dispatch(failure('Unable to Complete Request'));
        console.log(error);
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
