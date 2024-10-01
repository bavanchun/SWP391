import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import dotenv from "dotenv";

function App() {
   const  [ elementID, setElement ] = useState(0);
   const [file , setFile] = useState(null);
  const [count, setCount] = useState(0);
  const [image , setImage] = useState({}); 
  const [id , setID]  = useState(null);
  const [imgMul , setImgMul] = useState(); 
  
  const handleLoginSuccess = (response) => {
    const token = jwtDecode(response.credential);
    console.log(token);
    sendTokenToAPI(token);
    // Bạn có thể gửi mã token để xác thực ở backend
  };

  const handleLoginError = () => {
    console.log("Login Failed");
  };  
  
  const sendTokenToAPI = async (token) => {
    console.log(import.meta.env.API_SIGNIN);
    
    try {
      const response = await axios.post(import.meta.env.VITE_SIGNIN, {
        token: token, // Gửi token trong body của request
      });
    
      console.log("API Response:", response.data);
      
    } catch (error) {
      console.error("Error sending token to API:", error);
    }
  };

  const getKoiElement  = async () => { 
    try {
    
        
        const response = await axios.get(
        `http://localhost:8081/v1/fish/getKoiElement?elementID=${elementID}`
        );
      
      
      console.log("API DATA "+JSON.stringify(response.data));
      
       
    } catch (err) {
      console.log(err);
      
    }
  }


   function UploadInput() {
     return (
       <>
         <div className="flex items-center justify-center w-full">
           <label
             htmlFor="dropzone-file"
             className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
           >
             <div className="flex flex-col items-center justify-center pt-5 pb-6">
               <svg
                 aria-hidden="true"
                 className="w-10 h-10 mb-3 text-gray-400"
                 fill="none"
                 stroke="currentColor"
                 viewBox="0 0 24 24"
                 xmlns="http://www.w3.org/2000/svg"
               >
                 <path
                   strokeLinecap="round"
                   strokeLinejoin="round"
                   strokeWidth="2"
                   d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                 ></path>
               </svg>
               <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                 <span className="font-semibold">Click to upload</span> or drag
                 and drop
               </p>
               <p className="text-xs text-gray-500 dark:text-gray-400">
                 SVG, PNG, JPG or GIF (MAX. 800x400px)
               </p>
             </div>
             <input
               onChange={handleUpload}
               id="dropzone-file"
               type="file"
               className="hidden"
               multiple
             />
           </label>
           <button
             className="btn bg-teal-100 text-zinc-950"
             type="2"
             onClick={changeAvatar}
           >
             submit image
           </button>
         </div>
         <div className="w-2/4 flex justify-center ">
           {image && (
             <img className="w-20 h-20" src={image.data} alt="" srcset="" />
           )}
         </div>
         <div className="w-100 my-10">
            {
              imgMul && (
                 <div className="flex justify-center gap-2">
                      {
                        imgMul.data.map((value) => (
                          <img src={value} alt="" srcset=""  className="w-20 h-20 me-auto"/>
                        ))
                      }
                 </div>
              )
                
          
            }              
         </div>
       </>
     );
   }

   const changeAvatar = async() => { 
      setID("66eb057f5a836eb9ec328712");

      const data = { 
        avatar : image.data
      }
    
      try {
        const result = await axios.post(
          `http://localhost:8081/v1/user/update/id=${id}`, data
        );
         console.log("Update avatar success" + result.data);
        
        
      }catch (err) {
        console.log(err);
        
      }
   }  
   

   const uploadSingleImage = async (data)  => {
    try { 
     const result = await axios.post(
       `http://localhost:8081/v1/user/uploadImage`,
       data,
       {
         headers: {
           "Content-Type": "multipart/form-data",
         },
       }
     );
      console.log("UPLOAD IMAGE SUCCESS"+result.data);
     setImage(result.data);
    
    
    }catch(err) {
      console.log(err);
    }
   }


  const uploadMultipleImage =async  (data) => {
    try {
        console.log(data.append);
        const result = await axios.post(
          "http://localhost:8081/v1/user/uploadImages",
          data,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log(typeof result.data);
        setImgMul(result.data)
         
    } catch (err) {
      console.log(err);
      
    }
  }
   

   const handleUpload = async (e) => { 
       setFile(e.target.files);
      console.log(file);
      
      const formData =   new FormData();
      
      if(file && file.length === 1) {
          formData.append("avatar", file);
          uploadSingleImage(formData);
          setFile(null);
          return;
      }

      for(let i = 0; i < file.length ; i++) {
        formData.append('post',file[i]);
      }

     uploadMultipleImage(formData);
     
   }
 
   
 
  
  return (
    <>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_ClIENT_ID}>
        <div className="App">
          <h1 className="font-bold py-10">Google Login in React</h1>
          <GoogleLogin
            onSuccess={handleLoginSuccess}
            onError={handleLoginError}
          />
        </div>
      </GoogleOAuthProvider>

      <div>
        <h1>{import.meta.env.VITE_CLIENT_ID}</h1>
      </div>

      <div>
        <form action="">
          <input
            type="text"
            value={elementID == 0 ? "" : elementID}
            onChange={(e) => {
              setElement(e.target.value);
            }}
          />
          <button type="submit" onClick={() => getKoiElement()}>
            get koi
          </button>
        </form>
      </div>


      <div className="flex justify-center flex-col m-8 ">
        <div>
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">
            Upload Photo
          </h2>
        </div>
        <div>
            <UploadInput/>
        </div>
        <div>
        
        </div>
      </div>
    </>
  );
}

export default App;
