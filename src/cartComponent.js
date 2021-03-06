import React, { useState, useEffect } from "react";
import Cards from "react-credit-cards";
import { Button, Modal } from "react-bootstrap";

import { useForm } from "react-hook-form";

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

import { formatCreditCardNumber, formatCVC, checkString } from "./utils";

function PaymentForm(props) {
  const [card, setCard] = useState(initialValues);
  const [newYears, setNewYears] = useState(years);
  const [cardEnteredLength, setCardEnteredLength] = useState("");

  const [show, setShow] = useState(false);
  const handleClose = (e) => {
    setShow(false);

    window.location.reload(false);
  };
  const handleShow = (data) => {
    setShow(true);
  };

  const { register, handleSubmit } = useForm();

  const handleCallback = ({ issuer, maxLength }) => {
    if (issuer !== undefined) {
      setCard({ ...card, issuer: issuer, maxLength: maxLength });
    }
  };

  const handleInputFocus = (e) => {
    setCard({ ...card, focus: e.target.name });
  };

  const handleInputChange = ({ target }) => {
    if (target.name === "number") {
      target.value = formatCreditCardNumber(target.value);
      setCardEnteredLength(target.value.length);
      props.actions.getCardInfoList(target.value.replace(/\s/g, ""));
    } else if (target.name === "cvc") {
      target.value = formatCVC(target.value);
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
  const onSubmit = (data) => {
    console.log("data", data);
    handleShow(data);
  };

  return (
    <div key="Payment">
      <div id="PaymentForm">
        <Cards
          cvc={card.cvc}
          expiry={card.cardMonth + card.cardYear.slice(2, 4)}
          focused={card.focus}
          name={card.nameArea}
          number={card.number}
          callback={(e) => handleCallback(e)}
        />
        <form onSubmit={handleSubmit(onSubmit)}>
          {props.cardInfoSucces.hata && cardEnteredLength >= card.maxLength ? (
            <label style={{ color: "red" }}>Card number is not valid</label>
          ) : (
            <label></label>
          )}
          
          <div className="form-group">
            <input
              type="tel"
              name="number"
              className="form-control"
              placeholder="Card Number"
              pattern="[\d| ]{16,22}"
              ref={register}
              required
              onChange={(e) => handleInputChange(e)}
              onFocus={(e) => handleInputFocus(e)}
            />
          </div>

          <div className="form-group">
            <input
              type="text"
              name="nameArea"
              className="form-control"
              placeholder="Name"
              required
              ref={register}
              autoComplete="off"
              onChange={(e) => handleInputChange(e)}
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
              ref={register}
              onChange={(e) => handleInputChange(e)}
              onFocus={(e) => handleInputFocus(e)}
            />
          </div>
          <div className="d-flex " style={{ justifyContent: "space-between" }}>
            <div className="form-group " style={{ width: "45%" }}>
              <select
                className="custom-select"
                name="cardMonth"
                ref={register}
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

            <div className="form-group  " style={{ width: "45%" }}>
              <select
                className="custom-select"
                name="cardYear"
                ref={register}
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
          </div>

          <div>
            {props.cardInfoSucces?.type &&
            cardEnteredLength >= props.cardInfoSucces_length ? (
              <>
                <div className="form-group ">
                  {props.cardInfoSucces_type &&
                    props.cardInfoSucces_type === "credit" && (
                      <div className="form-group">
                        <input
                          type="text"
                          value={"Credit Card " + card.issuer}
                          name="creditCard"
                          className="form-control"
                          ref={register}
                          style={{ border: "initial" }}
                          placeholder="Kart Tipi"
                        />
                        <InstalllementSummary cartName={card.issuer} />
                      </div>
                    )}
                </div>

                <div className="form-group">
                  {props.cardInfoSucces_type &&
                  props.cardInfoSucces_type === "debit" ? (
                    <div className="form-group">
                      <input
                        type="text"
                        value={"Debit Card " + card.issuer}
                        name="debitCard"
                        className="form-control"
                        ref={register}
                        style={{ border: "initial", paddingLeft: "initial" }}
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
              </>
            ) : (
              <></>
            )}
          </div>
          <input
            type="submit"
            value="Payment"
            className="btn btn-success"
            disabled={
              !props.cardInfoSucces.hata && cardEnteredLength - 1 >= 18
                ? false
                : true
            }
          />
        </form>

        <Modal show={show} onHide={handleClose}>
          <Modal.Title>Process is Ok</Modal.Title>

          <Modal.Footer>
            <Button variant="primary" onClick={(e) => handleClose(e)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    cardInfoSucces_bank: state.checkCard.bank,
    cardInfoSucces_prepaid: state.checkCard.prepaid,
    cardInfoSucces_type: state.checkCard.type,
    cardInfoSucces_length: state.checkCard.number?.length,

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
