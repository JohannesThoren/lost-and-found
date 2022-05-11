import Item from "./Item";
import NewItem from "./NewItem";

export default function ItemsView(props: { items: [{ name: string, description: string, uuid: string }] }) {
    return (
        <>
            <div>
                <h2>Dina Prylar</h2>
                <NewItem/>
                {props.items.map((item, index) => {
                    return (
                        <Item item={item} key={item.uuid}/>
                    )
                })}
            </div>



        </>
    )
}