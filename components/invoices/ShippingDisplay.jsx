import { motion } from "framer-motion"
import ShippingBox from "./ShippingBox";
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';

function ShippingDisplay({customerShipping}) {
  return (
    <>
      <div style={{marginTop: 20}}>
        <h2 className=" text-center full-width">Shipping</h2>
        <div className="flexbox-row flex-wrap" style={{gap: 20, marginTop: 15}}>
          <ShippingBox ship_address={{
            name: "inkhouse",
            address:{
              line1: "15708 San Solano Ct",
              city: "Austin",
              state: "TX",
              postal_code: "78738"
            }
          }} />
          
          <motion.div
            animate={{ x: [-5,7,-5] }}
            // exit={{ x: -10}}
            transition={{ duration: 2, repeat: Infinity}}
            className="flexbox">
            <KeyboardDoubleArrowRightIcon sx={{ fontSize: "35px" }} />
          </motion.div>

          <ShippingBox ship_address={customerShipping} />
        </div>
      </div>
    </>
  );
}

export default ShippingDisplay;