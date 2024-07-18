import React, { useState, useEffect, useContext } from 'react'
import EventcardVar2 from '../../components/events/EventcardVar2.jsx';
import { Link, useParams } from 'react-router-dom';
import { BASE_URL } from '../../constants/urls.js';
import useFetch from "../../hooks/useFetch.js";
import { ModalContext } from '../../context/modal.jsx';
import ListViewEventcard from '../../components/events/ListViewEventcard.jsx';
import sampleImage from "../../assets/images/eventSample/sampleImage.png"
import bgImage from "../../assets/images/eventSample/backgroundProshows.png"
import bgImagev1 from "../../assets/images/eventSample/background.png"
import { Button } from 'primereact/button';
import Eventcard from '../../components/events/Eventcard.jsx';
import Majorcard from '../../components/events/MajorCard.jsx';
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../services/firebase";
import merchBg from "../../assets/images/categoryBackgrounds/cert.jpg"
import "../../index.css";
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { LoaderContext } from '../../context/loader.jsx';
import Certificate from '../../services/certificates.jsx';
import participantCert from "../../assets/images/certs/participant.jpg"
import coordinatorCert from "../../assets/images/certs/coordinator.jpg"
import achievementCert from "../../assets/images/certs/achievement.jpg"
import { dataset1 } from "./data.js";
import { dataset2 } from "./data.js";
import { dataset3 } from "./data.js";

function isEmail(email) {
  const regex = /^\S+@\S+\.\S+$/;
  return regex.test(email);
}



export const FIRST = "FIRST";
export const SECOND = "SECOND";
export const THIRD = "THIRD";
export const PARTICIPANT = "PARTICIPANT";
export const COORDINATOR = "COORDINATOR";
export const VOLUNTEER = "VOLUNTEER";


export function templateSelector(type) {
  if (type === FIRST || type === SECOND || type === THIRD) {
    return achievementCert;
  }
  if (type === COORDINATOR) return coordinatorCert;
  if (type === VOLUNTEER) return coordinatorCert;
  else return participantCert;
}
export function nameCoordinates(type) {
  if (type === FIRST || type === SECOND || type === THIRD) {
    return [2200, 1150];
  }
  if (type === COORDINATOR) return [800, 1150];
  if (type === VOLUNTEER) return [800, 1150];
  else return [350, 1090];
}

export function eventCoordinates(type) {
  if (type === FIRST || type === SECOND || type === THIRD) {
    return [100, 100];
  }
  if (type === COORDINATOR) return [1160, 1458];
  if (type === VOLUNTEER) return [1160, 1458];
  else return [100, 100];
}


const CertficateListView = () => {
  const { setLoader } = useContext(LoaderContext);
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState("");
  const showDialog = () => {
    setVisible(true);
  };
  useEffect(() => {
    if (!email.length)
      showDialog();
  }, [])
  const hideDialog = () => {
    setVisible(false);
  };
  const [certs, setCerts] = useState([]);

  const fetchPost = async () => {
    for(let data of dataset1){
      if(data.email === email){
        setCerts(prevCerts=>[...prevCerts,data])
        localStorage.setItem(data.id,JSON.stringify(data))
      }
    }
    for(let data of dataset2){
      if(data.email === email){
        setCerts(prevCerts=>[...prevCerts,data])
        localStorage.setItem(data.id,JSON.stringify(data))
      }
    }
    for(let data of dataset3){
      if(data.email === email){
        setCerts(prevCerts=>[...prevCerts,data])
        localStorage.setItem(data.id,JSON.stringify(data))
      }
    }
//    await getDocs(query(collection(db, "certificates"), where("email", "==", email)))
//      .then((querySnapshot) => {
//        const newData = querySnapshot.docs
//          .map((doc) => ({ ...doc.data(), id: doc.id }));
//        setCerts(newData);
//        const now = Date.now();
//        if (newData.length > 0) {
//          localStorage.setItem("LAST_UPDATE", JSON.stringify(now))
//          localStorage.setItem("LIST", JSON.stringify(newData))
//          localStorage.setItem("EMAIL", email)
//          console.log(certs, newData);
//        }
//      })

  }




  const shadowColor = { lex: "#00100E", leo: "#000", loki: "#e2cbad" };







  const fileteredEvents = [];

  return (
    <div className="w-full bg-bg   flex flex-col">

      <Dialog
        visible={visible}
        className="min-w-[40%] w-full md:w-[40%]"
        onHide={hideDialog}
      >

        <form>
          <InputText
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            type="email"
            required
            className="p-inputtext w-full my-4"
            placeholder="Email ID"
          />
          <div className="flex justify-end text-lg ">
            <button
              type="submit"
              onClick={(e) => {
                // 
                if (isEmail(email)) {
                  e.preventDefault();
                  setLoader(true);
                  const currentTime = Date.now();
                  fetchPost().then((res) => {
                    // console.log("done");
                    setLoader(false);
                    console.log("Here");


                  })



                  hideDialog();
                }


              }}
              className="text-center  font-Germanists bg-gray-500 hover:bg-black transition-all rounded font-bold  text-general px-4  py-2"

            >
              Submit
            </button>
          </div>
        </form>
      </Dialog>
      <div
        className="grid place-items-center   w-full relative"
      >
        <div
          className="pt-[220px]  w-full h-full relative"
        >
          <div className="z-20 flex justify-center items-center h-full">
            <div>
              <p className="text-general text-center text-6xl md:text-8xl  uppercase font-anton z-10 ">
                CERTIFICATES
              </p>
              <div className=" w-full my-2 left-0 flex items-cneter justify-center">
                {/* <div className="w-full bg-white px-5 md:py-1 rounded-xl flex items-center">
                  <p className="pi pi-search"></p>
                  <input
                    onChange={(e) => setSearch(e.target.value)}
                    className=" ml-3 w-full py-1 md:py-2 text-lg outline-none"
                    placeholder="Search"
                  />
                </div> */}
              </div>
            </div>
          </div>
        </div>
        {/* <img src={bg} className='page-header absolute top-0 left-0 h-full w-full z-0 opacity-[0.4] object-cover' /> */}
      </div>

      <div className="grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 w-full px-4 md:px-5 mt-20">
        {certs.map((item, index) => {
          return (
            <button onClick={(e)=>{
              handleDownload();
            }} className=' hover:transalate-x-[15px] transform duration-500 hover:-translate-y-2'>
              <Certificate
                imageUrl={templateSelector(item.type)}
                text={item.name}
                nameCoordinates={nameCoordinates(item.type)}
                event={item.event}
                type={item.type}
                eventCoordinates={eventCoordinates(item.type)}
                collegeName={item.college}
                id={item.id}
              />
              <p className='border-b uppercase  p-1   text-center text-white  font-mono'>{item.event}:{item.type}</p>
            </button>

          );
        })}
        {!certs.length && (
          <div className="text-center text-red-500 p-2 border border-red-500">
            <p>No Certicates !</p>
          </div>
        )}
      </div>
    </div>
  );


}

export default CertficateListView