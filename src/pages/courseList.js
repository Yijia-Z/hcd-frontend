import { React, useState, useEffect } from "react";
import axios from "axios";
import ReactTable from "react-table-6";

export function isValidUser(user) {
    return /[a-zA-Z0-9!#$%^&*()_]+/.test(user);
}

function CourseList() {

    const [database, setDatabase] = useState([]);
    const [checkboxes, setCheckboxes] = useState({
        "Animals": true,
        "Art and Design": true,
        "Business": true,
        "Communication and Language": true,
        "Education": true,
        "Environment": true,
        "Health and Wellness": true,
        "Math and Science": true,
        "Media": true,
        "People, Cultures, Ideas": true,
        "Performance": true,
        "Plants": true,
        "Social Policies and Issues": true,
        "Technology": true
    })

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get("https://hcd-e14b67ea1cbd.herokuapp.com/search");
                setDatabase(response.data);
            } catch (error) {
                console.log(error);
            }
        }

        fetchData();
    }, []); // Run this effect only once when the component mounts

    const handleSave = async (row) => {
        const save = row.isSaved === "false" ? "true" : "false";

        try {
            await axios.get("https://hcd-e14b67ea1cbd.herokuapp.com/save", {
                params: {
                    courseNum: row.CourseNum,
                    professor: row.Professor,
                    save: save,
                },
            });

            // Update the database state after a successful save request
            const updatedDatabase = database.map((item) => {
                if (item.CourseNum === row.CourseNum && item.Professor === row.Professor) {
                    return { ...item, isSaved: save };
                }
                return item;
            });

            setDatabase(updatedDatabase);
        } catch (error) {
            console.log(error);
        }
    };

    const handleCheckboxChange = (checkboxName) => {
        setCheckboxes({
            ...checkboxes,
            [checkboxName]: !checkboxes[checkboxName],
        });
    };

    const handleSelectAll = () => {
        const allChecked = Object.values(checkboxes).every((isChecked) => isChecked);
        const updatedCheckboxes = {};

        for (const key in checkboxes) {
            updatedCheckboxes[key] = !allChecked;
        }

        setCheckboxes(updatedCheckboxes);
    };

    const allChecked = Object.values(checkboxes).every((isChecked) => isChecked);

    const filteredData = database.filter((item) => {
        // Assuming the "Tags" field is a string with comma-separated values
        const tags = item.Tags.split(', ');
        return tags.some((tag) => checkboxes[tag]);
    });

    // renders a table with the course data using react-table-6. 
    return (
        <main2>
            <spacer />
            <div className='courseBox'>
                <><ReactTable
                    data={filteredData}
                    columns={[
                        {
                            Header: "Course List",
                            style: {
                                textAlign: "center",
                                fontSize: "15px",
                                fontWeight: 'semi-bold',
                                transition: 'all .2s ease-out'
                            },
                            Filter: ({ filter, onChange }) => (
                                <input
                                    onChange={event => onChange(event.target.value)}
                                    value={filter ? filter.value : ''}
                                    style={{
                                        width: "100%",
                                        backgroundColor: 'grey',
                                    }}
                                />
                            ),

                            columns: [
                                {
                                    Header: "Course Number",
                                    accessor: "CourseNum",
                                    style: {
                                        textAlign: "center",
                                        fontSize: "15px",
                                        transition: 'all .2s ease-out',

                                    }
                                },
                                {
                                    Header: "Name",
                                    accessor: "Name",
                                    style: {
                                        textAlign: "center",
                                        fontSize: "15px",
                                        transition: 'all .2s ease-out',
                                        whiteSpace: "pre-line",
                                    },
                                },
                                {
                                    Header: "Professor",
                                    accessor: "Professor",
                                    style: {
                                        textAlign: "center",
                                        fontSize: "15px",
                                        transition: 'all .2s ease-out',
                                        whiteSpace: "pre-line",
                                    }



                                },
                                {
                                    Header: "Tags",
                                    accessor: "Tags",
                                    style: {
                                        textAlign: "center",
                                        fontSize: "15px",
                                        transition: 'all .2s ease-out',
                                        whiteSpace: "pre-line",
                                    },
                                },
                                {
                                    Header: "Save",
                                    Cell: (row) => (
                                        <div style={{ display: "flex", justifyContent: "center" }}>
                                            <button onClick={() => handleSave(row.original)}>
                                                {row.original.isSaved === "true" ? "Unsave" : "Save"}
                                            </button>
                                        </div>
                                    ),
                                },
                            ],
                        },
                    ]}
                    defaultPageSize={10}

                    style={{
                        width: "1250px",
                        FontFace: "itim",
                        height: "600px" // This will force the table body to overflow and scroll, since there is not enough room
                    }}
                    className="-striped -highlight" /><br /></>
            </div>
            <div className="spacer" style={{ minWidth: 10 }}></div>
            <div className="checkBox">
                <h1 style={{ textAlign: "center" }}>
                    Tags:
                </h1>
                {Object.entries(checkboxes).map(([checkboxName, isChecked]) => (
                    <div key={checkboxName} className={checkboxName}>
                        <label>
                            <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={() => handleCheckboxChange(checkboxName)}
                            />
                            {checkboxName}
                        </label>
                    </div>
                ))}
                <div className="selectAllCheckbox">
                    <label>
                        <input
                            type="checkbox"
                            checked={allChecked}
                            onChange={handleSelectAll}
                        />
                        Select All
                    </label>
                </div>
            </div>
        </main2>

    );


}

export default CourseList;


