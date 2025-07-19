import { Link } from 'react-router-dom';
function NavBar() {
    return (
        <header className="sticky-top">
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <div className="container-fluid">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item"><Link to="/" className="nav-link">User Behavior Data</Link></li>
                        <li className="nav-item"><Link to="/search" className="nav-link">Search Through Dataset</Link></li>
                    </ul>
                </div>
            </nav>
        </header>
    )
}

export default NavBar;