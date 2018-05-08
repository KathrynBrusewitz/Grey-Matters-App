import { termsConstants } from '../actions';

const TERMS_INITIAL = {
  term: null,
  terms: null,
  isGettingTerm: false,
  isGettingTerms: false,
};

export const termsReducer = (state = TERMS_INITIAL, action) => {
  switch (action.type) {
    case termsConstants.GET_TERM_REQUEST:
      return {
        ...state,
        isGettingTerm: true,
      };
    case termsConstants.GET_TERM_SUCCESS:
      return {
        ...state,
        term: action.payload,
        isGettingTerm: false,
      };
    case termsConstants.GET_TERM_FAILURE:
      return {
        ...state,
        term: null,
        isGettingTerm: false,
      };

    case termsConstants.GET_TERMS_REQUEST:
      return {
        ...state,
        isGettingTerms: true,
      };
    case termsConstants.GET_TERMS_SUCCESS:
      let termsMap = {};
      for (let i = 0; i < action.payload.length; i++) {
        termsMap[action.payload[i]._id] = action.payload[i].term;
      }
      return {
        ...state,
        terms: action.payload,
        isGettingTerms: false,
        termsMap,
      };
    case termsConstants.GET_TERMS_FAILURE:
      return {
        ...state,
        terms: null,
        isGettingTerms: false,
      };

    case termsConstants.CLEAR_TERMS:
      return {
        ...state,
        terms: null,
      }
    default:
      return state;
  }
}
