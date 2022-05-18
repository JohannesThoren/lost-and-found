import {
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    TextField,
    Typography
} from "@mui/material";
import {useState} from "react";

export default function (params: {}) {

    const [type, setType] = useState('')

    const handleChange = (event: SelectChangeEvent) => {
        setType(event.target.value);
    };

    return (
        <>
            <Typography variant={"h4"}>Lägg till kontakt information</Typography>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Typ av kontakt sätt</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={type}
                    label="Type Of Contact Info"
                    onChange={handleChange}
                >
                    <MenuItem value={'phone'}>Mobil Numer</MenuItem>
                    <MenuItem value={'email'}>Email Address</MenuItem>
                    <MenuItem value={'social media'}>Socialt Media Konto</MenuItem>
                </Select>
                {type == 'social media' ? (
                    <>
                        <TextField label={"Socialt media t.ex facebook"}></TextField>
                        <TextField label={"Konto Namn"}></TextField>
                    </>

                ) : (
                    <TextField label={"Mobil Numer eller Email Address"}></TextField>

                )}
                <Button variant={"contained"}>Spara</Button>
            </FormControl>


        </>

    )
}