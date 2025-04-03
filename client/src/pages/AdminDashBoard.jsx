import { useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import "../pages/Admin.css";

const DashBoard = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setSidebarOpen(window.innerWidth > 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="dashboard-wrapper">
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
      
      {isSidebarOpen && window.innerWidth <= 768 && (
        <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)}></div>
      )}
    </div>
  );
};

export default DashBoard;
