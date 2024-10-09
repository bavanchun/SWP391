import { useRef, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProfileUser from "./page/ProfileUser";
import { Notifications } from "./component/update-profile/notification";
import { EditProfile } from "./component/update-profile/EditProfile/EditProfile";
import  {ChangeEmail } from "./component/update-profile/EditProfile/ChangeEmail"
import { ChangePassword } from "./component/update-profile/EditProfile/ChangePassword";
function App() {
  const router = createBrowserRouter([
    {
      path: "/home",
      element: <div>Hello world!</div>,
    },
    {
      path: "/profile",
      element: <ProfileUser />,
      children: [
        {
          path: "/profile/notification",
          element: <Notifications />,
        },
        {
          path: "/profile/editProfile",
          element: <EditProfile />,
        },

        {
          path: "/profile/changePassword",
          element: <ChangePassword />,
        },
      ],
    },
    {
      path: "/changeEmail",
      element: <ChangeEmail />,
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
