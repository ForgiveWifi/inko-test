import NavLinks from "./NavLinks";
import Link from "next/link";
import Logo from "../ui/Logo";

function Navbar() {
  return (
    <>
      <nav className="flexbox-row full-width" style={{ marginTop: "15px"}}>
        <Link href="/" className='flexbox link'>
          <Logo />
        </Link>
        <div className="margin-left">
          <NavLinks />
        </div>
      </nav>
    </>
  )
}

export default Navbar 