import jsPDF from 'jspdf';
import 'jspdf-autotable';

export const generatePDF = (checkup) => {
  const doc = new jsPDF();

  doc.setFontSize(16);
  doc.text(`Dental Checkup Report`, 20, 20);

  doc.setFontSize(12);
  doc.text(`Dentist: ${checkup.dentist.name}`, 20, 30);
  doc.text(`Date: ${new Date(checkup.createdAt).toLocaleString()}`, 20, 40);

  checkup.results.forEach((res, idx) => {
    doc.text(`\nResult ${idx + 1}: ${res.description}`, 20, 60 + idx * 40);
    if (res.image) {
      // Placeholder — image drawing needs base64 or URL-to-canvas conversion
      doc.text(`[Image ${idx + 1} here]`, 20, 70 + idx * 40);
    }
  });

  doc.save('checkup-report.pdf');
};
