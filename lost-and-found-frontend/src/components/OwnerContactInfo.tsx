import React from "react";
import axios from "axios";
import base64 from "base-64";
import Nav from "./Nav";
import CodeInput from "./CodeInput";

interface IProps {
    owner: string,
    ContactInformation: [{type: string, value: string}],
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
                <h2>{this.props.owner}'s Kontakt Information</h2>
                {this.props.ContactInformation.map((v, i) => {
                    return (
                        <div className={"item"}>
                            <h1>{v.id}</h1>
                            <p>{v.type}</p>
                            <p>{v.value}</p>
                        </div>
                    )
                }) }
            </>
        );
    }
}