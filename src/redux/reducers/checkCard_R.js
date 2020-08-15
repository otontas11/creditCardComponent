import * as actionTypes from "../actions/actionTypes";

export default function  checkCard_R(state = {}, action) {
  switch (action.type) {
    case actionTypes.CHECK_CARDS:
      return action.payload;

    default:
      return state;
  }
};
