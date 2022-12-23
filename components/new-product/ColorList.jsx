
function ColorList({colors}) {
  return (
    <>
      <div className="flexbox-row flex-wrap full-width" style={{ justifyContent: "center"}}>
        {
          colors.map((color,i) => {
            return(
              <div 
                key={i}
                className="max-radius" 
                style={{ margin: "5px", backgroundColor: color, width: "40px", height: "40px", border: "none"}}
              >
              </div>
            )
          } 
        }
      </div>
    </>
  );
}

export default ColorList;