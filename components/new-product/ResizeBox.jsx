
function ResizeBox({light}) {
  return (
    <div className="flexbox" style={{ width: 20, height: 20}}>
      <div style={{ width: 8, height: 8, backgroundColor: light ? "white" : "black", border: `1px solid ${light ? "black" : "white"}`}}></div>
    </div>
  );
}

export default ResizeBox;