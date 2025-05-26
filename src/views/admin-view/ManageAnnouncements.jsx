import React, { useState, useEffect } from "react";
import axios from "axios";
import AnnouncementBar from "../../components/admin/AnnouncementBar";

const ManageAnnouncements = () => {
    const [announcements, setAnnouncements] = useState([]);

    useEffect(() => {
        const fetchAnnouncements = async () => {
            try {
                const response = await axios.get("http://40.81.232.21:2025/api/admin/announcements", {
                    headers: { "x-api-key": "admin-secret-key" }
                });
                setAnnouncements(response.data);
            } catch (error) {
                console.error("Error fetching announcements:", error);
            }
        };
        fetchAnnouncements();
    }, []);

    return (
        <div>
            <AnnouncementBar announcements={announcements} setAnnouncements={setAnnouncements} />
        </div>
    );
};

export default ManageAnnouncements;
