import { useState, useEffect } from 'react';
import DashBoard from './DashBoard';
import Table from './Table';

function SearchPage() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null);
    const [filterType, setFilterType] = useState('Gender');
    const [keyword, setKeyword] = useState('');
    const [appliedKeyword, setAppliedKeyword] = useState('');

     //to start the filtering when submit button is clicked(not as I type), I added another useState and variable.
    const currentFilterKey = filterType;

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true); 
                const response = await fetch('./api/data/search'); 
                if (!response.ok) {
                    throw new Error(`Failed to download data! Status: ${response.status}`);
                }
                const result = await response.json();
                setData(result);
                setError(null); 
            } catch (err) {
                setError(err.message);
                setData([]); 
            } finally {
                setLoading(false); 
            }
        };
        fetchData();
    }, []); 

    //Form submit triggers re-rendering by default and initialize states. This is why we use .preventDefault().    
    const handleSubmit = (e) => {
        e.preventDefault();
        setAppliedKeyword(keyword);
    };

    //This will keep table to the whole records instead of blank.
    const filterTypeChange = (e) => {
        setFilterType(e.target.value);
        setAppliedKeyword(''); 
    };


    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center min-vh-100">
                <p className="lead">Loading data...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="alert alert-danger text-center">
                <strong>Error: </strong>{error} 
            </div>
        );
    }

    // To pass the array with only data matching the filterType (currentFilterKey).
    const matchingData = data.filter(item => {
        if (appliedKeyword.trim() === '') {
            return true; 
        }
        const value = item[currentFilterKey];

        // check if there's any null or undefined data and use toLowerCase().Trim() to remove spaces and to make this case-insensitive.
        //Initially, I used '.include()' then all filtering was working except 'Gender - Male' because 'male' is a part of 'female', 'female' also returns true.
        return value !== undefined && value !== null
            ? String(value).toLowerCase().trim() === appliedKeyword.toLowerCase().trim()
            : false;
    });

    //To display text based on the number of filtered data inside of return(), I calculate the data length.
    const matchingDataNumber = matchingData.length;
    console.log("SearchPage: Matching data length (after filter):", matchingDataNumber);


    return (
        <div>
            <fieldset className="mb-3 border p-4 rounded"> 
                <legend className="float-none w-auto px-2">Filter Options</legend>

                <div className="d-flex align-items-end gap-3 flex-wrap">
                    <div className="d-flex flex-row align-items-center gap-2">
                        <span className="text-muted">Category</span>
                        <select style={{ width: "250px" }} className="form-select" value={filterType} onChange={filterTypeChange}>
                            <option value="Gender">Gender</option>
                            <option value="Operating System">Operating System</option>
                            <option value="Device Model">Device Model</option>
                            <option value="User Behavior Class">User Behavior Class</option>
                        </select>
                    </div>

                    <form className="d-flex align-items-end gap-3" onSubmit={handleSubmit}>
                        <div className="d-flex flex-row align-items-center gap-2">
                            <span className="text-muted">Keyword</span>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search"
                                value={keyword}
                                onChange={e => setKeyword(e.target.value)}
                                style={{ width: "250px" }}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">Search</button>
                    </form>

                    <p className="mb-0 text-muted">
                        {loading ? `Loading ...` : matchingDataNumber === 0
                            ? 'No Records To Display'
                            : `Displaying ${matchingDataNumber} records`}
                    </p>
                </div>
            </fieldset>

            <DashBoard data={matchingData} />
            <Table data={matchingData} />
        </div>
    );
}
export default SearchPage;
