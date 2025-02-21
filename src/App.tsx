import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useRef } from "react";

export function App() {
  /** PDF化する対象の要素を参照するための useRef */
  const contentRef = useRef<HTMLDivElement>(null);
  /** PDFダウンロード処理 */
  const handleDownloadPdf = async () => {
    if (!contentRef.current) return;

    try {
      // 1️⃣ 指定した要素をキャプチャしてCanvasに変換
      const canvas = await html2canvas(contentRef.current);

      // 2️⃣ Canvasを画像として取得（Base64のPNGデータ）
      const imageData = canvas.toDataURL("image/png");

      // 3️⃣ jsPDF インスタンスを作成（A4縦向き）
      const pdf = new jsPDF({ orientation: "p", unit: "mm", format: "a4" });

      // 4️⃣ PDFの幅を取得し、アスペクト比を維持した高さを計算
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      // 5️⃣ 画像をPDFに追加（左上から配置）
      pdf.addImage({
        imageData: imageData,
        format: "PNG",
        x: 0,
        y: 0,
        width: pdfWidth,
        height: pdfHeight,
      });

      // 6️⃣ PDFをダウンロード
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
          maxWidth: "1000px",
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
            height: "891px",
            margin: "0 auto",
            backgroundColor: "skyblue",
          }}
        >
          <h2 style={{ margin: "0px", padding: "10px 0" }}>
            PDF化するコンテンツ
          </h2>
          <p style={{ margin: "0px", padding: "5px 0" }}>
            この部分がPDFとして出力されます。
          </p>
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
