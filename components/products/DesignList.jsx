import DesignBox from "./DesignBox";

function DesignList({designs}) {
  return (
    <>
      {/* <div className="flexbox-column"> */}
        <h4 style={{ marginBottom: 10}}>Design List</h4>
        <div className="product-grid" style={{}}>
          {
            designs.map((design, i) => {
              return (
                <DesignBox key={i} design={design}/>
              )
            })
          }
          {designs.length === 1 ? <div></div> : null}
        </div>
      {/* </div> */}
    </>
  );
}

export default DesignList;