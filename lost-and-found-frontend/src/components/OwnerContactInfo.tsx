import React from "react";
import axios from "axios";
import base64 from "base-64";
import Nav from "./Nav";
import CodeInput from "./CodeInput";

interface IProps {
    owner: string,
    ContactInformation: [{ type: string, value: string, id: number }]
}

interface IStates {


}

export default class OwnerContactInfo extends React.Component<IProps, IStates> {
    constructor(props: IProps) {
        super(props);

    }


    render() {
        return (
            <>
                <div className={"contact-info"}>
                    <h2>{this.props.owner}'s Kontakt Information</h2>
                    <p>Använd nedanstående kontaktinformation för att kontakta ägaren och berätta att du har hittat hens
                        pryl.
                        Ett mail kommer att skickas till hen med den gps position du hade när du skannade qr-koden</p>
                    <div className={"items"}>
                        {this.props.ContactInformation.map((v, i) => {
                            return (
                                <div key={i} className={"item"}>
                                    <p className={"type"}>{v.type}</p>
                                    <p>{v.value}</p>
                                </div>
                            )
                        })}
                    </div>
                </div>

            </>
        );
    }
}