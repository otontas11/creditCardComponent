import * as actionTypes from "./actionTypes";

export function getCardInfo(cardNo) {
  return function (dispatch) {
    let url = "https://lookup.binlist.net";
    console.log("cardNo.lenght : ",cardNo, cardNo.length)
    if (cardNo && cardNo.length >= 4) {
        console.log("içeride")
      url = url + "/" + cardNo;
      console.log("url", url);
      return fetch(url)
        .then((resp) => resp.json())
        .then((result) => dispatch(getCardInfoSuccess(result)))
         .catch((error) => console.log("error"));
    }
  };
}

export function getCardInfoSuccess(cardinfo) {
  console.log("cardinfo", cardinfo);
  return { type: actionTypes.CHECK_CARDS, payload: cardinfo };
}
