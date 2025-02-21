import { FC } from "react";
import { ReactBarcode } from "react-jsbarcode";

const Barcode: FC = () => {
  return (
    <>
      <ReactBarcode
        value={"AAAA"}
        options={{
          format: "code128",
          height: 50,
          fontSize: 18,
          marginTop: 0,
          marginBottom: 0,
        }}
      />
    </>
  );
};

export default Barcode;
