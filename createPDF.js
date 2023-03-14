import PdfPrinter from 'pdfmake';
import fs from 'fs';

export async function createPDF() {
  const fileName = new Date().getTime();
  const filePath = `./${fileName}.pdf`;

  let fonts = {
    Roboto: {
      normal: "Helvetica",
      bold: "Helvetica-Bold",
      italics: "Helvetica-Oblique",
      bolditalics: "Helvetica-BoldOblique"
    }
  };

  const printer = new PdfPrinter(fonts);

  const pdfDoc = printer.createPdfKitDocument({
    content: [
      'PDF: ' + filePath
    ],

    defaultStyle: {
      fontSize: 15,
      bold: true
    }
  }, {

  });
  let stream = pdfDoc.pipe(fs.createWriteStream(filePath));
  pdfDoc.end();

  const message = await new Promise((res, rej) => {
    stream.on('finish', () => res('done'));
  });
  return filePath;
}
