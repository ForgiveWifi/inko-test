import Image from "next/image";

function Logo() {
  return (
    <>
      <Image src="/inkhouse-white.png" alt="Inkhouse Logo" width={135} height={40}/>
    </>
  );
}

export default Logo;