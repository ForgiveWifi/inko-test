import Divider from "../ui/Divider";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

function ProductSkeleton({count}) {
  return (
    Array(count).fill(0).map((_,i) => {
      return(
        <div key={i} className="flexbox-row flex-wrap full-width background1 radius15 shadow2" style={{ margin: "5px 0px", padding: "0px 10px", height: "100px" }}>

          <Skeleton style={{ width: "80px", height: "80px", marginRight: "15px", position: "relative", bottom: "2px" }} />

          <div className="flexbox-column">

            <Skeleton className="radius5" style={{ width: "161px", height: "20px", marginBottom: "5px" }} />

            <div className="flexbox-row">
              <Skeleton className="radius5" style={{ width: "100px" }} />
              <Divider />
              <Skeleton className="radius5" style={{ width: "40px" }} />
            </div>

          </div>

          <div className="no-wrap" style={{ marginLeft: "auto", marginRight: "5px" }}>
            <Skeleton className="radius5" style={{ width: "110px", height: "20px", position: "relative", bottom: "6px" }} />
          </div>

        </div>
      )
    })
  );
}

export default ProductSkeleton;