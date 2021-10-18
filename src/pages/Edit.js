import EditTask from "../components/EditTask";
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
                <EditTask task_id = {task_Id}/>
            </Container>
            
        </div>
    )
}