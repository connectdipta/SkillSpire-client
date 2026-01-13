import React, { useEffect, useState } from "react";
import axiosPublic from "../../api/axiosPublic";

const Submissions = () => {
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    axiosPublic.get("/submissions").then(res => {
      setSubmissions(res.data);
    });
  }, []);

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Submitted Tasks</h2>

      <div className="space-y-4">
        {submissions.map(sub => (
          <div key={sub._id} className="card bg-base-200 p-4 rounded-xl">
            <p><strong>Email:</strong> {sub.userEmail}</p>
            <p className="mt-2 text-sm text-base-content/70">
              {sub.content}
            </p>
            <button className="btn btn-sm btn-primary mt-3">
              Declare Winner
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Submissions;
