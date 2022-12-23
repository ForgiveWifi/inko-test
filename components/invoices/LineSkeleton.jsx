import Divider from "../ui/Divider";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

function ProductSkeleton({count}) {
  return (
    Array(count).fill(0).map((_,i) => {
      return(
        <div key={i} className="flexbox-row flex-wrap full-width background1 radius15 white-border shadow2" style={{ padding: "15px" }}>

          <Skeleton style={{borderRadius: 10, width: "150px", height: "150px", marginRight: "15px", position: "relative", bottom: "2px" }} />

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