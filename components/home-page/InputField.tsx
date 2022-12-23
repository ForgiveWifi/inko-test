// import "./InputField.css"

type InputFieldProps = {
  name: string,
  type: string,
  required: boolean,
  className?: string
  min?: number,
}

function InputField(props: InputFieldProps) {

  const { name, type, required, min, className} = props

  return (
    <div className={`flexbox-start ${className}`} >
      <label>{name}</label>
      <input className="input-field" name={name} type={type} min={min} required={required}></input>
    </div>
  );
}

export default InputField;