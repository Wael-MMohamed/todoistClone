import AddNewTask from "../components/AddNewTask";
import Layout from "../components/Layout";





export default function AddTask(){

    return (

        <div>
            <Layout />
            <div style={{marginTop: 80}}>
                <AddNewTask />
            </div>
        </div>
    )
}