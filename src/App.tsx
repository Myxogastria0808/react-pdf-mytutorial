import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useRef } from "react";
import { Qr, Barcode } from ".";

export function App() {
  /** PDF化する対象の要素を参照するための useRef */
  const contentRef = useRef<HTMLDivElement>(null);
  /** PDFダウンロード処理 */
  const handleDownloadPdf = async () => {
    if (!contentRef.current) return;

    try {
      // 1️: 指定した要素をキャプチャしてCanvasに変換
      const canvas: HTMLCanvasElement = await html2canvas(contentRef.current);

      // 2: jsPDF インスタンスを作成（A4縦向き）
      const pdf: jsPDF = new jsPDF({
        orientation: "p",
        unit: "mm",
        format: "a4",
      });

      // 3: PDFの幅を取得し、アスペクト比を維持した高さを計算
      const pdfWidth: number = pdf.internal.pageSize.getWidth();
      const pdfHeight: number = (canvas.height * pdfWidth) / canvas.width;

      // 4: canvasをPDFに追加（左上から配置）
      pdf.addImage({
        imageData: canvas,
        x: 0,
        y: 0,
        width: pdfWidth,
        height: pdfHeight,
      });

      // 5: PDFをダウンロード
      pdf.save("dashi-record.pdf");
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <>
      <h2>Preview Summary</h2>
      <div
        style={{
          width: "100%",
          maxWidth: "1200px",
          height: "300px",
          margin: "0 auto 0 auto",
          padding: "0",
          overflowX: "scroll",
          overflowY: "scroll",
          border: "1px solid black",
        }}
      >
        {/* PDFに変換する対象のエリア start */}
        <div
          ref={contentRef}
          style={{
            aspectRatio: "210 / 297",
            width: "auto",
            height: "1485px",
            margin: "0 auto",
            backgroundColor: "#FFFFFF",
            border: "1px solid black",
          }}
        >
          <Qr />
          <Barcode />
        </div>
        {/* PDFに変換する対象のエリア end */}
      </div>

      {/* PDFダウンロードボタン */}
      <div style={{ width: "100%" }}>
        <button
          onClick={handleDownloadPdf}
          style={{
            width: "200px",
            height: "50px",
            fontSize: "18px",
            margin: "10px auto 0 auto",
            display: "block",
          }}
        >
          PDFをダウンロード
        </button>
      </div>
    </>
  );
}
export default App;
