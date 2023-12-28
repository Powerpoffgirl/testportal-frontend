import React, { useState } from "react";
import "./Modal.css";

export const Modal = ({ closeModal, onSubmit, defaultValue }) =>
{
    const [formState, setFormState] = useState(
        defaultValue || {
            test: "",
            testCode: "",
            department: "",
            sampleType: "",
            cost: "",
        }
    );
    const [errors, setErrors] = useState("");

    const validateForm = () =>
    {
        if (
            formState.test &&
            formState.testCode &&
            formState.department &&
            formState.sampleType &&
            formState.cost
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
                        <label htmlFor="test">Test</label>
                        <input
                            name="test"
                            onChange={handleChange}
                            value={formState.test}
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
                        <label htmlFor="cost">Cost</label>
                        <input name="cost" onChange={handleChange} value={formState.cost} />
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
