import { useRef, useState } from 'react';
import { motion } from "framer-motion"
import emailjs from '@emailjs/browser';
import InputField from "./InputField"
import PhoneNumber from './PhoneNumber';
import { Input, Button } from '@mantine/core';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { showLoading, updateError, updateSuccess } from '../ui/alerts';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import Logo from '../ui/Logo';
import styles from "../../styles/Home.module.css"

export default function ContactForm() {

  const [cooldown, setCooldown] = useState(false)
  const form = useRef();
  const phoneInput = useRef(null)

  const sendEmail = (e) => {
    if (!cooldown) {
      e.preventDefault()
      showLoading("order-form", "Sumbitting form, please wait...")
      setCooldown(true)
      setTimeout(() => setCooldown(false),5000)
      emailjs.sendForm(process.env.EMAIL_SERVICE_ID, process.env.EMAIL_TEMPLATE_ID, form.current, process.env.EMAIL_PUBLIC_KEY)
        .then(() => {
          updateSuccess("order-form", 'Thank you! We will contact you shortly.')
          form.current.reset()
          phoneInput.current.clearInput()
        })
        .catch(() => {
          updateError("order-form", "We ran into a problem submitting your form. Please contact us!")
        });
    } else {
      e.preventDefault()
    }
  }

  return (
    <>
      <div className='flexbox-column full-width'>
        <motion.div 
          initial={{ y: 50, opacity: 0}}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3}}
          viewport={{ once: true }}
          className='background1 shadow2' 
          style={{ height: "190px", position: "relative", top: "40px", borderRadius: "30px", padding: "0px 20px"}}
        >
          <div className='flexbox-column' style={{ marginTop: "15px"}}>
            <h1 style={{ fontSize: "40px"}}>Get a Quote</h1>
            <p className="text-center" style={{ maxWidth: "250px", marginLeft: "3px" }}>Leave your details and we will contact you as soon as we can.</p>
          </div>
        </motion.div>

        <section className="flexbox full-width shadow1" style={{ maxWidth: "500px", backgroundColor: "white", borderRadius: "25px", padding: "25px", zIndex: "2"}}>

          <form ref={form} onSubmit={sendEmail} className="form-grid full-width" autoComplete="off" style={{ maxWidth: 400}}>
            {/* <div className='flexbox span2' style={{ marginBottom: "20px"}}>
              <Logo />
            </div> */}
            {/* <div className='flexbox-column span2'>
              <h1 className="orange-text" style={{ fontSize: "40px"}}>Get a Quote</h1>
              <p className="orange-text text-center" style={{ maxWidth: "600px", marginLeft: "3px" }}>Leave your details and we will contact you as soon as we can.</p>
            </div> */}
            <InputField name="name" type="text" required={true}/>
            <InputField name="brand" type="text" />
            <InputField name="email" type="email" className="span2" required={true}/>
            <PhoneNumber ref={phoneInput} />
            <InputField name="quantity" type="number" min={0} />

            <div className="flexbox-column-start" style={{ color: "rgba(0, 0, 0, 0.6)", fontSize: "104px" }}>
              <label className='label'>budget</label>
              <Input
                icon={<AttachMoneyIcon style={{ fill: "rgba(0, 0, 0, 0.6)", marginLeft: "2px"}}/>} 
                iconWidth={25}
                variant="unstyled"
                className={styles["input-field"]}
                style={{ paddingTop: 1}}
                name="budget" 
                type="number" 
                min={0}
              />
            </div>

            <div className='flexbox-column span2'>
              <div style={{ position: "relative", top: "5px", fontSize: "25px", fontWeight: "500", color: "#FF9244" }}>additional details</div>
              <textarea name="details" className={styles["text-area"]}/>
            </div>

            <div className='flexbox-row span2' style={{ marginTop: 10}}>
              <Button name="sumbit-button" className="flexbox-row orange-button" type="submit" style={{ backgroundColor: "#FF9244", padding: "0px 10px"}}>
                <MailOutlineIcon style={{ fontSize: 20, marginRight: 5}} />
                SEND
              </Button>
            </div>

          </form>

        </section>
      </div>
    </>
  )
}