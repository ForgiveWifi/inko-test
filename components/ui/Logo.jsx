import Image from "next/image";

function Logo() {
  return (
    <>
      <div className="flexbox" style={{ position: "relative", width: 150, height: 50 }}>
        <Image src="/inkhouse-white.png" alt="Inkhouse Logo" fill={true} style={{ objectFit: "contain" }}/>
      </div>
    </>
  );
}

export default Logo;