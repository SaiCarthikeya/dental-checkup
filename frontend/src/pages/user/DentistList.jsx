import { useEffect, useState } from 'react';
import axios from 'axios';

const DentistList = () => {
  const [dentists, setDentists] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchDentists = async () => {
      try {
        const res = await axios.get('/api/checkups/dentists', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setDentists(res.data);
        console.log(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchDentists();
  }, []);

  const handleRequest = async (dentistId) => {
    try {
      await axios.post(
        '/api/checkups',
        { dentistId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Checkup request sent!');
    } catch (err) {
      alert('You may have already requested!');
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-teal-50 p-6">
      <h2 className="text-2xl font-semibold text-teal-700 mb-4">Available Dentists</h2>
      <div className="grid gap-4">
        {
          dentists.length === 0 ? <p className="font-semibold text-teal-700 mb-4">No dentists Found</p> :
          dentists.map((d) => (
            <div
              key={d._id}
              className="bg-white shadow p-4 rounded flex justify-between items-center"
            >
              <div>
                <p className="font-medium">{d.name}</p>
                <p>Email: {d.email}</p>
              </div>
              <button
                onClick={() => handleRequest(d._id)}
                className="bg-teal-600 text-white px-4 py-2 rounded"
              >
                Request Checkup
              </button>
            </div>
          ))
        }
        
      </div>
    </div>
  );
};

export default DentistList;
