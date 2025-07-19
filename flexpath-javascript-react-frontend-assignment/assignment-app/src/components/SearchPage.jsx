import { useState, useEffect } from 'react';
import DashBoard from './DashBoard';
import Table from './Table';

//Window.searchPageState is global browser storage. The data only last as long as the browser is open.
//we are going to save it in searchState. 
function SearchPage() {
    const getSavedState = () => {
        try {
            const saved = window.searchPageState;
            return saved ? saved : {
                data: [],
                loading: false,
                error: null,
                filterType: 'Gender',
                keyword: '',
                appliedKeyword: '',
                hasSearched: false
            };
        } catch (error) {
            return {
                data: [],
                loading: false,
                error: null,
                filterType: 'Gender',
                keyword: '',
                appliedKeyword: '',
                hasSearched: false
            };
        }
    };

    // To make the last search result stay, I created another useState.
    const [searchState, setSearchState] = useState(getSavedState);

    const {data, loading, error, filterType, keyword, appliedKeyword, hasSearched} = searchState;

    //I made two useEffect: one is for save search result whenever there's change 
    // and the other is for the initial loading when there's no search result.
    //Whenever there's change in searchState, this useEffect will be triggered and save again.
    //But don't save errors to persistent storage
    useEffect(() => {
        const { error, ...stateWithoutError } = searchState;
        window.searchPageState = stateWithoutError;
    }, [searchState]);

    useEffect(() => {
        if (appliedKeyword !== '' || (appliedKeyword === '' && hasSearched)) {
            fetchData();
        }
    }, [appliedKeyword]);

    const fetchData = async () => {
        setSearchState(prev => ({ ...prev, loading: true, error: null }));

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
            setSearchState(prev => ({ 
                ...prev, 
                data: result, 
                loading: false, 
                hasSearched: true 
            }));
        } catch (err) {
            setSearchState(prev => ({ 
                ...prev, 
                error: err.message, 
                data: [], 
                loading: false 
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSearchState(prev => ({ 
            ...prev, 
            appliedKeyword: keyword,
            hasSearched: true 
        }));
    };

    const filterTypeChange = (e) => {
        setSearchState(prev => ({
            ...prev,
            filterType: e.target.value,
            keyword: ''
        }));
    };

    const handleKeywordChange = (e) => {
        //this will take the existing array using spread method and overwrite the keyword and value because this keyword already exist. 
        setSearchState(prev => ({ ...prev, keyword: e.target.value }));
    };

    if (error) {
        return (
            <div className="alert alert-danger text-center">
                <strong>Error: </strong>{error}
            </div>
        );
    }

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
                                onChange={handleKeywordChange}
                                style={{ width: "250px" }}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary rounded shadow-sm">Search</button>
                    </form>

                    <p className="mb-0 text-muted">
                        {loading ? `Loading ...` : recordsDisplayedNumber === 0
                            ? hasSearched ? 'No Records To Display' : 'Enter search criteria above'
                            : `Displaying ${recordsDisplayedNumber} records`}
                    </p>
                </div>
            </fieldset>

            {hasSearched && !loading && <DashBoard data={data} />}
            {hasSearched && !loading && <Table data={data} />}
            
            {loading && (
                <div className="d-flex justify-content-center align-items-center p-5">
                    <div className="spinner-border text-primary me-3" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <p className="lead mb-0">Loading data...</p>
                </div>
            )}
        </div>
    );
}

export default SearchPage;