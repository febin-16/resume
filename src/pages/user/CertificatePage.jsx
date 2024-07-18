import Certificate from "../../services/certificates";
//import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../services/firebase";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import participantCert from "../../assets/images/certs/participant.jpg";
import coordinatorCert from "../../assets/images/certs/coordinator.jpg";
import achievementCert from "../../assets/images/certs/achievement.jpg";
import {
  eventCoordinates,
  nameCoordinates,
  templateSelector,
} from "./CertificateListView";

export default function CertificatePage(params) {
  const [certs, setCerts] = useState([]);
  const certID = useParams().certID;
  const fetchPost = async () => {
    await getDocs(query(collection(db, "certificates"), certID)).then(
      (querySnapshot) => {
        for (let doc of querySnapshot.docs) {
          if (doc.id === certID) {
            setCerts([{ ...doc.data(), id: doc.id }]);
            localStorage.setItem(
              doc.id,
              JSON.stringify([{ ...doc.data(), id: doc.id }])
            );
          }
        }
      }
    );
  };

  useEffect(() => {
    if (!localStorage.getItem(certID)) fetchPost();
    else {
      setCerts(JSON.parse(localStorage.getItem(certID)));
    }
  }, []);

  return (
    <div className="bg-bg flex justify-center items-center bg-bg z-[9999]">
      {certs.length ? (
        <Certificate
          imageUrl={templateSelector(certs[0].type)}
          text={certs[0].name}
          nameCoordinates={nameCoordinates(certs[0].type)}
          event={certs[0].event}
          type={certs[0].type}
          eventCoordinates={eventCoordinates(certs[0].type)}
          collegeName={certs[0].college}
          id={certs[0].id}
        />
      ) : (
        <p className="text-center">Loading...</p>
      )}
    </div>
  );
}
