import { motion } from "framer-motion"
import Image from "next/image";

function HomeProducts() {
  const productlist = [
    {
      name:"Bella + Canvas",
      src: "/BellaCanvas_3001_White_04.jpg",
      alt: "Bella Canvas 3001 White",
      position: "0px -30px",
      link: "https://www.bellacanvas.com/product/3001/Unisex-Jersey-Short-Sleeve-Tee.html"
    },
    // {
    //   name: "Hoodies",
    //   src: "3719_Vintage-White_SF21_04.jpg",
    //   alt: "3719 Vintage White SF21",
    //   position: "0px -45px"
    // },
    // {
    //   name: "Tank Tops",
    //   src: "3480_Athletic-Heather_SPSU22D2_04.jpg",
    //   alt: "3480 Athletic-Heather SPSU22D2",
    //   position: "0px -20px"
    // }
  ]
  
  return (
    <>
      <div className="flexbox-column" style={{ marginTop: "50px"}}>
      
        <motion.h2 
          initial={{ x: 40, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          viewport={{ once: true }}
          style={{ maxWidth: "830px", marginBottom: "20px" }}>
          Products 
        </motion.h2>

        <div className="flexbox-row flex-wrap" style={{ justifyContent: "center", padding: "0px 15px", columnGap: "40px", rowGap: "15px", marginBottom: "30px"}}>
          {
            productlist.map(({name, src, alt, position, link}) => {
              return(
                <motion.a
                  href={link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  initial={{ scale: 0.95, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.7, delay: 0.3 }}
                  viewport={{ once: true }}
                  className="flexbox-column link"
                >
                  <h5 style={{ height: 25 }}>{name.toUpperCase()}</h5> 
                  <motion.div
                    whileHover={{ scale: 1.02}}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div style={{ position: "relative"}}> 
                      <div className="radius15" style={{ width: 250, height: 250, backgroundColor: "white", top: 0}}></div> 
                      <motion.div whileHover={{ opacity: 0.8}}>
                        <Image src={src} alt={alt} width={250} height={250} className="radius15" style={{ position: "absolute", top: 0, objectFit: "cover", objectPosition: position}} />
                      </motion.div>
                    </div>
                  </motion.div>
                </motion.a>
              )
            })
          }
        </div>
      </div>
    </>
  );
}

export default HomeProducts;