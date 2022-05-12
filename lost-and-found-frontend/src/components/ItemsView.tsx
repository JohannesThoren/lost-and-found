import Item from "./Item";
import NewItem from "./NewItem";

export default function ItemsView(props: { items: [{ name: string, description: string, uuid: string, code: string }] }) {

    return (
        <>
            <h2>Dina Prylar</h2>
            <NewItem/>
            {props.items.map((item,index) => {
                    return (
                        <>
                            <Item key={item.uuid} item={item}/>
                        </>
                    )
                }
            )}
        </>
    )
}