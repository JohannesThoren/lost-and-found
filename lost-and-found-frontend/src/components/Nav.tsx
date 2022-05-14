import {AppBar, Box, Button, ButtonGroup, IconButton, Link, Toolbar, Typography} from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export default function Nav(props: { isSignedIn: boolean, setSignedOut: () => void }) {

    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        Lost n' Found
                    </Typography>
                    <Box columnGap={"1rem"} display={"flex"} sx={{alignItems: "center"}}>
                        <Link variant={"button"} underline={"hover"} color={"white"} href={"/"}>Hem</Link>
                        <Link variant={"button"} underline={"hover"} color={"white"} href={"/about"}>Om Oss</Link>
                        <Link variant={"button"} underline={"hover"} color={"white"} href={"/contact"}>Kontakta
                            oss</Link>

                        {props.isSignedIn ? (
                            <>
                                <Link sx={{display: "flex", columnGap: ".4rem"}} variant={"button"} underline={"none"}
                                      color={"white"} href={"/me"}> <AccountCircleIcon/> Profil </Link>
                                <Link href={"/"} onClick={() => props.setSignedOut()} variant={"button"} underline={"hover"}
                                      color={"white"}>Logga
                                    Ut</Link>
                            </>
                        ) : (
                            <>
                                <Link variant={"button"} underline={"hover"} color={"white"} href={"/signin"}>Logga
                                    In</Link>
                                <Link variant={"button"} underline={"hover"} color={"white"} href={"/signin"}>Skapa
                                    Konto</Link>
                            </>
                        )}
                    </Box>

                </Toolbar>
            </AppBar>
        </Box>
    )
}