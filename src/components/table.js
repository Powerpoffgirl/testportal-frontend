import React from "react";
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";
import "./Table.css";

export const Table = ({ rows, deleteRow, editRow }) =>
{
    return (
        <div>
            <div className="table-wrapper" style={{ height: 420 }}>
                <table className="table">
                    <thead>
                        <tr>
                            <th className="expand">Test</th>
                            <th className="expand">Test Code</th>
                            <th className="expand">Department</th>
                            <th className="expand">Sample Type</th>
                            <th className="expand">Cost</th>
                            <th className="expand">Units</th>
                            <th className="expand">Bio.Ref.</th>
                            <th className="expand">Technology</th>
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
                                    <td style={{ textAlign: 'center' }}>{row.testName}</td>
                                    <td style={{ textAlign: 'center' }}>{row.testCode}</td>
                                    <td style={{ textAlign: 'center' }}>{row.department}</td>
                                    <td style={{ textAlign: 'center' }}>{row.sampleType}</td>
                                    <td style={{ textAlign: 'center' }}>{row.costOfDiagnosticTest}</td>
                                    <td style={{ textAlign: 'center' }}>{row.unit}</td>
                                    <td style={{ textAlign: 'center' }}>{row.bioRefInterval}</td>
                                    <td style={{ textAlign: 'center' }}>{row.technology}</td>
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
        </div>
    );
};
