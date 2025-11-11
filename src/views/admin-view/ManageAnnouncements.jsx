import React, { useState, useEffect } from "react";
import apiClient from "../../lib/api";
import AnnouncementBar from "../../components/admin/AnnouncementBar";

const ManageAnnouncements = () => {
    const [announcements, setAnnouncements] = useState([]);

    useEffect(() => {
        const fetchAnnouncements = async () => {
            try {
                const response = await apiClient.get('/admin/announcements');
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
