import * as actionTypes from "./actionTypes";

export function getCardInfo(cardNo) {
  return function (dispatch) {
    let url = "https://lookup.binlist.net";
    console.log("cardNo.lenght : ",cardNo, cardNo.length)
    if (cardNo && cardNo.length >= 4) { 
      url = url + "/" + cardNo;
      console.log("url", url);
      return fetch(url)
        .then((resp) => resp.json())
        .then((result) => dispatch(getCardInfoSuccess(result)))
        .catch((err) => dispatch(getCardInfoError(err))); 
    }
  };
}

export function getCardInfoSuccess(cardinfo) {
  console.log("cardinfo", cardinfo);
  return { type: actionTypes.CHECK_CARDS, payload: cardinfo };
}

export function getCardInfoError(error)
{
    return { type: actionTypes.ERROR, payload: error };
}