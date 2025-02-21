import { FC } from "react";
import QRCode from "react-qr-code";

const Qr: FC = () => {
  return (
    <div
      style={{
        display: "inline-block",
        margin: "0",
        padding: "10px",
        backgroundColor: "white",
      }}
    >
      <QRCode size={120} value={"AAAA"} />
      <p style={{ margin: "0", padding: "0", textAlign: "center" }}>AAAA</p>
    </div>
  );
};

export default Qr;
