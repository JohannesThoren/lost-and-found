import {Link} from "react-router-dom";

export default function Nav(props: { isSignedIn: boolean }) {


    return (
        <div className={"nav"}>
            <div className={"field"}>
                <Link to={"/contact"}>Kontakta Oss</Link>
                <Link to={"/about"}>Om oss</Link>
            </div>
            <div className={"field"}>
                {props.isSignedIn ? (
                    <Link to={"/me"}>Profil</Link>
                ) : (
                    <>
                        <Link to={"/signin"}>Logga In</Link>
                        <Link to={"/signup"}>Skapa Konto</Link>
                    </>
                )}
            </div>
        </div>
    )
}