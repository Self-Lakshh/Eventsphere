import { useState } from "react";
import { Card, CardContent, Typography, Button, IconButton, Box } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import Popup from "../admin/Popup"

function ActionCard({ icon, title, description, buttonText, formFields, onSubmit }) {
    const [open, setOpen] = useState(false);

    return (
        <>
            <Card sx={{ padding: 2, borderRadius: 3, backgroundColor: "var(--secondary-bg-color)", display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%", width: { xs: "100%", sm: "80%", md: "300px" }, margin: { xs: "8px 0", sm: "8px" } }}>
                <CardContent sx={{ flexGrow: 1 }}>
                    <IconButton sx={{ color: "var(--text-color)", mb: 2, width: { xs: 36, sm: 40 }, height: { xs: 36, sm: 40 } }} aria-label="info">
                        {icon || <InfoIcon sx={{ fontSize: { xs: 20, sm: 24 } }} />}
                    </IconButton>
                    <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ fontSize: { xs: "1rem", sm: "1.2rem" } }}>{title || "Action Card Title"}</Typography>
                    <Typography variant="body2" sx={{ fontSize: { xs: "0.85rem", sm: "1rem" } }}>{description || "Let's spice things up!"}</Typography>
                </CardContent>
                <Box textAlign="center" sx={{ mt: 1 }}>
                    <Button variant="contained" onClick={() => setOpen(true)} sx={{ backgroundColor: "var(--btn-color)", borderRadius: "8px", paddingX: { xs: 2, sm: 3 }, paddingY: { xs: 1, sm: 1.2 }, width: "100%", fontSize: { xs: "0.85rem", sm: "1rem" }, "&:hover": { backgroundColor: "var(--btn-hover-color)" } }}>
                        {buttonText || "Open Form"}
                    </Button>
                </Box>
            </Card>

            {/* Popup Form */}
            <Popup open={open} handleClose={() => setOpen(false)} title={title} formFields={formFields} onSubmit={onSubmit} />
        </>
    );
}

export default ActionCard;
