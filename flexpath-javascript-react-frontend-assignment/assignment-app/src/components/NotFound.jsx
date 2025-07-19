import { Link } from 'react-router-dom';

function NotFound(){
    return (
        <div className="alert alert-warning" role="alert">
            <h1>404 Not Found...  Click here to go back to  <Link to="/">Home</Link></h1>
        </div>
    );
}

export default NotFound;