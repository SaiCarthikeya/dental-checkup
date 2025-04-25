import { useEffect, useState } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';

const MyCheckups = () => {
  const [results, setResults] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await axios.get('/api/checkups/mine', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setResults(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchResults();
  }, []);

  const exportToPDF = async (result) => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text(`Dentist: ${result.dentist.name}`, 10, 20);
    doc.text(`Notes: ${result.notes}`, 10, 30);

    let y = 50;
    for (const imgPath of result.images) {
      const img = await toDataURL(`${import.meta.env.VITE_BACKEND_URL}/uploads/${imgPath}`);
      doc.addImage(img, 'JPEG', 10, y, 180, 100);
      y += 110;
    }

    doc.save('checkup.pdf');
  };

  const toDataURL = (url) =>
    fetch(url)
      .then((res) => res.blob())
      .then(
        (blob) =>
          new Promise((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.readAsDataURL(blob);
          })
      );

  return (
    <div className="min-h-screen bg-teal-50 p-6">
      <h2 className="text-2xl font-semibold text-teal-700 mb-4">My Checkup Results</h2>
      <div className="grid gap-6">
        {results.map((res) => (
          <div key={res._id} className="bg-white shadow p-4 rounded">
            <p className="font-medium mb-2">Dentist: {res.dentist.name}</p>
            <p className="mb-2">Notes: {res.notes}</p>
            <div className="flex gap-4 overflow-x-auto mb-2">
              {res.images.map((img, i) => (
                <img
                  key={i}
                  src={`${import.meta.env.VITE_BACKEND_URL}/uploads/${img}`}
                  alt="Checkup"
                  className="h-40 object-cover rounded"
                />
              ))}
            </div>
            <button
              onClick={() => exportToPDF(res)}
              className="bg-teal-600 text-white px-4 py-2 rounded"
            >
              Download PDF
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyCheckups;
