import { motion } from "framer-motion"
import { useState } from "react";
import LogoutButton from "../ui/LoginButton";
import MenuButton from "./MenuButton";
import MenuItem from "./MenuItem";
import styles from "../../styles/Nav.module.css"

function MenuIcon() {
  
  const [isOpen, setIsOpen] = useState(false)

  const navList = [
    {
      name: "profile",
      to: "/account"
    },
    {
      name: "products",
      to: "/account/products/?page=1"
    },
    {
      name: "invoices",
      to: "/account/invoices"
    },
    {
      name: "tags",
      to: "/account/tags"
    },
  ]

  const sidebar = {
    open: {
      clipPath: `circle(1400px at 210px 38px)`,
      transition: {
        delay: 0.2,
        type: "spring",
        stiffness: 20,
        restDelta: 2
      }
    },
    closed: {
      clipPath: "circle(28px at 210px 38px)",
      transition: {
        delay: 0.2,
        type: "spring",
        stiffness: 400,
        damping: 40
      }
    }
  };

  const variants = {
    open: {
      transition: { staggerChildren: 0.07, delayChildren: 0.1 }
    },
    closed: {
      transition: { staggerChildren: 0.05, staggerDirection: -1 }
    }
  };
  
  return (
    <>
      <motion.nav
        initial={false}
        animate={isOpen ? "open" : "closed"}
        className="flexbox"
      >
      <motion.div className={`${styles["menu-background"]} shadow1`} variants={sidebar} />
      <motion.ul variants={variants} className={`${styles["menu-list"]} flexbox-column`} >
        {
          navList.map((item, i) => {
            const {name, to} = item
            return(
              <MenuItem key={i} isOpen={isOpen} setIsOpen={setIsOpen} name={name} to={to}/>
            )
          })
        }
        {/* <LogoutButton /> */}
      </motion.ul>

      <MenuButton isOpen={isOpen} setIsOpen={setIsOpen}/>
    </motion.nav>
    </>
  );
}



export default MenuIcon;