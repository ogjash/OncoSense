import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { doctors as doctorsData } from "../../../assets/images/assets";

const AllDoctors = () => {
  const [doctors] = useState(doctorsData);
  const [filteredDoctors, setFilteredDoctors] = useState(doctors);
  const [selectedSpeciality, setSelectedSpeciality] = useState("");
  const navigate = useNavigate();

  const handleFilter = (speciality) => {
    if (speciality === selectedSpeciality) {
      setFilteredDoctors(doctors);
      setSelectedSpeciality("");
    } else {
      setFilteredDoctors(doctors.filter((doc) => doc.speciality === speciality));
      setSelectedSpeciality(speciality);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-primary">All Doctors</h1>
      <div className="flex gap-4 mb-6">
        {[...new Set(doctors.map((doc) => doc.speciality))].map((speciality) => (
          <button
            key={speciality}
            className={`px-4 py-2 rounded-md border ${selectedSpeciality === speciality ? "bg-blue-500 text-white" : "text-black bg-gray-200"}`}
            onClick={() => handleFilter(speciality)}
          >
            {speciality}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredDoctors.map((doctor) => (
          <div key={doctor._id} className="p-4 border rounded-md shadow-md flex gap-4">
            <img src={doctor.image} alt={doctor.name} className="w-16 h-16 rounded-full" />
            <div>
              <h2 className="text-lg text-gray-800 font-semibold">{doctor.name}</h2>
              <p className="text-gray-600">{doctor.speciality} - {doctor.experience}</p>
              <p className="text-gray-800 font-bold">₹ {doctor.fees}</p>
              <button
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md"
                onClick={() => navigate(`/appointment/${doctor._id}`)}
              >
                Book Appointment
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllDoctors;
