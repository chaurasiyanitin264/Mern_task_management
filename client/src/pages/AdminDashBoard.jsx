import { useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import "../pages/Admin.css";

const DashBoard = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  
  // Handle window resize to automatically adjust sidebar visibility
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };

    // Set initial state based on window size
    handleResize();
    
    // Add event listener
    window.addEventListener("resize", handleResize);
    
    // Clean up
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="dashboard-wrapper">
      {/* Sidebar toggle button for mobile */}
      <button 
        className="sidebar-toggle"
        onClick={toggleSidebar}
        aria-label="Toggle Sidebar"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <div className={`dashboard-container ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
        <aside className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
          <nav className="navbar">
            <div className="nav-container">
              <ul className="nav-links">
                <li>
                  <Link 
                    to="createuser" 
                    className="nav-link"
                    onClick={() => window.innerWidth <= 768 && setSidebarOpen(false)}
                  >
                    Create User
                  </Link>
                </li>
                <li>
                  <Link 
                    to="assigntask" 
                    className="nav-link"
                    onClick={() => window.innerWidth <= 768 && setSidebarOpen(false)}
                  >
                    Assign Task
                  </Link>
                </li>
                <li>
                  <Link 
                    to="usertaskreport" 
                    className="nav-link"
                    onClick={() => window.innerWidth <= 768 && setSidebarOpen(false)}
                  >
                    Task Report
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        </aside>
        
        <main className="content-area">
          <Outlet />
        </main>
      </div>
      
      {/* Overlay for mobile view */}
      {isSidebarOpen && window.innerWidth <= 768 && (
        <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)}></div>
      )}
    </div>
  );
};

export default DashBoard;