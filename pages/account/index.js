import { useUser, withPageAuthRequired } from '@auth0/nextjs-auth0/client'
import { Button } from "@mantine/core";
import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "../../components/ui/Loading"
import AddressForm from "../../components/profile/AddressForm";
import { showError, showLoading, updateError, updateSuccess } from "../../components/ui/alerts";
import { TextInput } from "@mantine/core";
import isEqual from 'lodash.isequal'
import AccountLayout from '../../layouts/AccountLayout';

function Profile() {

  const profileBlank = {
    first_name: "",
    last_name: "",
    company: ""
  }
  const shippingBlank = {
    line1: "",
    line2: "",
    city: "",
    state: "",
    postal_code: ""
  }

  const { user } = useUser()
  const [profile, setProfile] = useState(profileBlank)
  const [profileRef, setProfileRef] = useState(profileBlank)
  // const [address, setAddress] = useState({})
  const [shipping, setShipping] = useState(shippingBlank)
  const [shippingRef, setShippingRef] = useState(shippingBlank)
  const [loading, setLoading] = useState(false)
  const error = false

  const save = (!isEqual(profile, profileRef) || !isEqual(shipping, shippingRef)) && !loading

  useEffect(() => {
    getProfile()
    async function getProfile() {
      try {
        setLoading(true)
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/account`)
        const {first_name, last_name, company} = res.data.metadata
        const account = {
          first_name: first_name || "",
          last_name: last_name || "",
          company: company || "",
        }
        setProfile(account)
        setProfileRef(account)
        if (res.data.shipping) {
          setShipping(res.data.shipping.address)
          setShippingRef(res.data.shipping.address)
        }
        setLoading(false)
      }
      catch (err) {
        showError("profile", "Server error: profile", "Contact Us!")
      }
    }
  },[])

  async function saveProfile() {
    try {
      showLoading("shipping", null, "Saving...")
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/account`, { 
        // address: address,
        shipping: shipping, 
        metadata: profile
      })
      setProfileRef(profile)
      setShippingRef(shipping)
      updateSuccess("shipping", null, "Changes has been saved!") 
    }
    catch (err) {
      updateError("shipping", null, "Problem saving.  Contact us!") 
    }
  }

  function revert() {
    setProfile(profileRef)
    setShipping(shippingRef)
  }

  return (
    <>
      { loading ? <Loading /> : null}
      {
        user && 
        <div className="flexbox-column" style={{ margin: 40}}>
          <h1>Profile</h1>
          <div className="flexbox-row" style={{ margin: "15px 0px"}}>
            <h5 style={{ marginRight: 15}}>email:</h5>
            <div>{user.email}</div>
          </div>
          <div style={{maxWidth: 250}}>
          
          <TextInput 
            label="first name"
            value={profile.first_name}
            onChange={(e) => setProfile({...profile, first_name: e.currentTarget.value})}
            error={error}
            autoComplete="off"
          />
          <TextInput 
            label="last name"
            value={profile.last_name}
            onChange={(e) => setProfile({...profile, last_name: e.currentTarget.value})}
            error={error}
            autoComplete="off"
          />
          <TextInput
            label="company"
            value={profile.company}
            onChange={(e) => setProfile({...profile, company: e.currentTarget.value})}
            error={error}
            autoComplete="off"
          />
          </div>
          <h2 style={{ marginTop: 30}}>Shipping Address</h2>
          <AddressForm shipping={shipping} setShipping={setShipping} error={error} />
          {/* <h2>Address</h2>
          <AddressForm shipping={address} setShipping={setAddress} error={error} /> */}
          {
            save &&
            <div className="flexbox-row" style={{ marginTop: 20, gap: 10}}>
              <Button onClick={() => revert()}>
                cancel
              </Button>
              <Button onClick={() => saveProfile()} style={{ marginRight: 10}}>
                save
              </Button>
            </div>
          }
        </div>
      }
    </>
  );
}

Profile.PageLayout = AccountLayout

export default withPageAuthRequired(Profile)

