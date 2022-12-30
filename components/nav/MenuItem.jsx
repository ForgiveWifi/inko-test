import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "../../styles/Nav.module.css"

function MenuItem({isOpen, setIsOpen, name, to}) {

  const router = useRouter()
  
  const variants = {
    open: {
      x: 0,
      opacity: 1,
      transition: {
        y: { stiffness: 1000, velocity: -100 }
      }
    },
    closed: {
      x: 50,
      opacity: 0,
      transition: {
        y: { stiffness: 1000 }
      }
    }
  };
  
  function nav() { 
    setIsOpen(false)
    router.push("heheh")
  }

  return (
    <>
    {
      isOpen &&
      <motion.div
        variants={variants}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <Link href={to}>
          <div className="orange-text">{name}</div>
        </Link>
      </motion.div>
    }
    </>
  );
};

export default MenuItem;