import React from "react";
import {
  FaUser,
  FaBell,
  FaSignOutAlt,
  FaEdit,
  FaCrown,
  FaCamera,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";


const ProfileView = () => {
  //const { avatar, name, email, phone, birthDate, gender, isRegistered =true } = profile
    const isRegistered = true
    const  avatar = "";
  return (
    <div className="w-full mx-auto bg-white shadow-md rounded-lg p-6">
      {/* Avatar and Name */}
      <div className="flex items-center space-x-4 mb-6">
        {avatar ? (
          <img
            src=""
            alt="Avatar"
            className="w-16 h-16 rounded-full object-cover"
          />
        ) : (
          <span className="inline-block h-32 w-32 rounded-full overflow-hidden bg-gray-100">
            <FaUser
              className="h-full w-full text-gray-300"
              aria-hidden="true"
            />
          </span>
        )}

        <div>
          <h1 className="text-xl font-semibold">Tran Duc Phat</h1>
        </div>
      </div>

      {/* Information */}
      <div className="space-y-4">
        <div className="flex justify-between">
          <span className="text-gray-600 font-bold">Email:</span>
          <span className="text-gray-800"></span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-600 font-bold">Phone:</span>
          <span className="text-gray-800"></span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-600 font-bold">Birth Date:</span>
          <span className="text-gray-800"></span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-600 font-bold">Gender:</span>
          <span className="text-gray-800"></span>
        </div>

        {/* Member Status */}
        <div className="flex justify-between">
          <span className="text-gray-600 font-bold">Member Status:</span>
          <span
            className={
              isRegistered ? "text-green-600 font-semibold" : "text-gray-400"
            }
          >
            {isRegistered ? "Registered" : "Not Registered"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProfileView;
