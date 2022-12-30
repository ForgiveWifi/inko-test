import Link from "next/link";
import styles from "../../styles/Home.module.css"


function LoginButton() {
  
  return (
    <>
      <Link href="/api/auth/login" className={`${styles["log-button"]} link`}>
        login
      </Link>
    </>
  );
}

export default LoginButton;