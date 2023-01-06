import Image from "next/image";

function Logo() {
  return (
    <>
      <div className="flexbox" style={{ position: "relative", width: 200, height: 40 }}>
        <Image src="/inko-studio-logo.png" alt="Inkhouse Logo" fill={true} style={{ objectFit: "contain", filter: "invert(1)" }}/>
      </div>
    </>
  );
}

export default Logo;