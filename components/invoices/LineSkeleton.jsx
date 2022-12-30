import Divider from "../ui/Divider";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

function ProductSkeleton({count}) {
  return (
    Array(count).fill(0).map((_,i) => {
      return(
        <div key={i} className="flexbox-row flex-wrap full-width background1 radius15 white-border shadow2" style={{ padding: "15px" }}>

          <div style={{ width: 150, height: 150, marginRight: "15px", position: "relative", bottom: "5px" }}>
            <Skeleton style={{ borderRadius: 10, width: 150, height: 150}} />
          </div>
          
          <div className="flexbox-column-start" style={{gap: 5}}>
            <Skeleton className="radius5" style={{ width: "161px", height: "20px", marginBottom: "5px" }} />
            <SkeletonLine />
            <SkeletonLine />
            <SkeletonLine />
          </div>

          <div className="margin-left no-wrap" style={{ marginTop: "auto", marginRight: "5px", position: "relative", bottom: "6px" }}>
            <Skeleton className="radius5" style={{ width: "70px", height: "20px" }} />
          </div>

        </div>
      )
    })
  );
}

function SkeletonLine() {
  return(
    <Skeleton className="radius5" style={{ width: "120px" }} />
  )
}

export default ProductSkeleton;