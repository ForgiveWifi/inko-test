import Link from "next/link";

function CreateAccount() {
  return (
    <>
      <div className="flexbox-column full-width background1 radius15 " style={{ maxWidth: 860, margin: "80px 0px", padding: 40, gap:10 }}>
        <h1 className="text-center">Get started now!</h1>
        <a href="/api/auth/login" className="flexbox white-background orange-text text-center link" style={{ borderRadius: 40, padding: "5px 20px"}}>
          Create an account
        </a>
      </div>
    </>
  );
}

export default CreateAccount;