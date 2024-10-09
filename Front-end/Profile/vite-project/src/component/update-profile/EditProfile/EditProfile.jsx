import { useRef, useState } from "react";
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
import { useLocation } from "react-router-dom";
import "./editProfile.css"


export function EditProfile() {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    birthdate: "",
    gender: "",
    avatar:"",
  }); 
  
  const [imagePreview, setImagePreview] = useState(null);
 



const handleImageReview =  (e) => {
   const file =  e.target.files[0];
  if (file) {
    console.log("FIle da dc up len ");
    const imageURL = URL.createObjectURL(file);
    setImagePreview(imageURL);

  }
  console.log(file);

}

//   submit các input 
  const handleSubmit =  (e) => {
    e.preventDefault();
    // Handle form submission logic here
   
    console.log("Form submitted:", formData);
  };

   const handleInputChange = (e) => {
     const { name, value } = e.target;
     setFormData((prevData) => ({
       ...prevData,
       [name]: value,
     }));
   };


  return (
    <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-8">
      <div className="flex flex-col items-center mb-8">
        <div className="relative">
          <span className="inline-block h-32 w-32 rounded-full overflow-hidden bg-gray-100">
            {/* avatar  */}
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Profile"
                className="h-full w-full object-cover"
              />
            ) : (
              <FaUser
                className="h-full w-full text-gray-300"
                aria-hidden="true"
              />
            )}
          </span>
          {/* {  button upload image} */}
          <div className="inner position-absolute w-8 h-8 bottom-0 right-0">
            <span className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <FaCamera className="h-5 w-5 text-gray-400" />
            </span>
            <input
              type="file"
              name="pic" accept="image/*"
              onChange={handleImageReview}
              className="opacity-0 overflow-hidden position-absolute z-10 w-5 h-5"
            />
          </div>
        </div>
        <h1 className="text-3xl font-bold mt-4 text-gray-800">Your Profile</h1>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Name"
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700"
          >
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            placeholder="phone number"
            value={formData.phone}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label
            htmlFor="birthdate"
            className="block text-sm font-medium text-gray-700"
          >
            Birthdate
          </label>
          <input
            type="date"
            id="birthdate"
            name="birthdate"
            value={formData.birthdate}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label
            htmlFor="gender"
            className="block text-sm font-medium text-gray-700"
          >
            Gender
          </label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
