import { useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useLocation } from "react-router-dom";
// lay pathName

export function ChangeEmail() {
   const [email, setEmail] = useState('');
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const pathName = useLocation().pathname;
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleCaptchaChange = (value) => {
     console.log(value);
     
    if (value) {
      setCaptchaVerified(true);
    } else {
      setCaptchaVerified(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (captchaVerified && email) {
      setSubmitted(true);
      // Here you can make the API call to update the email
      console.log('Email submitted:', email);
      
    }
  };
  console.log(useLocation().pathname);
  
  return (
    <div
      className={`${
        pathName === "/changeEmail" && "flex justify-center items-center h-full translate-y-1/2"
      }`}
    >
      <div
        className={`max-w-screen-sm mx-auto bg-white shadow-md rounded-lg p-6 `}
      >
        <h1 className="text-2xl font-semibold mb-4">Change Email</h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email:
            </label>
            <input
              type="email"
              id="email"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder={
                pathName === "/changeEmail"
                  ? "Enter your new email"
                  : "enter your current email"
              }
              value={email}
              onChange={handleEmailChange}
              required
            />
          </div>

          {/* reCAPTCHA */}
          <div className="mb-4">
            <ReCAPTCHA
              sitekey="6LfbSFoqAAAAAFIsgVegPsw4cmE-bV7saoQcIj1E" // Replace this with your site key from Google
              onChange={handleCaptchaChange}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full py-2 px-4 text-white font-bold rounded ${
              captchaVerified
                ? "bg-blue-500 hover:bg-blue-700"
                : "bg-gray-400 cursor-not-allowed"
            }`}
            disabled={!captchaVerified}
          >
            Submit
          </button>

          {submitted && (
            <div className="mt-4 text-green-500 font-semibold">
              {pathName === "/changeEmail" ? (
                <p> Your email has been update </p>
              ) : (
                <p> Your email has been submitted successfully! </p>
              )}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};
