import Contact from "./Contact";

export default function ContactInformation(props: { contactinfo: [{ type: string, value: string, id: number }] }) {


    return (
        <div className="contact-information">
            <h2>Kontakt Information</h2>
            {props.contactinfo.map((contactinfo, index) => {
                return (
                    <Contact contactinfo={contactinfo} key={index} />
                )
            })}
        </div>
    )
}