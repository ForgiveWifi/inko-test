import { motion } from "framer-motion"

const variations = {
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

function LogoutButton({isOpen}) {
  
  return (
    <>
    { isOpen ?
      <motion.a 
        href="/api/auth/logout"
        variants={variations}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="orange-text text-center link"
        style={{cursor: isOpen ? "pointer" : "auto", border: "4px solid #FF9244", padding: "5px 20px", borderRadius: 20, marginTop: 5, fontSize: 18}}
        disabled={!isOpen}
      >
        logout
      </motion.a> : null }
    </>
  );
}

export default LogoutButton;