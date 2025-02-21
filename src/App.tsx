import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useRef, useState } from "react";
import ReactModal from "react-modal";

ReactModal.setAppElement("#root");

const PDFComponent = () => {
  return (
    <div>
      <h1>PDF化するコンテンツ</h1>
      <p>この部分がPDFとして出力されます。</p>
    </div>
  );
};

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
  /** Modal処理 **/
  const [modalIsOpen, setIsOpen] = useState(false);
  const handleIsOpen = () => {
    setIsOpen(true);
  };
  const handleIsClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <ReactModal
        isOpen={modalIsOpen}
        onRequestClose={handleIsClose}
        contentLabel="Modal2"
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            transform: "translate(-50%, -50%)",
            width: "90%",
            minWidth: "320px",
            maxWidth: "900px",
            margin: "0",
            padding: "0",
            border: "none",
            backgroundColor: "rgba(0, 0, 0, 0)",
          },
        }}
      >
        <button
          onClick={handleIsClose}
          style={{
            width: "100%",
            padding: "0",
            margin: "0",
            border: "none",
            backgroundColor: "rgba(0, 0, 0, 0)",
          }}
        >
          {/* PDFに変換する対象のエリア start */}
          <div
            ref={contentRef}
            style={{
              aspectRatio: "210 / 297",
              maxHeight: "90vh",
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
        </button>
      </ReactModal>

      {/* モーダルボタン */}
      <button onClick={handleIsOpen}>PDFのプレビュー</button>
      {/* PDFダウンロードボタン */}
      <button onClick={handleDownloadPdf}>PDFをダウンロード</button>
    </>
  );
}
export default App;
