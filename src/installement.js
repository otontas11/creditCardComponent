export const installement = [
  {
    cartName: "visa",
    taksitCount: [
      "Tek Çekim",
      "2 Taksit",
      "3 Taksit",
      "4 Taksit",
      "6 Taksit",
      "12 Taksit",
      "24 Taksit",
    ],
  },
  {
    cartName: "maestro",
    taksitCount: ["Tek Çekim", "3 Taksit", "6 Taksit", "12 Taksit"],
  },

  {
    cartName: "amex",
    taksitCount: ["Tek Çekim", "2 Taksit", "4 Taksit"],
  },
  {
    cartName: "discover",
    taksitCount: ["Tek Çekim", "3 Taksit", "6 Taksit", "12 Taksit"],
  },
  {
    cartName: "hipercard",
    taksitCount: ["Tek Çekim", "4 Taksit", "12 Taksit", "24 Taksit"],
  },
  {
    cartName: "mastercard",
    taksitCount: ["Tek Çekim", "3 Taksit", "6 Taksit", "9 Taksit"],
  },
  {
    cartName: "jcb",
    taksitCount: ["Tek Çekim", "6 Taksit", "12 Taksit", "24 Taksit"],
  },
];
export const initialValues = {
  cvc: "",
  expiry: "",
  focus: "",
  nameArea: "",
  number: "",
  issuer: "",
  maxLength: "",
  cardMonth: "",
  cardYear: "",
  arrangeDate:"",
};

export let validYear = new Date().getFullYear();
export let validMonth = new Date().getMonth()+1;
export let months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(a=>(  ('0' + a).slice(-2)))
 
 

export let years = [];

for (let i = validYear +1; i <= validYear + 10; i++) {
  years.push(i);
}

export default {
  installement,
  initialValues,
  months,
  years ,
  validMonth
};
//amex ,discover ,maestro , hipercard, visa, mastercard ,jcb
