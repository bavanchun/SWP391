import { useRef, useState } from "react";
import SideBar from "../component/update-profile/Sidebar";
import { MdEmail, MdPassword } from "react-icons/md";
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
import { IoMdClose } from "react-icons/io";
import "./ProfileUser.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Outlet,
  Link,
  useNavigate,
  Navigate,
  useLocation,
} from "react-router-dom";
import { EditProfile } from "../component/update-profile/EditProfile/EditProfile";
import { Notifications } from "../component/update-profile/notification";

import { VscDebugBreakpointUnsupported } from "react-icons/vsc";
import ProfileView from "../component/update-profile/Profile";
import { IoMdAdd } from "react-icons/io";
import { ChangeEmail } from "../component/update-profile/EditProfile/ChangeEmail";
import { ChangePassword } from "../component/update-profile/EditProfile/ChangePassword";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Box from "@mui/material/Box";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { patch } from "@mui/material";


function ProfileUser() {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isBurger, setIsBurger] = useState(true);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isMembershipOpen, setIsMembershipOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    birthdate: "",
    gender: "",
  });
  const location = useLocation(); // Lấy URL hiện tại
  const [linkpage, setLinkPage] = useState("");

  // Navigage
  const navigate = useNavigate();


  const toggleMenu = (newData) => {
    console.log(newData);

    setIsBurger((newData) => !isBurger);
    if (isBurger == false) setIsBurger(true);
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = (toggleLogOutModal) => {
    console.log(toggleLogOutModal);

    setShowLogoutModal(toggleLogOutModal);
  };

  const confirmLogout = () => {
    // Perform logout logic here
    console.log("User logged out");
    setShowLogoutModal(false);
  };

  const toggleMembership = () => {
    setIsMembershipOpen(!isMembershipOpen);
  };
  console.log("burger : " + isBurger);

  const handleLinkPage = (newData) => {
    console.log(newData);

    setLinkPage(newData);
    navigate(`${newData}`);
  };
  //  state value for tab
  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    
    setValue(newValue);
  };
 
  // Đây là thử test
  const memberStatus = false;

  
 

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}

      {/* Nav Link */}

      {/* Main Content */}
      <div className="w-full flex-row justify-center p-10">
        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="lab API tabs example"
                variant="scrollable"
                textColor="secondary"
                scrollButtons
                allowScrollButtonsMobile
              >
                <Tab label="Profile" value="1" />
                <Tab label="Change Email" value="2" />
                <Tab label="Change Password" value="3" />
                <Tab label="Notification" value="4" />
                {/* lay thuoc tinh memberStatus de set */}
                {!memberStatus ? (
                  <Tab label="MemberShip" value="5" disabled />
                ) : (
                  <Tab label="MemberShip" value="5" />
                )}
              </Tabs>
            </Box>
            <TabPanel value="1">
              <EditProfile />
            </TabPanel>
            <TabPanel value="2">
                <ChangeEmail></ChangeEmail>
            </TabPanel>
            <TabPanel value="3">
              <ChangePassword />
            </TabPanel>
            <TabPanel value="4">
              <Notifications />
            </TabPanel>
          </TabContext>
        </Box>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Logout Confirmation
              </h3>
              <div className="mt-2 px-7 py-3">
                <p className="text-sm text-gray-500">
                  Are you sure you want to logout?
                </p>
              </div>
              <div className="items-center px-4 py-3">
                <button
                  onClick={confirmLogout}
                  className="px-4 py-2 bg-red-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300"
                >
                  Logout
                </button>
                <button
                  onClick={() => setShowLogoutModal(false)}
                  className="mt-3 px-4 py-2 bg-gray-100 text-gray-700 text-base font-medium rounded-md w-full shadow-sm hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Menu Toggle Button for mobile */}
      {isBurger && (
        <button
          onClick={toggleMenu}
          className="fixed top-4 left-4 z-40 lg:hidden bg-white p-2 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <svg
            className="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      )}
    </div>
  );
}

export default ProfileUser;
