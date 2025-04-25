import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CheckupRequests = () => {
  const [requests, setRequests] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await axios.get('/api/checkups/requests', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setRequests(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchRequests();
  }, []);

  return (
    <div className="min-h-screen bg-teal-50 p-6">
      <h2 className="text-2xl font-semibold text-teal-700 mb-4">Pending Checkup Requests</h2>
      <div className="grid gap-4">
        {requests.map((req) => (
          <div key={req._id} className="bg-white shadow p-4 rounded flex justify-between items-center">
            <div>
              <p className="font-medium">Patient: {req.user.name}</p>
              <p>Email: {req.user.email}</p>
            </div>
            <button
              onClick={() => navigate(`/upload-result/${req._id}`)}
              className="bg-teal-600 text-white px-4 py-2 rounded"
            >
              Upload Result
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CheckupRequests;
