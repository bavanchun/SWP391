import React, { createContext, useState } from "react";

// Tạo Context
export const SidebarContext = createContext();

export const SidebarProvider = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Trạng thái Sidebar

  const toggleSidebar = () => {
    setIsSidebarOpen((prevState) => !prevState); // Đóng hoặc mở Sidebar
  };

  return (
    <SidebarContext.Provider value={{ isSidebarOpen, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
};
