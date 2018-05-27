import { userConstants } from '../actions';

const USER_INITIAL = {
  user: null,
  isBasicLoggingIn: false,
  isTokenLoggingIn: false,
  isLoggingIn: false,
  isSigningUp: false,
  isUpdatingUser: false,
  bookmarkIDSet: null,
  token: null,
  message: null,
};

export const userReducer = (state = USER_INITIAL, action) => {
  switch (action.type) {
    case userConstants.TOKEN_LOGIN_REQUEST:
      return {
        ...state,
        isTokenLoggingIn: true,
      };
    case userConstants.TOKEN_LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload,
        isTokenLoggingIn: false,
      };
    case userConstants.TOKEN_LOGIN_FAILURE:
      return {
        ...state,
        user: null,
        isTokenLoggingIn: false,
      };
    case userConstants.BASIC_LOGIN_REQUEST:
      return {
        ...state,
        isBasicLoggingIn: true,
      };
    case userConstants.BASIC_LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload,
        isBasicLoggingIn: false,
      };
    case userConstants.BASIC_LOGIN_FAILURE:
      return {
        ...state,
        user: null,
        isBasicLoggingIn: false,
      };
    case userConstants.LOGIN_REQUEST:
      return {
        ...state,
        message: null,
        isLoggingIn: true,
      };
    case userConstants.LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload,
        message: null,
        isLoggingIn: false,
      };
    case userConstants.LOGIN_FAILURE:
      return {
        ...state,
        user: null,
        message: action.message,
        isLoggingIn: false,
      };
    case userConstants.SIGNUP_REQUEST:
      return {
        ...state,
        message: null,
        isSigningUp: true,
      };
    case userConstants.SIGNUP_SUCCESS:
      return {
        ...state,
        message: null,
        isSigningUp: false,
      };
    case userConstants.SIGNUP_FAILURE:
      return {
        ...state,
        message: action.message,
        isSigningUp: false,
      };
    case userConstants.LOGOUT:
      return {
        ...state,
        user: null,
      };
    case userConstants.RESET_LINK_SUCCESS:
      return {
        ...state,
        confirmation: 'Reset link sent',
      };
    case userConstants.RESET_LINK_FAILURE:
      return {
        ...state,
        message: action.message,
      };
    case userConstants.ERROR_MESSAGE:
      return {
        ...state,
        message: action.message,
      };
    case userConstants.CLEAR_MESSAGE:
      return {
        ...state,
        message: null,
      };
    case userConstants.CLEAR_CONFIRMATION:
      return {
        ...state,
        confirmation: null,
      };
    case userConstants.UPDATE_USER_REQUEST:
      return {
        ...state,
        isUpdatingUser: true,
      };
    case userConstants.UPDATE_USER_SUCCESS:
      return {
        ...state,
        user: action.payload,
        isUpdatingUser: false,
        bookmarkIDSet: new Set(action.payload.bookmarks),
      };
    case userConstants.UPDATE_USER_FAILURE:
      return {
        ...state,
        isUpdatingUser: false,
      };
    default:
      return state;
  }
}
