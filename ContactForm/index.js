import React,{Component, useEffect, useState,useRef } from "react";
import "./index.scss";
import { useTranslation } from "react-i18next";
import Fade from 'react-reveal/Fade';
import Autocomplete from "../../Shared/Autocomplete";
import {useForm} from "react-hook-form";
import { yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import MuiPhoneNumber from 'material-ui-phone-number';
import Box from '@mui/material/Box';
import emailjs from '@emailjs/browser';
import { Result } from "postcss";
// jsx-a11y/anchor-is-valid



const Resultform =()=>{
  return(
    <p style={{color: "rgb(0, 255, 0)",
     
      fontweight: "600",
      textalign: "start"}}>Your message has been successfully sent</p>
  )
}





const schema=yup.object().shape({
  CompanyName:yup.string().required(""),
  Email:yup.string().email().required('Please enter your email'),
  Subject:yup.string().required(''),
  PhoneNumber:yup.number().positive().integer().required(),
  Message:yup.string().required('Please enter your message'),
})



const ContactForm = ({ storedTheme, setStoredTheme, ...rest }) => {
  const { t } = useTranslation();

  

  const setDark = () => {
    setStoredTheme("dark");
    localStorage.setItem("theme", "dark");
    //document.documentElement.setAttribute("data-theme", "dark");
  };

  const setLight = () => {
    setStoredTheme("light");
    localStorage.setItem("theme", "light");
    //document.documentElement.setAttribute("data-theme", "light");
  };

  const toggleTheme = (e) => {
    if (storedTheme === "light") {
      setDark();
    } else {
      setLight();
    }
  };

  useEffect(() => {
    localStorage.setItem("theme", storedTheme);
  }, []);




  const {register, handleSubmit,formState: { errors }}=useForm({
    resolver:yupResolver(schema)
  });


  const submitForm=(data)=>{
  }

   //handle inputs
   const handleCompanyName=(e)=>{
      CompanyName:e.target.value
  }

  const [companyName,setCompanyName]=React.useState('')
  const [email,setEmail]=React.useState('')
  const [subject,setSubject]=React.useState('')
  const [phoneNumber,setPhoneNumber]=React.useState()
  const [message,setMessage]=React.useState('')

  const [countryState, setCountryState] = useState({
    loading: false,
    countries: [],
    errorMessage: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // fetch spinner
        setCountryState({
          ...countryState,
          loading: true,
        });

        //  fetch data
        const dataUrl = `https://restcountries.com/v3.1/all`;
        const response = await axios.get(dataUrl);
        setCountryState({
          ...countryState,
          countries: response.data,
          loading: false,
        });
      } catch (error) {
        setCountryState({
          ...countryState,
          loading: false,
          errorMessage: "Sorry Something went wrong",
        });
      }
    };

    fetchData();
  }, []);
  const { loading, errorMessage, countries } = countryState;
  console.log("loading", loading);
  console.log("countries", countries);
  console.log("errorMessage", errorMessage);

  const [selectedCountry, setSelectedCountry] = useState();
  console.log("selectedCountry", selectedCountry);

  //   find selected country data
  //search selected country
  const searchSelectedCountry = countries.find((obj) => {
    if (obj.name.common === selectedCountry) {
      return true;
    }
    return false;
  });
  console.log("searchSelectedCountry", searchSelectedCountry);





//send form
const[result,showResult]=useState(false);
const form = useRef();

  const sendEmail = (data) => {
    

    emailjs.sendForm('gmail', 'template_l5lixur', form.current, 'JhHD_fnBE7sejB7Zm')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
    
      showResult(true);
  };

// hide result 
setTimeout(() => {
  showResult(false)
}, 5000);



  return (
    <section className={storedTheme} style={
      storedTheme === "dark"
        ? { backgroundColor: "#111111" }
        : { backgroundColor: "#e9e8e8" }
    }>
       <Fade right>
         
    <section className='events' style={
      storedTheme === "dark"
        ? { backgroundColor: "#111111" }
        : { backgroundColor: "#e9e8e8" }
    }>
      <div class={storedTheme} style={
      storedTheme === "dark"
        ? { backgroundColor: "#111111" }
        : { backgroundColor: "#e9e8e8" }
    }>
      <h2>Contact</h2>
      <h2>Contact</h2>
     </div>
    </section>
    </Fade>
    <Fade left>
    <main
      id="contact"
      className={storedTheme} style={
        storedTheme === "dark"
          ? { backgroundColor: "#111111" }
          : { backgroundColor: "#e9e8e8" }
      }
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <div className="row">
              <div className="col-lg-12">
                <h2 className="m-b-10 font-bold text-xl" style={{color:"#009cf7"}}>{t("contact_title")}</h2>

                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3791.7464535536847!2d9.878731869749958!3d37.266874448408515!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12e31fcabaf83cd1%3A0x2e1cd92f29a2fa27!2sFacult%C3%A9%20des%20Sciences%20de%20Bizerte!5e1!3m2!1sfr!2stn!4v1676902109441!5m2!1sfr!2stn" width="600" height="450" style={{border:"0", marginTop:"0px", borderRadius:"10px"}} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>

              </div>
              
              
              
            </div>
          </div>
          <div className="col-lg-5">
            <form ref={form} onSubmit={handleSubmit(sendEmail)} >
              <div className="row ">
                <div className="form-group col-md-6">
                  <label htmlFor="name" style={{color:"#009cf7",fontSize:"18px"}}>{t("company_name")}</label>
                  <input
                    type="text"
                    name="CompanyName"
                    className="form-control required name"
                    placeholder={t("company_name_label")}
                    {...register("CompanyName")}
                    value={companyName}
                    onChange={(e) =>setCompanyName(e.target.value)}
                  />
                  <p className={storedTheme} style={
        storedTheme === "dark"
          ? { color: "#f77700",marginTop:"-20px",fontWeight:"600"  }
          : { color: "red",marginTop:"-20px",fontWeight:"600"  }
      }>{errors.CompanyName && t('errorCampanyName')}
                  
                  </p>
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="email" style={{color:"#009cf7",fontSize:"18px"}}>{t("email")}</label>
                  <input
                    type="email"
                    name="Email"
                    className="form-control required email"
                    placeholder={t("email_label")}
                    {...register("Email")}
                    value={email}
                    onChange={(e) =>setEmail(e.target.value)}
                  />
                  <p className={storedTheme} style={
        storedTheme === "dark"
          ? { color: "#f77700",marginTop:"-20px",fontWeight:"600"  }
          : { color: "red",marginTop:"-20px" ,fontWeight:"600" }
      }>{errors.Email && t('errorEmail')}</p>
                </div>
              </div>

              <div className="form-group mt-n4">
                <label htmlFor="message" style={{color:"#009cf7",fontSize:"18px"}}>{t('subject_label')}</label>
                <input
                  type="text"
                  name="Subject"
                  className="form-control required email"
                  placeholder={t('subject_label')}
                  {...register("Subject")}
                  value={subject}
                    onChange={(e) =>setSubject(e.target.value)}
                />
                <p className={storedTheme} style={
        storedTheme === "dark"
          ? { color: "#f77700",marginTop:"-20px",fontWeight:"600"  }
          : { color: "red",marginTop:"-20px",fontWeight:"600"  }
      }>{errors.Subject && t('errorsubject')}</p>
              </div>


              <div className="form-group mt-n4">
                <label htmlFor="message" style={{color:"#009cf7",fontSize:"18px"}}>{t('phone_label')}</label>
                <input
                  type="text"
                  name="PhoneNumber"
                  className="form-control required email"
                  placeholder={t('phone_label')}
                  {...register("PhoneNumber")}
                  value={phoneNumber}
                    onChange={(e) =>setPhoneNumber(e.target.value)}
                />
               <p className={storedTheme} style={
        storedTheme === "dark"
          ? { color: "#f77700",marginTop:"-20px",fontWeight:"600"  }
          : { color: "red",marginTop:"-20px",fontWeight:"600"  }
      }>{errors.PhoneNumber && t('errortel')}</p>
              </div>
               
              <div className="form-group mt-n4">
                <label htmlFor="message" style={{color:"#009cf7",fontSize:"18px"}}>{t("message")}</label>
                <textarea
                  type="text"
                  name="Message"
                  rows="8"
                  className="form-control required"
                  placeholder={t("message_placeholder")}
                  {...register("Message")}
                  value={message}
                    onChange={(e) =>setMessage(e.target.value)}
                ></textarea>
                <p className={storedTheme} style={
        storedTheme === "dark"
          ? { color: "#f77700",marginTop:"-20px",fontWeight:"600"   }
          : { color: "red",marginTop:"-20px",fontWeight:"600" }
      }>{errors.Message && t('errormsg')}</p>
              </div>
              

              <div className="form-group ">
                <button
                  className="btn btn-light"
                  type="submit"
                  
                  id="form-submit"
                  style={
                    storedTheme === "dark"
                      ? { color: "red !important" }
                      : { color: "blue !important" }
                  }
                >
                  {t("send_message")}
                </button>
              </div>

              <div className="row">
                {result ? <Resultform/>: null}
              </div>
              
            </form>
          </div>
        </div>
      </div>
    </main>
    </Fade>
    </section>
  );
};

export default ContactForm ;
