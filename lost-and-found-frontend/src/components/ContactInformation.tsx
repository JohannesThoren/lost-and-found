import Contact from "./Contact";
import {List, ListItem, Typography} from "@mui/material";
import React from "react";
import AddContactInfo from "./AddContactInfo";

export default function ContactInformation(props: { contactinfo: { type: string, value: string, id: number }[] }) {


    return (
        <>

            <div className="contact-information">
                <Typography variant={"h4"}>Din Kontakt Information</Typography>
                <List>
                    {props.contactinfo && props.contactinfo.map((ci, index) => {
                        return (
                            <ListItem key={'ci' + index}>
                                <Contact contactinfo={ci}/>

                            </ListItem>
                        )
                    })}
                    {!props.contactinfo && (
                        <>
                            <Typography color={"red"}>du har inte lagt in någon kontakt information. För att personer ska kunna
                                kontakta dig om de hittar dina prylar måste du ha lagt in kontakt
                                informatin. Gör det under "Lägg till kontakt information"</Typography>
                        </>
                    )}
                </List>
            </div>
            <AddContactInfo/>
        </>

    )
}