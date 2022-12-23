import Divider from "../ui/Divider";

function SizeList({sizes}) {
  return (
    <>
      <div className="flexbox-row radius15 flex-wrap" style={{ gap: 5, margin: "8px 0px"}} > 
        {
          sizes.map((size,i) => {
            return <b className="flexbox white-border radius10" style={{ border: '2px solid white', width: 50 }}>{size}</b>
          })
        }
      </div>
    </>
  );
}

export default SizeList;