import { motion } from "framer-motion"
import Image from "./Image";
import { useMediaQuery } from '@mantine/hooks';

function HomePage() {

  const desktop = useMediaQuery('(max-width: 940px)')
  const tablet = useMediaQuery('(min-width: 470px)')

  return (
    <>
      <div className="flexbox full-width" style={{ minHeight: "calc(100vh - 38px)"}}>
      <motion.div 
        initial={{ y: 30, scale: 0.95, opacity: 0 }}
        whileInView={{ y: 0, scale: 1, opacity: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
        viewport={{ once: true }}
        className={`${desktop ? "flexbox-column" : "flexbox-row"} flex-wrap full-width`}
        style={{ maxWidth: 1000, marginBottom: 100 }}
      > 
        <div className="full-width" style={{ maxWidth: 330, marginBottom: desktop ? 0 : 50}}>
          <div className={desktop ? "flexbox-column margin-auto full-width" : ""} style={{ position: desktop ? "" : "relative", right: desktop ? "" : "18px", marginBottom: "15px", marginTop: desktop ? 50 : 0 }}> 
            <h1 style={{ lineHeight: "40px", marginTop: "25px", marginLeft: desktop ? "0px" : "16px"}}>
              inkhouse
            </h1>
            <h2 className="rainbow flexbox no-wrap text-center max-radius shadow2" style={{ width: "350px", height: "45px", padding: "0px 10px", fontWeight: "500", fontSize: 26, marginTop: "8px"}}>a merchandise agency</h2>
          </div>
          <div className={desktop ? "text-center" : ""} style={{ maxWidth: 400}}>
            Our company provides manufacturing and design services for apparel.  Turn your ideas into custom merchandise for your brand, company, groups, or events.
          </div>
        </div>

        <div className="flexbox-row-start full-width flex-wrap" style={{ maxWidth: 550, marginLeft: desktop ? 0 : "auto"}}>
          <div style={{position: 'relative', top: tablet ? 100 : desktop ? 70 : 140, width: "50%"}}>
            <Image file="BellaCanvas_3001_ChangeColor_03.jpg" alt="Bella Canvas 3001 White" width="100%" />
          </div>

          <div className="flexbox" style={{ width: "40%", margin: "auto 0px 4% 4%"}}>
            <Image file="BellaCanvas_3001_ChangeColor_01.jpg" alt="BellaCanvas 3001 Purple" width="100%" />
          </div>

          <div className="margin-left" style={{ width: "46%" }}>
            <Image 
              file="3501_Citron_3513_Grey-Triblend_3501CVC_Athletic-Heather_SPSU22D4_Split_03.jpg" 
              alt="3501 Citron, 3513 Grey-Triblend, 3501CVC Athletic-Heather" 
              width="100%" 
            />
          </div>
        </div>
      </motion.div>
      </div>
    </>
  );
}

export default HomePage;