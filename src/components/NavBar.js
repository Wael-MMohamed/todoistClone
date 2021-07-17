import { Link } from "react-router-dom"

export default function NavBar(){
    
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <Link className="navbar-brand" to='/'>Todoist</Link>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li>
                        <button className='btn' ><i className="fal fa-bars"></i></button>
                    </li>
                    <li className="nav-item">
                    <Link className="nav-link active" to='/'>Home</Link>
                    </li>
                </ul>
                    <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                    <button className="btn btn-outline-success" type="submit">Search</button>
                </div>
            </div>
        </nav>
    )
}