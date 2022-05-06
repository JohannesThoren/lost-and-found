import React from "react";
import axios from "axios";
import base64 from "base-64";
import {Link} from "react-router-dom";

interface IProps {
}

interface IStates {
    SignedIn: boolean
}

export default class Nav extends React.Component<IProps, IStates> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            SignedIn: false
        }
    }


    render() {
        return (
            <div className={"nav"}>
                <div className={"item"}>
                    <Link to={"/about"}>About</Link>
                    <Link to={"/contact"}>Contact</Link>
                </div>
                {this.state.SignedIn ? (
                        <div className={"item"}>
                            <Link to={"/me"}>Profile</Link>
                        </div>

                    )
                    : (
                        <div className={"item"}>
                            <Link to={"/signin"}>Sign In</Link>
                            <Link to={"/signup"}>Sign Up</Link>
                        </div>
                    )}
            </div>
        );
    }
}