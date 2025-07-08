
function Table({ data }) {
    if (!data || data.length===0) return;

    //Getting header field names from the first item. It doesn't have to be from the first item because each item has the same keys.  
    const headers = Object.keys(data[0]);

    return (
        <div className="table-responsive">
            <table className="table table-striped table-hover">
                <thead className="table-dark">
                    <tr>
                        {headers.map((header, index) => (
                            <th key={index} scope="col">{header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {headers.map((header, colIndex) => (
                                <td key={colIndex}>{row[header]}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Table;