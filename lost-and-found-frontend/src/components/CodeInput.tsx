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
    hasContactInfo: boolean
}


export default class CodeInput extends React.Component<IProps, IStates> {

    constructor(props: IProps) {
        super(props);

        if (this.props.code == undefined) {
            this.state = {
                owner: "",
                ContactInformation: [],
                code: "",
                hasContactInfo: false
            }
        } else {
            this.state = {
                owner: "",
                ContactInformation: [],
                code: this.props.code,
                hasContactInfo: false
            }
        }
    }

    async componentDidMount() {
        if (this.state.code != "" && this.state.code != undefined) {
            await this.fetch_contact_info_from_code()
        }
    }

    update_code(event) {
        this.setState({"code": event.target.value})
    }

    async fetch_contact_info_from_code() {
        let response = await axios.get(`http://localhost:3001/item/code/` + this.state.code)
        console.log(response)

        this.state.ContactInformation = response.data
        this.setState({hasContactInfo:  this.state.ContactInformation.length > 0})
    }

    render() {
        return (
            <>
                <div>
                    <input value={this.state.code} onChange={(e) => this.update_code(e)} type={"text"}
                           placeholder={"Ange Sak Kod För Att Hitta Ägare"}/>
                    <button onClick={async () => {
                        await this.fetch_contact_info_from_code()
                    }}>Hitta Ägare
                    </button>
                    {this.state.hasContactInfo && (
                        <OwnerContactInfo owner={this.state.owner} ContactInformation={this.state.ContactInformation}/>
                    )}
                </div>

            </>
        );
    }
}