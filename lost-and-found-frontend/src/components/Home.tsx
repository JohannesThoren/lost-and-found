import React from "react";
import axios from "axios";
import base64 from "base-64";
import Nav from "./Nav";
import CodeInput from "./CodeInput";

interface IProps {
}

interface IStates {


}

export default class Home extends React.Component<IProps, IStates> {
    constructor(props: IProps) {
        super(props);

    }



    render() {
        return (
            <>
                <Nav/>
                <CodeInput/>
            </>
        );
    }
}