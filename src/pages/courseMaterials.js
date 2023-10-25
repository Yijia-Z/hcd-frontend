import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactTable from "react-table-6";
import "react-table-6/react-table.css";

export function isValidUser(user) {
    return /[a-zA-Z0-9!#$%^&*()_]+/.test(user);
}

function ExportMaterials() {
    const [database, setDatabase] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get("https://hcd-e14b67ea1cbd.herokuapp.com/searchMats");
                setDatabase(response.data);
            } catch (error) {
                console.log(error);
            }
        }

        fetchData();
    }, []); // Run this effect only once when the component mounts

    // Renders a table with the course data using react-table-6.
    return (
        <main>
            <div className="courseBox">
                <ReactTable
                    data={database}
                    columns={[
                        {
                            Header: "Material List",
                            style: {
                                textAlign: "center",
                                fontSize: "15px",
                                fontWeight: "semi-bold",
                                transition: "all .2s ease-out",
                            },
                            columns: [
                                {
                                    Header: "Course Number",
                                    accessor: "CourseNum",
                                    style: {
                                        textAlign: "center",
                                        fontSize: "15px",
                                        transition: "all .2s ease-out",
                                    },
                                    minWidth: 25,
                                    maxWidth: 300,
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
                                    minWidth: 100,
                                    maxWidth: 600,
                                },
                                {
                                    Header: "Link",
                                    accessor: "Link",
                                    Cell: (row) => (
                                        <a href={row.original.Link} target="_blank" rel="noopener noreferrer">
                                            {row.original.Link}
                                        </a>
                                    ),
                                    style: {
                                        textAlign: "center",
                                        fontSize: "15px",
                                        transition: "all .2s ease-out",
                                        whiteSpace: "pre-line",
                                        minWidth: 100,
                                        maxWidth: 300,
                                    },
                                },
                            ],
                        },
                    ]}
                    defaultPageSize={10}
                    style={{
                        width: "1250px",
                        FontFace: "itim",
                        height: "600px",
                    }}
                    className="-striped -highlight"
                    resizable={true}
                />
                <br />
                <h2 style={{ alignContent: "left" }}>
                    Other people found helpful
                </h2>
                <ReactTable
                    data={database}
                    columns={[
                        {
                            Header: "Material List",
                            style: {
                                textAlign: "center",
                                fontSize: "15px",
                                fontWeight: "semi-bold",
                                transition: "all .2s ease-out",
                            },
                            columns: [
                                {
                                    Header: "Course Number",
                                    accessor: "CourseNum",
                                    style: {
                                        textAlign: "center",
                                        fontSize: "15px",
                                        transition: "all .2s ease-out",
                                    },
                                    minWidth: 25,
                                    maxWidth: 300,
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
                                    minWidth: 100,
                                    maxWidth: 600,
                                },
                                {
                                    Header: "Link",
                                    accessor: "Link",
                                    Cell: (row) => (
                                        <a href={row.original.Link} target="_blank" rel="noopener noreferrer">
                                            {row.original.Link}
                                        </a>
                                    ),
                                    style: {
                                        textAlign: "center",
                                        fontSize: "15px",
                                        transition: "all .2s ease-out",
                                        whiteSpace: "pre-line",
                                        minWidth: 100,
                                        maxWidth: 300,
                                    },
                                },
                            ],
                        },
                    ]}
                    defaultPageSize={10}
                    style={{
                        width: "1250px",
                        FontFace: "itim",
                        height: "600px", // This will force the table body to overflow and scroll, since there is not enough room
                    }}
                    className="-striped -highlight"
                    resizable={true}
                />
            </div>
        </main>
    );
}

export default ExportMaterials;
