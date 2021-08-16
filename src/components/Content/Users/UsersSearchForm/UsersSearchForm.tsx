import React from 'react';
import {Field, Form} from "react-final-form";

let onSubmit = () => {}

const UsersSearchForm: React.FC = () => {
    return (
        <div>
            <Form
                onSubmit={onSubmit}
                render={({ handleSubmit, form, submitting, pristine, values }) => (
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label>First Name</label>
                            <Field
                                name="firstName"
                                component="input"
                                type="text"
                                placeholder="Enter here"
                            />
                        </div>
                            <button type="submit" disabled={submitting || pristine}>
                                Submit
                            </button>
                    </form>
                )}
            />
        </div>
    );
};

export default UsersSearchForm;