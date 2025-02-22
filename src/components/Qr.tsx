import { FC } from "react";
import QRCode from "react-qr-code";

const Qr: FC = () => {
  return (
    <div
      style={{
        display: "inline-block",
        margin: "45px 0 0 23px",
        padding: "10px 10px 0 10px",
        //BUG: https://github.com/niklasvh/html2canvas/issues/2739
        // backgroundColor: "white",
        height: "147px",
        border: "2px solid rgb(0, 0, 0)",
      }}
    >
      <QRCode
        size={100}
        value={"AAAA"}
        bgColor={"#FFFFFF"}
        fgColor={"#ED6D1F"}
      />
      <p
        style={{
          margin: "0",
          padding: "0",
          textAlign: "center",
          fontSize: "27px",
          fontFamily: "ZeroXProto",
          fontWeight: "bold",
        }}
      >
        AAAA
      </p>
    </div>
  );
};

export default Qr;
