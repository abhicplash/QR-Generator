import React, { useState } from "react";
import "./QrCode.css";

const QrCode = () => {
  const [img, setImg] = useState("");
  const [loading, setLoading] = useState(false);
  const [qrData, setQrData] = useState("github.com/abhilas");
  const [qrSize, setQrSize] = useState(150);
  async function generateQr() {
    setLoading(true);
    try {
      const url = `https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&data=${encodeURIComponent(
        qrData
      )}`;
      setImg(url);
    } catch (err) {
      console.error("Error in Generating QR Code", err);
    } finally {
      setLoading(false);
    }
  }
  function downloadQR() {
    fetch(img)
      .then((res) => res.blob())
      .then((blob) => {
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "qr.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch((err) => {
        console.error("Error in Generating QR Code", err);
      });
  }
  return (
    <div className="app-container">
      {loading && <p>please wait........</p>}
      {img && <img src={img} className="qr-image" alt="QRimage" />}
      <div>
        <label htmlFor="datainput">Data for QR Code</label>
        <input
          value={qrData}
          onChange={(e) => {
            setQrData(e.target.value);
          }}
          type="text"
          className="input-label"
          id="datainput"
          placeholder="Enter Data"
        />
      </div>
      <div>
        <label htmlFor="sizeinput">Image Size (eg..,150):</label>
        <input
          onChange={(e) => {
            setQrSize(e.target.value);
          }}
          value={qrSize}
          type="text"
          className="input-label"
          id="sizeinput"
          placeholder="Enter size for QR"
        />
      </div>
      <div className="btns">
        <button
          className="Generate-btn"
          disabled={loading}
          onClick={generateQr}
        >
          Generate QR Code
        </button>
        <button className="Download-btn" onClick={downloadQR}>
          Download QR Code
        </button>
      </div>
    </div>
  );
};

export default QrCode;
