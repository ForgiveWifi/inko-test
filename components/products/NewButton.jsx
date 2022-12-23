import { motion } from "framer-motion"
import Router from "next/router";
import AddIcon from '@mui/icons-material/Add';

function NewButton() {
  return (
    <>
      <motion.button 
        whileHover={{ scale: 1.04 }}
        transition={{ duration: 0.1 }}
        onClick={() => Router.push("/account/products/new")} 
        className="flexbox radius10 shadow2 white-background white-border margin-auto" 
        style={{ width: 250, height: "100%", padding: 10 }}>
        <div className="flexbox-column">
          <AddIcon style={{ fontSize: 30, fill: "rgba(107, 116, 130, 0.75)"}}/>
          <h4 className="grey-text">Create product</h4>
        </div>
      </motion.button>
    </>
  );
}

export default NewButton;