function Table({ data }) {
    if (!data || data.length === 0) return;

    //Getting header field names from the first item. It doesn't have to be from the first item because each item has the same keys. 
    const headers = Object.keys(data[0]);

    const usFormat = new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
    });

    return (
        <div className="table-responsive">
            <table className="table table-bordered table-hover table-striped">
                <thead className="table-light">
                    <tr>
                        {headers.map((key) => (
                            <th key={key}>{key}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map(row => (
                        <tr key={row["User ID"]}>
                            {headers.map(header => (
                                //To create unique values, I added ${header} to row[]
                                <td key={`${row["User ID"]}-${header}`} className="text-center">
                                    {!isNaN(parseFloat(row[header]))
                                        ? usFormat.format(parseFloat(row[header]))
                                        : row[header].toString()}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Table;
