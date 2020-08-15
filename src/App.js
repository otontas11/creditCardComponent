import React,{useState} from 'react'

export default function App() {
  const [cart, setCart] = useState({
    cvc: "",
    expiry: "",
    focused: "",
    name: "",
    number: "",
    hey: "",
  });


 
   const handleInputChange =  (e) => {
     // let { value } = e.target;
 console.log("e.target.value",e.target.value)
     setCart({...cart, cvc: e.target.value  });
   
   };
   console.log("oktay",cart)

  return (
    <div>
       <input
          type="tel"
          name="number"
          placeholder="Card oktay"
          onKeyUp={(e)=>handleInputChange(e)}
       
        />
    </div>
  )
}
