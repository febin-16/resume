import { useState } from "react";
import Papa from 'papaparse';
import { db } from "../../services/firebase";
import { v4 as uuidv4 } from 'uuid';

/*import { doc, setDoc } from "firebase/firestore";
import { collection, getDocs, query, where } from "firebase/firestore";

export default function CertGen() {
    const [data, setData] = useState([]);

    function handleFileSelect(event) {
        const file = event.target.files[0];
        parseCSV(file);
    }

    function parseCSV(file) {
        // console.log(file);
        let i=0;
        Papa.parse(file, {
            header: true,
            complete: function (results) {
                setData(results.data);
                results.data.map((item) => {
                    // if (!fetchPost(item.email,item.event,item.type,item.college))
                    setDoc(doc(db, "certificates", uuidv4()), item).then((e) => {
                        console.log(`${i}/${results.data.length}`);
                        i+=1;
                    });
                })


                // console.log(results.data);
            }
        });
    }
    return (
        <div className="bg-white h-screen w-screen flex justify-center items-center">
            <input type="file" onChange={handleFileSelect} className="bg-blue-500 p-4 text-white rounded-md btns " />
        </div>
    )
}*/
import React from 'react'

function CertGen(){
  return (
    <div></div>
  )
}

export default CertGen
