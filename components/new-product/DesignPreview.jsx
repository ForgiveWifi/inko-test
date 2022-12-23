import SizeList from "./SizeList";

function DesignPreview({ details, attributes, sizes}) {

  const {name, description} = details
  const {style, color} = attributes

  return (
    <div
      className="flexbox-column full-width background1 radius10"
      style={{ maxWidth: "400px", padding: "15px", paddingTop: "10px" }}
    >
      
      <div id="output"></div>

      <div className="flexbox-column">
        <h4>Name</h4>
        {
          name &&
          <div className="background1 max-radius" style={{padding: "4px 12px", margin: "2px 5px 0px"}}>{name}</div>
        }
      </div>

      <div className="flexbox-column full-width">
        {description && <h4>Description</h4>}
        {
          description && 
          <div className="flexbox background1 max-radius" style={{padding: "4px 12px", margin: "2px 5px 0px" }}>
            {description}
          </div>
        }
      </div>

      <h4>Style</h4>
      {
        style && 
        <div className="background1 max-radius" style={{padding: "4px 12px", margin: "3px"}}>
          {style}
        </div>
      }

      <h4>Color</h4>

      <h4> Sizes</h4>
      {sizes && <SizeList sizes={sizes} />}

    </div>
  );
}

export default DesignPreview;