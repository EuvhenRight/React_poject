import { Button, TextField } from "@mui/material";
import { useEffect, useRef, useState } from "react";

export const Formnew = ({ onSubmit }) => {
    const [value, setValue] = useState('');
    const textFocus = useRef();

    const handleChange = (e) => {
        setValue(e.target.value);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(value);
        setValue(" ");
    };
    useEffect(() => {
        textFocus.current?.focus();

    }, []);

    return (
        <form onSubmit={handleSubmit}>
            <TextField value={value} inputRef={textFocus} onChange={handleChange} />
            <Button variant="contained">Отправить послание</Button>
        </ form >
    );
};