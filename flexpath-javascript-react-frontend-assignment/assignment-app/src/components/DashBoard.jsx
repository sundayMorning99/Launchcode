
function DashBoard({data}){
    //This is a typical example of reduce data.reduce((p,n)=>p+n,0).
    //I make it a function to reuse it.
    const average = (field) => {
        if (!data || data.length === 0) return 0; 
        return parseFloat(
            data.reduce((p, row) => p + parseFloat(row[field] || 0), 0) / data.length).toFixed(2);};

    //Median is a middle number when in sorted list of numbers. If there are even number of numbers, the average of the middle two numbers is median
    //But, wait! Because an array is zero-based, the two middle numbers are sorted[mid-1] and sorted[mid], not sorted[mid] and sorted[mid+1].
    const median = (field) => {
        if (!data || data.length === 0) return 0;
        const sorted = data.map(row => parseFloat(row[field] || 0)).sort((a, b) => a - b);
        const mid = Math.floor(sorted.length / 2);
        const med = sorted.length % 2 === 1 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;

        return med.toFixed(2);
    };

    return (
        <div className="row mb-4 text-center">
            <div className="col">
                <div className="card p-3 shadow-sm">
                    <h5>App Usage Time (min/day)</h5>
                    <p>{(!data || data.length === 0) ? `Average - 0 Minute` : `Average - ${average("App Usage Time (min/day)")} Minutes`}</p>
                    <p>{(!data || data.length === 0) ? `Median - 0 Minute` : `Median - ${median("App Usage Time (min/day)")} Minutes`}</p>
                </div>
            </div>
            <div className="col">
                <div className="card p-3 shadow-sm">
                    <h5>Screen On Time (hours/day)</h5>
                    <p>{(!data || data.length === 0) ? `Average - 0 Hour` : `Average - ${average("Screen On Time (hours/day)")} Hours`}</p>
                    <p>{(!data || data.length === 0) ? `Median - 0 Hour` : `Median - ${median("Screen On Time (hours/day)")} Hours`}</p>
                </div>
            </div>
            <div className="col">
                <div className="card p-3 shadow-sm">
                    <h5>Number of Apps Installed</h5>
                    <p>{(!data || data.length === 0) ? `Average - 0 App` : `Average - ${average("Number of Apps Installed")} Apps`}</p>
                    <p>{(!data || data.length === 0) ? `Median - 0 App` : `Median - ${median("Number of Apps Installed")} Apps`}</p>
                </div>
            </div>
            <div className="col">
                <div className="card p-3 shadow-sm">
                    <h5>Age</h5>
                    <p>{(!data || data.length === 0) ? `Average - 0 Year Old` : `Average - ${average("Age")} Years Old`}</p>
                    <p>{(!data || data.length === 0) ? `Median - 0 Year Old` : `Median - ${median("Age")} Years Old`}</p>
                </div>
            </div>
        </div>
    );
  }

  export default DashBoard;