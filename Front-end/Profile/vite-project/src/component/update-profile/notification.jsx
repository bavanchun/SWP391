import { useRef, useState } from "react";
import { IoMdClose } from "react-icons/io";
 import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export function Notifications() {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      message: "You have a new message.",
      type: "info",
      createAtDate: "30/04/2024",
      status: true,
    },
    {
      id: 2,
      message: "Your order has been shipped!",
      type: "success",
      status: true,
    },
    { id: 3, message: "Your payment is due.", type: "warning", status: true },
    {
      id: 4,
      message: "Server error! Try again later.",
      type: "error",
      status: true,
    },
  ]);

  //   const getTypeClasses = (type) => {
  //     switch (type) {
  //       case 'info':
  //         return 'bg-blue-100 text-blue-800 border-blue-300';
  //       case 'success':
  //         return 'bg-green-100 text-green-800 border-green-300';
  //       case 'warning':
  //         return 'bg-yellow-100 text-yellow-800 border-yellow-300';
  //       case 'error':
  //         return 'bg-red-100 text-red-800 border-red-300';
  //       default:
  //         return '';
  //     }
  //   };
  const handleNotificationClick = async (id) => {
   // nen call api de chinh lai status cua notification trong DB
  await  setNotifications((prevNotifications) =>
      prevNotifications.map((notification) =>
        notification.id === id
          ? { ...notification, status: false } // Update the status to false
          :  notification
       
      )
        
    );
    toast.success("was read")
  };


  return (
    <div className="max-w-md mx-auto mt-10 p-4 bg-white border border-gray-200 rounded-lg shadow-lg">
      <h3 className="text-lg font-bold mb-4">Notifications</h3>
      <div className="flex flex-col space-y-2">
        {notifications?.map((notification) => (
          <div
            key={notification.id}
            className={`${
              notification.status == false && "hidden"
            } p-4 rounded-lg shadow-md flex items-center  bg-slate-300`}
          >
            <div className="flex-shrink-0">
              {/* Optional: You can add an icon or avatar here */}

              <span className="w-2 h-2 rounded-full bg-current mr-2"></span>
            </div>
            <div className="flex-grow">
              <div  className="flex-col">
                <p> {notification.message} </p>
                <p className="translate-y-5 text-xs text-slate-600">
                  {notification.createAtDate}{" "}
                </p>
              </div>
            </div>
            <button
              onClick={() => handleNotificationClick(notification.id)}
              className="  p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <IoMdClose className="w-6 h-6" />
            </button>
          </div>
        ))}
        {notifications?.length === 0 && (
          <div className="text-zinc-600"> Notification empty</div>
        )}
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
      />
    </div>
  );
}
