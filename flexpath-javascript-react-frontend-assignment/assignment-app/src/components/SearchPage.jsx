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

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);

            let backendFilterType;
            switch (filterType) {
                case 'Gender':
                    backendFilterType = 'gender';
                    break;
                case 'Operating System':
                    backendFilterType = 'operatingsystem';
                    break;
                case 'Device Model':
                    backendFilterType = 'model';
                    break;
                case 'User Behavior Class':
                    backendFilterType = 'behaviorclass'; 
                    break;
                default:
                    backendFilterType = '';
            }

            let addressString = '';
            const searchArray = [];

            if (backendFilterType) {
                searchArray.push(`filterType=${encodeURIComponent(backendFilterType)}`);
            }
            if (appliedKeyword.trim() !== '') {
                searchArray.push(`keyword=${encodeURIComponent(appliedKeyword.trim())}`);
            }

            if (searchArray.length > 0) {
                addressString = `?${searchArray.join('&')}`;
            }

            const apiUrl = `./api/data/search${addressString}`;

            try {
                const response = await fetch(apiUrl);
                if (!response.ok) {
                    throw new Error(`Failed to fetch data! status: ${response.status}`);
                }
                const result = await response.json();
                setData(result);
            } catch (err) {
                setError(err.message);
                setData([]);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [filterType, appliedKeyword]); //useEffect will be triggered whenever there's a change in filterType and appliedKeyword.

    const handleSubmit = (e) => {
        e.preventDefault();
        setAppliedKeyword(keyword);
    };

    const filterTypeChange = (e) => {
        setFilterType(e.target.value);
        setKeyword('');
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

    //To calculate the number of records to display.
    const recordsDisplayedNumber = data.length;

    return (
        <div className="p-4">
            <fieldset className="mb-3 border p-4 rounded shadow-sm">
                <legend className="float-none w-auto px-2">Filter Options</legend>

                <div className="d-flex align-items-end gap-3 flex-wrap">
                    <div className="d-flex flex-row align-items-center gap-2">
                        <span className="text-muted">Category</span>
                        <select
                            style={{ width: "250px" }}
                            className="form-select rounded"
                            value={filterType}
                            onChange={filterTypeChange}
                        >
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
                                className="form-control rounded"
                                placeholder={
                                    filterType === 'Gender' ? 'male or female':
                                    filterType === 'Operating System' ? 'iOS or Android':
                                    filterType === 'Device Model' ? 'iPhone, Samsung, etc.':
                                    filterType === 'User Behavior Class' ? '1, 2, 3, 4, or 5':
                                    'Search'
                                }
                                value={keyword}
                                onChange={e => setKeyword(e.target.value)}
                                style={{ width: "250px" }}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary rounded shadow-sm">Search</button>
                    </form>

                    <p className="mb-0 text-muted">
                        {loading ? `Loading ...` : recordsDisplayedNumber === 0
                            ? 'No Records To Display'
                            : `Displaying ${recordsDisplayedNumber} records`}
                    </p>
                </div>
            </fieldset>

            <DashBoard data={data} />
            <Table data={data} />
        </div>
    );
}

export default SearchPage; 