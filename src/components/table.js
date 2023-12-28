import React from "react";
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";
import "./Table.css";

export const Table = ({ rows, deleteRow, editRow }) =>
{
    return (
        <div className="table-wrapper">
            <table className="table">
                <thead>
                    <tr>
                        <th className="expand">Test</th>
                        <th className="expand">testCode</th>
                        <th className="expand">department</th>
                        <th className="expand">sampleType</th>
                        <th className="expand">cost</th>
                        <th className="expand">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row, idx) =>
                    {
                        const statusText = row.status
                            ? row.status.charAt(0).toUpperCase() + row.status.slice(1)
                            : '';

                        return (
                            <tr key={idx}>
                                <td>{row.testName}</td>
                                <td>{row.testCode}</td>
                                <td>{row.department}</td>
                                <td>{row.sampleType}</td>
                                <td>{row.costOfDiagnosticTest}</td>
                                <td className="fit">
                                    <span className="actions">
                                        <BsFillTrashFill
                                            className="delete-btn"
                                            onClick={() => deleteRow(idx)}
                                        />
                                        <BsFillPencilFill
                                            className="edit-btn"
                                            onClick={() => editRow(idx)}
                                        />
                                    </span>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div >
    );
};
