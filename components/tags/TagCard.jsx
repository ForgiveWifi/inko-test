import { Button } from "@mantine/core";
import { useState } from "react";
import DesignBox from "../products/DesignBox";
import HorzDivider from "../ui/HorzDivider";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import TagDisplay from "./TagDisplay";
import DeleteButton from "../ui/DeleteButton";
import Divider from "../ui/Divider";

function TagCard({tag, select}) {

  const {size, design, pallet} = tag

  return (
    <>
      <div className="flexbox-column white-border radius10 full-width flex-wrap" style={{ padding: 10 }}>
       
        <div className="flexbox-row full-width">
          <div className="flexbox-row">
            <h3 style={{marginLeft: 8}}>{size}</h3>
            <Divider />
            <h5>{pallet}</h5>
          </div>
          <DeleteButton onClick={select}/>
        </div> 
        <HorzDivider margin="10px 0px" />
        <TagDisplay design={design} />
      </div>
    </>
  );
}

export default TagCard;