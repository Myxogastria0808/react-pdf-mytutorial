import { FC } from "react";
import QRCode from "react-qr-code";

const Qr: FC = () => {
  return (
    <div
      style={{
        display: "inline-block",
        margin: "44.6px 0 0 52.5px",
        padding: "10px",
        backgroundColor: "white",
        height: "147px",
        border: "2px dashed rgb(107, 107, 107)",
      }}
    >
      <QRCode
        size={120}
        value={"AAAA"}
        bgColor={"#FFFFFF"}
        fgColor={"#ED6D1F"}
      />
      <p
        style={{
          margin: "0",
          padding: "0",
          textAlign: "center",
          fontSize: "18px",
          fontFamily: "ZeroXProto",
        }}
      >
        AAAA
      </p>
    </div>
  );
};

export default Qr;
