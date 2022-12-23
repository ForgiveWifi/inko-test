import Navbar from "../components/nav/Navbar"
import Footer from "../components/nav/Footer"

function PageLayout({children}) {
  return (
    <>
      <div className="page-background orange-background flexbox-column">
        <div className="page-content flexbox-column full-width">
          <Navbar />
          { children }
        </div>
      </div>
      <Footer />
    </>
  );
}

export default PageLayout;