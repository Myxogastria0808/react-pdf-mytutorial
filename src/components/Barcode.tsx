import { FC } from "react";
import { ReactBarcode } from "react-jsbarcode";

const Barcode: FC = () => {
  return (
    <div
      style={{
        display: "inline-block",
        margin: "41px 0 0 92px",
        padding: "10px",
        backgroundColor: "white",
        height: "77px",
        border: "2px dashed rgb(107, 107, 107)",
      }}
    >
      <ReactBarcode
        value={"AAAA"}
        options={{
          format: "code128",
          height: 50,
          displayValue: false,
          lineColor: "#ED6D1F",
          margin: 0,
        }}
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

export default Barcode;
