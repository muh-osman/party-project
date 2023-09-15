// QR Code npm
import { QrReader } from "react-qr-reader";
// React
import { useState, useEffect } from "react";
// Scss
import css from "./Scan.module.scss";

export default function Scan() {
  const [scanResult, setScanResult] = useState(null);

  return (
    <div className={css.container}>
      <h1>Scan</h1>

      <div className={css.qr_box}>
        <QrReader
          onResult={(result, error) => {
            if (!!result) {
              setScanResult(result?.text);
            }

            if (!!error) {
              console.info(error);
            }
          }}
          style={{ width: "100%", height: "100%" }}
          constraints={{ facingMode: "back" }}
        />
        <p>{scanResult}</p>
      </div>
    </div>
  );
}
