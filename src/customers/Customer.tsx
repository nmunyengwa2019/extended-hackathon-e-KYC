import React, { useState } from 'react';

const Customer = () => {
    const [contact, setContact] = useState('');
    const [fullName, setFullName] = useState('');
    const [address, setAddress] = useState('');
    const [gender, setGender] = useState('');

    const handleContactChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setContact(e.target.value);
    };

    const handleFullNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFullName(e.target.value);
    };

    const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAddress(e.target.value);
    };

    const handleGenderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setGender(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();


        // Handle form submission logic here
    };

    return (
        <div>
            <h2>Create Customer</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Contact:</label>
                    <input type="text" value={contact} onChange={handleContactChange} />
                </div>
                <div>
                    <label>Full Name:</label>
                    <input type="text" value={fullName} onChange={handleFullNameChange} />
                </div>
                <div>
                    <label>Address:</label>
                    <input type="text" value={address} onChange={handleAddressChange} />
                </div>
                <div>
                    <label>Gender:</label>
                    <select value={gender} onChange={handleGenderChange}>
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                </div>
                <button type="submit">Create</button>
            </form>
        </div>
    );
};

const DeleteCustomer = () => {
    const [contact, setContact] = useState('');

    const handleContactChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setContact(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission logic here
    };

    return (
        <div>
            <h2>Delete Customer</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Contact:</label>
                    <input type="text" value={contact} onChange={handleContactChange} />
                </div>
                <button type="submit">Delete</button>
            </form>

            
        </div>
    );
};

export default Customer;
