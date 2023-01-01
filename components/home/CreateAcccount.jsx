import Link from "next/link";

function CreateAccount() {
  return (
    <>
      <div className="flexbox-column full-width background1 radius15 " style={{ maxWidth: 700, margin: 100, padding: 50, gap:10 }}>
        <h1>Get started now!</h1>
        <a href="/api/auth/login" className="orange-button text-center link" style={{ borderRadius: 20}}>
          Create an account
        </a>
      </div>
    </>
  );
}

export default CreateAccount;