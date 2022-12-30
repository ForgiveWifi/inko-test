import Link from "next/link";
import styles from "../../styles/Home.module.css"

function LoginButton() {
  
  return (
    <>
      <Link href="/api/auth/logout" className={`${styles["log-button"]} link`}>
        logout
      </Link>
    </>
  );
}

export default LoginButton;