import DesignBox from "./DesignBox";

function DesignList({designs}) {

  return (
    <>
      <div className="flexbox-column-start radius10" style={{ margin: "40px 20px 40px"}}>
        <h4>Design List</h4>
        <div className="product-grid full-width">
          {
            designs.map((design, i) => {
              return (
                <DesignBox key={i} design={design}/>
              )
            })
          }
        </div>
      </div>
    </>
  );
}

export default DesignList;