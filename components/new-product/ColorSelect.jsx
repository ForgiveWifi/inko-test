import { Tooltip } from '@mantine/core';
import { colors } from "../data/old-colors";
import { HiCheck } from "react-icons/hi"

function ColorSelect({ attributes, setAttributes}) {
  return (
    <>
      <div className="flexbox-row flex-wrap full-width" style={{ justifyContent: "center"}}>
        {
          colors.map((color,i) => {
            
            const selected = color.value === attributes.color.value

            const {value, hex, light} = color

            return(
              <>
                <Tooltip label={value}>
                  <button 
                    key={i}
                    onClick={() => setAttributes({...attributes, color: color})} 
                    className="flexbox shadow2" 
                    style={{ borderRadius: 20, margin: "5px", backgroundColor: hex, width: 40, height: 40, outline: !selected ? "none" : light ? "3px solid black" : "3px solid white" }}
                  >
                    { selected && <HiCheck key={i} style={{ fontSize: 25, fill: light ? "black" : "white"}} />}
                  </button>
                </Tooltip>
              </>
            )
          })
        }
      </div>
    </>
  );
}
export default ColorSelect;