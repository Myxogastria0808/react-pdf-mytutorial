import { FC } from "react";
import { ReactBarcode } from "react-jsbarcode";

const Barcode: FC = () => {
  return (
    <div
      style={{
        display: "inline-block",
        margin: "67.90909px 0 0 23.66667px",
        padding: "5px 10px 5px 10px",
        //BUG: https://github.com/niklasvh/html2canvas/issues/2739
        // backgroundColor: "white",
        height: "60px",
        border: "2px solid rgb(0, 0, 0)",
      }}
    >
      <ReactBarcode
        value={"AAAA"}
        options={{
          format: "code128",
          height: 35,
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
          fontWeight: "bold",
        }}
      >
        AAAA
      </p>
    </div>
  );
};

export default Barcode;
