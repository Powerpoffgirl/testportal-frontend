import React, { useState } from "react";
import "./Modal.css";

export const Modal = ({ closeModal, onSubmit, defaultValue }) =>
{
    const [formState, setFormState] = useState(
        defaultValue || {
            testName: "",
            testCode: "",
            department: "",
            sampleType: "",
            costOfDiagnosticTest: "",
            unit: "",
            bioRefInterval: "",
            technology: "",

        }
    );
    const [errors, setErrors] = useState("");

    const validateForm = () =>
    {
        if (
            formState.testName &&
            formState.testCode &&
            formState.department &&
            formState.sampleType &&
            formState.costOfDiagnosticTest &&
            formState.unit &&
            formState.bioRefInterval &&
            formState.technology
        )
        {
            setErrors("");
            return true;
        } else
        {
            let errorFields = [];
            for (const [key, value] of Object.entries(formState))
            {
                if (!value)
                {
                    errorFields.push(key);
                }
            }
            setErrors(errorFields.join(", "));
            return false;
        }
    };

    const handleChange = (e) =>
    {
        setFormState({ ...formState, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) =>
    {
        e.preventDefault();

        if (!validateForm()) return;

        onSubmit(formState);

        closeModal();
    };

    return (
        <div
            className="modal-container"
            onClick={(e) =>
            {
                if (e.target.className === "modal-container") closeModal();
            }}
        >
            <div className="modal">
                <form>
                    <div className="form-group">
                        <label htmlFor="testName">Test</label>
                        <input
                            name="testName"
                            onChange={handleChange}
                            value={formState.testName}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="testCode">Test Code</label>
                        <input
                            name="testCode"
                            onChange={handleChange}
                            value={formState.testCode}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="department">Department</label>
                        <input
                            name="department"
                            onChange={handleChange}
                            value={formState.department}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="sampleType">Sample Type</label>
                        <input
                            name="sampleType"
                            onChange={handleChange}
                            value={formState.sampleType}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="costOfDiagnosticTest">Cost</label>
                        <input name="costOfDiagnosticTest" onChange={handleChange} value={formState.costOfDiagnosticTest} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="unit">Units</label>
                        <input name="unit" onChange={handleChange} value={formState.unit} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="bioRefInterval">Bio.Ref</label>
                        <input name="bioRefInterval" onChange={handleChange} value={formState.bioRefInterval} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="technology">Technology</label>
                        <input name="technology" onChange={handleChange} value={formState.technology} />
                    </div>
                    {errors && (
                        <div className="error">{`Please include: ${errors}`}</div>
                    )}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <button type="submit" style={{ color: 'white', height: 30, width: 60, backgroundColor: "#89CFF0", borderRadius: 10 }} onClick={handleSubmit}>
                            Submit

                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
