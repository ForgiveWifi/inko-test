
import { useState, forwardRef, useImperativeHandle } from "react";
import formatPhoneNumber from "../../lib/phoneNumberFormat"

function PhoneNumber(props, ref) {

  const [input, changeInput] = useState("")

  useImperativeHandle(ref, () => ({
    clearInput() {
      changeInput("");
    }
  }));

  const handleInput = e => {
    const formattedNumber = formatPhoneNumber(e.target.value)
    changeInput(formattedNumber)
  }

  return (
    <div className="flexbox-start span2" >
      <label>phone number</label>
      <input ref={ref} onChange={e => handleInput(e)} value={input} name="phoneNumber" type="text" className="input-field"></input>
    </div>
  );
}

export default forwardRef(PhoneNumber);