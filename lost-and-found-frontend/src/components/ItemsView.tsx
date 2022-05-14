import Item from "./Item";
import NewItem from "./NewItem";
import {Box, Typography} from "@mui/material";

export default function ItemsView(props: { items: { name: string, description: string, uuid: string, code: string }[] }) {

    return (
        <>

            <NewItem/>
            <Typography variant={"h4"}>Dina Prylar</Typography>
            <Typography variant={"subtitle1"}>Här kan du se all dina prylar men också lägga till ny</Typography>
            <Box sx={{
                display: 'flex',
                paddingTop: '.5rem',
                justifyContent: 'space-between',
                flexWrap: "wrap",
                rowGap: '.5rem'
            }}>

                {props.items && props.items.map((item, index) => {
                        return (

                            <Item key={index} item={item}/>

                        )
                    }
                )}
            </Box>
        </>

    )
}