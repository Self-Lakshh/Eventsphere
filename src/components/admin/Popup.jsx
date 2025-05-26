import React, { useState, useEffect } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, MenuItem } from "@mui/material";

function Popup({ open, handleClose, title, formFields, onSubmit }) {
    const [formData, setFormData] = useState({});

    useEffect(() => {
        if (open) return; // Prevent resetting when dropdown is changed
        setFormData({}); // Only reset when popup is fully closed
    }, [open]);

    const handleChange = (event) => {
        setFormData((prevData) => ({
            ...prevData,
            [event.target.name]: event.target.value
        }));
    };

    const handleFormSubmit = () => {
        onSubmit(formData);
        handleClose();
    };

    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
            <DialogTitle>{title}</DialogTitle>
            <DialogContent dividers>
                {formFields?.map((field, index) => (
                    <TextField
                        key={index}
                        label={field.label}
                        name={field.name}
                        type={field.type}
                        select={field.type === "select"}
                        fullWidth
                        margin="dense"
                        variant="outlined"
                        value={formData[field.name] || ""} // Persist the value
                        onChange={handleChange}
                    >
                        {field.type === "select" && field.options?.map((option, idx) => (
                            <MenuItem key={idx} value={option.value}>{option.label}</MenuItem>
                        ))}
                    </TextField>
                ))}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="secondary">Cancel</Button>
                <Button onClick={handleFormSubmit} variant="contained" sx={{ backgroundColor:"var(--btn-color)"}}>Submit</Button>
            </DialogActions>
        </Dialog>
    );
}

export default Popup;
