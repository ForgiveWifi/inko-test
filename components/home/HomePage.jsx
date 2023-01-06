import { motion } from "framer-motion"
import Image from "next/image";
import { useMediaQuery } from '@mantine/hooks';

function HomePage() {

  const desktop = useMediaQuery('(max-width: 940px)')
  const tablet = useMediaQuery('(min-width: 470px)')

  return (
    <>
      <div className="flexbox-column full-width" style={{ minHeight: "calc(100vh - 50px)"}}>
        <motion.div 
          initial={{ y: 30, scale: 0.95, opacity: 0 }}
          whileInView={{ y: 0, scale: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          viewport={{ once: true }}
          className={`${desktop ? "flexbox-column" : "flexbox-row"} flex-wrap full-width`}
          style={{ maxWidth: 1000, marginBottom: 120, marginTop: 20 }}
        > 
          <div className="full-width" style={{ maxWidth: 330, marginBottom: desktop ? 0 : 50}}>
            <div className={desktop ? "flexbox-column margin-auto full-width" : ""} style={{ position: desktop ? "" : "relative", right: desktop ? "" : "18px", marginBottom: "15px", marginTop: desktop ? 10 : 0 }}> 
              <h1 style={{ lineHeight: "50px", marginTop: "25px", marginLeft: desktop ? "0px" : "16px"}}>
                inko studios
              </h1>
              <h2 className="rainbow flexbox no-wrap text-center max-radius shadow2" style={{ width: "350px", height: "45px", padding: "0px 10px", fontWeight: "500", fontSize: 26, marginTop: "8px"}}>a merchandise agency</h2>
            </div>
            <div className={desktop ? "text-center" : ""} style={{ maxWidth: 400}}>
              Our company provides manufacturing and design services for merchandise.  Turn your ideas into custom apparel for your brand, company, groups, or events.
            </div>
          </div>

          <div className="full-width flex-wrap" style={{ maxWidth: 550, display: 'grid', gridTemplateColumns: "1fr 1fr", gap: 20, marginLeft: desktop ? 0 : "auto"}}>
            <div style={{position: 'relative', top: "33%"}}>
              <img src="BellaCanvas_3001_ChangeColor_03.jpg" alt="Bella Canvas 3001 White" className="orange-shadow full-width"/>
            </div>

            <div className="flexbox" style={{ paddingRight: "15%", marginTop: "auto"}}>
              <img src="BellaCanvas_3001_ChangeColor_01.jpg" alt="BellaCanvas 3001 Purple" className="orange-shadow full-width"/>
            </div>

            <div></div>

            <div className="margin-left">
              <img 
                src="3501_Citron_3513_Grey-Triblend_3501CVC_Athletic-Heather_SPSU22D4_Split_03.jpg" 
                alt="3501 Citron, 3513 Grey-Triblend, 3501CVC Athletic-Heather" 
                className="orange-shadow full-width"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
}

export default HomePage;