import { useState } from 'preact/hooks'
import   crypto from "crypto";
import './app.css'
import  axios  from"axios" 
import { useNavigate } from "react-router-dom";


export function App() {




  return (
    <>
      <div>
        <button type="button" onClick={ callMomoPayment}> PROCEED TO PAYMENT</button>
      </div>
    </>
  );
}


const callMomoPayment = async () => {
  try {
    const response = await fetch("Http://localhost:8081/v1/pay/payment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
 
    });

    const data = await response.json();

    if (data.payUrl) {
      window.location.href = data.payUrl; // Redirect user to the MoMo payment page
    } else {
      alert("Payment failed");
    }
  } catch (error) {
    console.error("Payment error:", error);
  }
};
