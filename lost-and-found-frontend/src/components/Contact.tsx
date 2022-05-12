import {useState} from "react";

export default function Contact(props: { contactinfo: { type: string, value: string, id: number } }) {

    const [isEditMode, setEditMode] = useState(false);
    const [value, setValue] = useState(props.contactinfo.value);
    const [type, setType] = useState(props.contactinfo.type);

    return (
        <>
            {isEditMode ? (
                <div>
                    <input type="text" value={type} onChange={(e) => setType(e.target.value)}/>
                    <input type="text" value={value} onChange={(e) => setValue(e.target.value)}/>
                    <button onClick={() => {
                        setEditMode(false);
                        props.contactinfo.value = value;
                        props.contactinfo.type = type;
                    }}>Save
                    </button>
                </div>
            ) : (
                <div>
                    <p>{type}</p>
                    <p>{value}</p>
                    <button onClick={() => setEditMode(true)}>Redigera</button>
                    <button>Ta Bort</button>
                </div>
            )}

        </>
    )
}