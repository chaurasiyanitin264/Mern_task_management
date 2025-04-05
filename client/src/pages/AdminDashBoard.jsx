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
        className={`sidebar-toggle ${isSidebarOpen ? 'active' : ''}`}
        onClick={toggleSidebar}
        aria-label="Toggle Sidebar"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <div className={`dashboard-container ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
        <aside className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
          <div className="sidebar-header">
            <h3>Dashboard</h3>
          </div>
          <nav className="navbar">
            <div className="nav-container">
              <ul className="nav-links">
                <li>
                  <Link
                    to="createuser"
                    className="nav-link"
                    onClick={() => window.innerWidth <= 768 && setSidebarOpen(false)}
                  >
                    <i className="nav-icon user-icon"></i>
                    <span>Create User</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="assigntask"
                    className="nav-link"
                    onClick={() => window.innerWidth <= 768 && setSidebarOpen(false)}
                  >
                    <i className="nav-icon task-icon"></i>
                    <span>Assign Task</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="usertaskreport"
                    className="nav-link"
                    onClick={() => window.innerWidth <= 768 && setSidebarOpen(false)}
                  >
                    <i className="nav-icon report-icon"></i>
                    <span>Task Report</span>
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