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
import {api_post} from "../api-calls";
import get_cookie from "../get_cookie";
import {useNavigate} from "react-router";

export default function (params: {}) {


    const [type, setType] = useState('')
    const [value, setValue] = useState('')
    const [socialMedia, setSocialMedia] = useState('')

    const valueChange = (event: SelectChangeEvent) => {
        setValue(event.target.value)
    }

    const socialMediaChange = (event: SelectChangeEvent) => {
        setSocialMedia(event.target.value + " ")
    }

    const handleChange = (event: SelectChangeEvent) => {
        setType(event.target.value);
    };

    const sendRequest = async () => {
        let body = {type: type, value: socialMedia + value}
        let response = await api_post(body, `/contact/add/${get_cookie('token')}`)

        console.log(response)
        window.location.reload()
    }

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
                        <TextField onChange={socialMediaChange} label={"Socialt media t.ex facebook"}></TextField>
                        <TextField onChange={valueChange} label={"Konto Namn"}></TextField>
                    </>

                ) : (
                    <TextField onChange={valueChange} label={"Mobil Numer eller Email Address"}></TextField>
                )}
                <Button onClick={async () => await sendRequest()} variant={"contained"}>Spara</Button>
            </FormControl>


        </>

    )
}