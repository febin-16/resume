import { BASE_URL } from "../constants/urls";
import * as ROUTES from "../constants/routes"

export async function generateCertificateAPI(token) {
  return await fetch(
    BASE_URL + "/api/v1/certificate/gen",
    {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": `token ${token}` },
    }
  );
}

import React, { useRef, useEffect } from 'react';
import Qrious from 'qrious'
import { useState } from "react";
import { useParams } from "react-router-dom";
import { COORDINATOR, FIRST, PARTICIPANT, SECOND, THIRD, VOLUNTEER } from "../pages/user/CertificateListView";

export default function Certificate({ imageUrl, text, nameCoordinates, event, type, eventCoordinates,collegeName,id }) {


  const URL = `https://hestiatkmce.in/certificates/${id}`
  console.log(useParams().certID);
  const canvasRef = useRef(null);
  const [qrSize, setQRSize] = useState(220)
  const handleDownload = () => {
    const canvas = canvasRef.current;
    const link = document.createElement('a');
    link.download = 'canvas-image.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  };
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const image = new Image();
    image.src = imageUrl;



    image.onload = () => {
      canvas.width = image.width;
      canvas.height = image.height;
      ctx.drawImage(image, 0, 0);

      ctx.font = '80px mono';
      ctx.fillText(text, nameCoordinates[0], nameCoordinates[1]);
      if (type === COORDINATOR || type === VOLUNTEER) {
        ctx.font = '60px mono';
        ctx.fillText(`${type}(${event})`, eventCoordinates[0], eventCoordinates[1]);
      }
      if (type === FIRST || type === SECOND || type === THIRD) {
        ctx.font = '50px mono';
        ctx.fillText(`${type}`, 2350, 1335);
        ctx.fillText(`${event}`, 1300, 1435);
      }
      if (type === PARTICIPANT) {
        ctx.font = '60px mono';
        ctx.fillText(`${event}`, 1250, 1380);
        ctx.fillText(collegeName, 400, 1260)
      }
      const qr = new Qrious({
        element: document.createElement('canvas'),
        value: URL,
        size: qrSize,
        level: 'H'
      });

      const qrCanvas = qr.canvas;
      ctx.drawImage(
        qrCanvas,
        canvas.width - qrSize - 0, // x-coordinate of bottom right corner
        canvas.height - qrSize - 0 // y-coordinate of bottom right corner
      );

    };
  }, [imageUrl, text, nameCoordinates]);

  return (
    <button  onClick={handleDownload}>
    <canvas
      className="w-[80%] m-[25px]"
      ref={canvasRef}
      style={{ maxWidth: '100%', }}
    />
      <div className={"w-full flex justify-center"}>
        <button className="btns w-full" onClick={handleDownload}>Download</button>
      </div>
    </button>
  );
}