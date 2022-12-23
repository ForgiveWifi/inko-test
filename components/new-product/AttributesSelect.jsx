import { Select } from "@mantine/core"
import ColorSelect from "./ColorSelect";
import SizeSelect from "./SizeSelect";

function AttributesSelect({attributes, setAttributes, sizes, setSizes, error}) {

  return (
    <>
      <div className="flexbox-start full-width">
      
          <Select 
            label="style"
            value={attributes.style} 
            onChange={style => setAttributes({...attributes, style: style})} 
            error={error && !attributes.style}
            data={[{value: "3001", label: "Bella + Canvas Unisex Tee"}]} 
            className="full-width"
          />

        <div className="label">colors</div>
        <ColorSelect attributes={attributes} setAttributes={setAttributes}/>

        <div className="label">sizes</div>
        <SizeSelect sizes={sizes} setSizes={setSizes} sizeOptions={["S", "M", "L", "XL", "2XL", "3XL"]} />
      </div>
    </>
  );
}

export default AttributesSelect;