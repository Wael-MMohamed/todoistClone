import Comments from "../components/comments/Comments";
import Layout from "../components/Layout";
import { Container, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
    main: {
        marginTop: 80,
        marginLeft: 240
    }
}));


export default function Comment ({match}){

    const task_Id = Number(match.params.id);
    const classes = useStyles();

    return (
        <div>
            <Layout />
            <Container className={classes.main}>
                <Comments task_id = {task_Id}/>
            </Container>
            
        </div>
    )
}