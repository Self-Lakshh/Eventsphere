import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "../components/admin/SideBar";
import AdminNavbar from "../components/admin/AdminNavbar";
import useLayout from "../hooks/useLayout";

const AdminLayout = () => {
    const { isMobile } = useLayout();

    return (
        <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
            {/* Sidebar - Fixed on the Left */}
            {!isMobile && (
                <div
                    style={{
                        width: "250px",
                        height: "100vh",
                        position: "fixed",
                        left: 0,
                        top: 0,
                        backgroundColor: "var(--sidebar-bg-color)",
                        borderRight: "1px solid var(--border-color)",
                    }}
                >
                    <SideBar />
                </div>
            )}

            {/* Main Content Area */}
            <div
                style={{
                    flexGrow: 1,
                    marginLeft: isMobile ? "0" : "250px", // Sidebar width offset
                    display: "flex",
                    flexDirection: "column",
                    height: "100vh",
                    overflow: "hidden",
                }}
            >
                {isMobile && <AdminNavbar />}

                {/* Scrollable Content Area */}
                <main
                    style={{
                        flexGrow: 1,
                        padding: "20px",
                        overflowY: "auto", // ✅ Enables vertical scrolling
                        overflowX: "hidden",
                    }}
                >
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
