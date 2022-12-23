import styles from "../../styles/Home.module.css"


function LoginButton() {
  
  return (
    <>
      <a href="/api/auth/login" className={`${styles["log-button"]} link`}>
        login
      </a>
    </>
  );
}

export default LoginButton;