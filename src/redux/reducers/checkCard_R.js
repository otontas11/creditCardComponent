import * as actionTypes from "../actions/actionTypes";

export default function checkCard_R(state = {}, action) {
  switch (action.type) {
    case actionTypes.CHECK_CARDS:
      return action.payload;

    case actionTypes.ERROR:
      return { ...state, action: action.payload, hata: "hata alındı" };

    default:
      return state;
  }
}
