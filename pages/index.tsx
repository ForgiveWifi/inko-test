import HomePage from "../components/home-page/HomePage"
import Production from "../components/home-page/Production"
import Design from "../components/home-page/Design"
import HomeProducts from "../components/home-page/HomeProducts"
import ContactForm from "../components/home-page/ContactForm"
import ScrollButton from "../components/home-page/ScrollButton"

export default function Home() {
  return (
    <> 
      <HomePage />
      <Production />
      <Design />
      <HomeProducts />
      <ContactForm />
      <ScrollButton /> 
    </>
  )
}
