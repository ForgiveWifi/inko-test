import styles from "../../styles/Home.module.css"

function LoginButton() {
  
  return (
    <>
      <a href="/api/auth/logout" className={`${styles["log-button"]} link`}>
        logout
      </a>
    </>
  );
}

export default LoginButton;