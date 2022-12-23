import { Button } from "@mantine/core";
import DesignBox from "../products/DesignBox";
import HorzDivider from "../ui/HorzDivider";

function TagCard({tag, deleteSize}) {

  const {size, design} = tag
  
  return (
    <>
      <div className="flexbox-row white-border radius5 full-width flex-wrap" style={{ padding: 20}}>
        <DesignBox design={design}/>
        <HorzDivider />
        <div className="flexbox-row full-width">
          <div className="flexbox-column-start">
            <div>{size}</div>
          </div>
          <Button className="margin-left" onClick={() => deleteSize(tag)} >delete</Button>
        </div>
      </div>
    </>
  );
}

export default TagCard;