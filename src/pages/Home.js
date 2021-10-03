import Layout from "../components/Layout";
import TaskList from "../components/TaskList";


const drawerWidth = 240;


export default function Home(){


    return (
        <div>
            <Layout />
            <div style={{marginTop: 80, marginLeft: drawerWidth}}>
                    <TaskList />
            </div>
        </div>
    )
}