function Home() {
    const longText = `This dataset provides a comprehensive analysis of mobile device usage patterns and user behavior classification. It contains 700 samples
                    of user data, including metrics such as app usage time, screen-on time, battery drain, and data consumption. Each entry is categorized into 
                    one of five behavior classes, ranging from light to extreme usage, aloowing for insightful analysis and modeling.`;

    //In case we add more text lines, I created an array before using Array.map().
    const fieldDescription = [];
    fieldDescription.push({ "id": 1, "text": "User ID: Unique identifier for each user." });
    fieldDescription.push({ "id": 2, "text": "Device Model: Model of the user's smartphone." });
    fieldDescription.push({ "id": 3, "text": "Operating System: The OS of the device (iOS or Android)." });
    fieldDescription.push({ "id": 4, "text": "App Usage Time: Daily time spent on mobile applications, measured in minutes." });
    fieldDescription.push({ "id": 5, "text": "Screen On Time: Average hours per day the screen is active." });
    fieldDescription.push({ "id": 6, "text": "Battery Drain: Daily battery consumption in mAh." });
    fieldDescription.push({ "id": 7, "text": "Number of Apps Installed: Total apps available on the device." });
    fieldDescription.push({ "id": 8, "text": "Data Usage: Daily mobile data consumption in megabytes." });
    fieldDescription.push({ "id": 9, "text": "Age: Age of the user." });
    fieldDescription.push({ "id": 10, "text": "Gender: Gender of the user (Male or Female)." });
    fieldDescription.push({ "id": 11, "text": "User Behavior Class: Classification of user behavior based on usage patterns (1 to 5)." });

    return (
        <div className="d-flex justify-content-center align-items-ceter min-vh-100">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-10">
                        <div className="mb-4 border border-info  p-4">
                            <h1 className="lead">User Behavior Dataset</h1>
                            <p>{longText}</p>
                        </div>
                        <br/>
                        <br/>
                        <div className="mb-4">
                            <h2>Key Features:</h2>
                            <ul className="list-group list-group-flush">
                                {fieldDescription.map(item => (
                                    <li className="list-group-item" key={item.id}>{item.text}</li>
                                ))}
                            </ul>
                        </div>
                        <div className="mb-4 text-center">
                            <a className="btn btn-link" href="https://www.kaggle.com/datasets/valakhorasani/mobile-device-usage-and-user-behavior-dataset?resource=download">Sourced from this Kaggle Dataset</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Home;