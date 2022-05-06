import React from "react";
import axios from "axios";
import base64 from "base-64";
import OwnerContactInfo from "./OwnerContactInfo";


interface IProps {
    code: string,
}

interface IStates {
    owner: string,
    ContactInformation: [{ type: string, value: string }],
    code: string,
}


export default class CodeInput extends React.Component<IProps, IStates> {

    constructor(props: IProps) {
        super(props);

        if (this.props.code == undefined) {
            this.state = {
                owner: "",
                ContactInformation: [],
                code: "",
            }
        } else {
            this.state = {
                owner: "",
                ContactInformation: [],
                code: this.props.code,
            }
        }
    }

    async componentDidMount() {
        if (this.state.code != "" && this.state.code != undefined) {
            await this.fetch_contact_info_from_code()
        }
    }

    update_code(event) {
        this.setState({ContactInformation: [{type: "", value: ""}], owner: "", "code": event.target.value})
    }

    async fetch_contact_info_from_code() {
        let response = await axios.get(`http://localhost:3001/item/code/` + this.state.code)
        this.setState({code: this.state.code, owner: response.data.user, ContactInformation: response.data.contact_info})
    }

    render() {
        return (
            <>
                <div className={"code_input"}>
                    <h1>Ange Prylkod</h1>
                    <p>Här kan du ange prylkod för att hitta kontakt information till ägaren av prylen du har hittat.</p>
                    <input className={"input"} value={this.state.code} onChange={(e) => this.update_code(e)} type={"text"}
                           placeholder={"Ange Sak Kod För Att Hitta Ägare"}/>
                    <button className={"button"} onClick={async () => {await this.fetch_contact_info_from_code()}}>Hitta Ägare</button>
                    {this.state.owner != "" && (
                        <OwnerContactInfo owner={this.state.owner} ContactInformation={this.state.ContactInformation}/>
                    )}
                </div>

            </>
        );
    }
}