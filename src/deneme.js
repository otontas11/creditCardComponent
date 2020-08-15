import React, { useState, useEffect } from "react";
import Cards from "react-credit-cards";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getCardInfo } from "./redux/actions/checkCard";

import {
  validYear,
  validMonth,
  years,
  months,
  installement,
  initialValues,
} from "./installement";

import { formatCreditCardNumber, formatCVC } from "./utils";

function PaymentForm(props) {
  const [card, setCard] = useState(initialValues);
  const [newYears, setNewYears] = useState(years);
  const [cardValidInfo, setCardValidInfo] = useState({});
  console.log("cardInfoSucces: ", props.cardInfoSucces);
  // props.cardInfoSucces.map(cart=>console.log("object,card",card))

  const handleCallback = ({ issuer, maxLength }) => {
    if (issuer !== undefined) {
      setCard({ ...card, issuer: issuer, maxLength: maxLength });
    }
  };

  const handleInputFocus = (e) => {
    setCard({ ...card, focus: e.target.name });
  };

  const handleInputChange = ({ target }) => {
    //console.log("target.value.length 1", target.value.length);
    if (target.name === "number") {
      target.value = formatCreditCardNumber(target.value);
      props.actions.getCardInfoList(target.value.replace(/\s/g, ""));
    } else if (target.name === "cvc") {
      target.value = formatCVC(target.value);
    } else if (target.name === "cardYear") {
      setCard({ ...card, cardYear: target.value });
    } else if (target.name === "cardMonth") {
      setCard({ ...card, cardMonth: target.value });
    }
    setCard({ ...card, [target.name]: target.value });
  };

  const InstalllementSummary = ({ cartName }) => {
    let newCart = installement.filter((opt) => opt.cartName === cartName);
    let taksit = newCart.map((a) => a.taksitCount)[0];
    return (
      <select className="custom-select">
        {taksit &&
          taksit.map((value, index) => (
            <option value={value} key={index}>
              {value}
            </option>
          ))}
      </select>
    );
  };

  useEffect(() => {
    if (card.cardMonth && card.cardMonth < validMonth) {
      if (years.includes(validYear))
        setNewYears(newYears.filter((valid) => valid !== validYear));
    }

    if (card.cardMonth && card.cardMonth > validMonth) {
      newYears.indexOf(validYear) === -1 && newYears.unshift(validYear);
    }
  }, [card.cardMonth, card.cardYear]);

  return (
    <div key="Payment">
      <div id="PaymentForm">
        <Cards
          cvc={card.cvc}
          expiry={card.cardMonth + card.cardYear.slice(2, 4)}
          focused={card.focus}
          name={card.name}
          number={card.number}
          callback={(e) => handleCallback(e)}
        />
        <form>
          <div className="form-group">
            <input
              type="tel"
              name="number"
              className="form-control"
              placeholder="Card Number"
              pattern="[\d| ]{16,22}"
              required
              onChange={(e) => handleInputChange(e)}
              onFocus={(e) => handleInputFocus(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="Name"
              required
              autoComplete="off"
              onChange={((e) => handleInputChange(e), props.ca)}
              onFocus={(e) => handleInputFocus(e)}
            />
          </div>

          <div className="form-group">
            <input
              type="tel"
              name="cvc"
              className="form-control"
              placeholder="CVC"
              pattern="\d{3,4}"
              required
              onChange={(e) => handleInputChange(e)}
              onFocus={(e) => handleInputFocus(e)}
            />
          </div>

          <div className="form-group">
            <select
              className="custom-select"
              name="cardMonth"
              onChange={(e) => handleInputChange(e)}
              onFocus={(e) => handleInputFocus(e)}
            >
              {months &&
                months.map((value, index) => (
                  <option value={value} key={index}>
                    {value}
                  </option>
                ))}
            </select>
          </div>

          <div className="form-group">
            <select
              className="custom-select"
              name="cardYear"
              onChange={(e) => handleInputChange(e)}
              onFocus={(e) => handleInputFocus(e)}
            >
              {newYears &&
                newYears.map((value, index) => (
                  <option value={value} key={index}>
                    {value}
                  </option>
                ))}
            </select>
          </div>

          {/* <div className="form-group">
            {card.issuer &&
            card.issuer !== undefined &&
            card.issuer !== "unknown" ? (
              <div className="form-group">
                <input
                  type="text"
                  value={card.issuer}
                  className="form-control"
                  style={{ border: "initial" }}
                  placeholder="Kart Tipi"
                />
                <InstalllementSummary cartName={card.issuer} />
              </div>
            ) : (
              <div></div>
            )}
          </div> */}

          <div className="form-group">
            {props.cardInfoSucces_type &&
            props.cardInfoSucces_type === "credit" && (
              <div className="form-group">
                <input
                  type="text"
                  value={"Credit Card "+card.issuer}
                  className="form-control"
                  style={{ border: "initial" }}
                  placeholder="Kart Tipi"
                />
                <InstalllementSummary cartName={card.issuer} />
              </div>
            )  }
          </div>

          <div className="form-group">
            {props.cardInfoSucces_type &&
            props.cardInfoSucces_type === "debit" ? (
              <div className="form-group">
                <input
                  type="text"
                  value={"Debit Card "+card.issuer}
                  className="form-control"
                  style={{ border: "initial",paddingLeft:'initial' }}
                  placeholder="Kart Tipi"
                />

                <select className="custom-select">
                  <option>Tek Çekim</option>
                </select>
              </div>
            ) : (
              <div></div>
            )}
          </div>
        
        
        </form>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    cardInfoSucces_bank: state.checkCard.bank,
    cardInfoSucces_prepaid: state.checkCard.prepaid,
    cardInfoSucces_type: state.checkCard.type,

    // prepaid: false
    // scheme: "visa"
    // type: "credit"

    cardInfoSucces: state.checkCard,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: {
      getCardInfoList: bindActionCreators(getCardInfo, dispatch),
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PaymentForm);
