import React from  "react";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

export default function TodoAppBar() {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6">TO DO Lisit</Typography>
            </Toolbar>
        </AppBar>
    );
};