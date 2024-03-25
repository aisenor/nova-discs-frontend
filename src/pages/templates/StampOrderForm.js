import React, { useState } from 'react';
import styles from "./StampOrderForm.module.css";

function StampOrderForm() {
    const [submitButtonVisible, setSubmitButtonAble] = useState(true);

    const [formData, setFormData] = useState({
        fullName: '',
        pdgaNumber: '',
        phoneNumber: '',
        email: '',
        stampType: '',
        includeInk: '',
        reuse: '',
        comments: '',
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const newValue = type === 'checkbox' ? checked : value;
        setFormData({ ...formData, [name]: newValue });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.fullName.trim() || !formData.email.trim()) {
            alert("Name and Email fields are required.");
            return; // Prevent form submission
        }
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/stamps/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
        } catch (error) {
            console.error('Error sending email:', error);
            alert('Failed to send email. Please try again later.');
        }
    };

    return (
        <div>
            <form className={styles.funForm} onSubmit={handleSubmit}>
                <h3>Basic Info</h3>
                <label>Name </label>
                <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                />
                <label>PDGA Number </label>
                <input
                    type="number"
                    name="pdgaNumber"
                    value={formData.pdgaNumber}
                    onChange={handleChange}
                />
                <label>Email </label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <label>Phone Number </label>
                <input
                    type="number"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                />

                <h3>Stamp Types</h3>
                <label>
                    <input
                        type="radio"
                        name="stampType"
                        value="Basic Stamp"
                        checked={formData.stampType === "Basic Stamp"}
                        onChange={handleChange}
                        required
                    />
                    Basic Stamp
                </label>
                <label>
                    <input
                        type="radio"
                        name="stampType"
                        value="Advanced Stamp"
                        checked={formData.stampType === "Advanced Stamp"}
                        onChange={handleChange}
                        required
                    />
                    Advanced Stamp
                </label>
                <label>
                    <input
                        type="radio"
                        name="stampType"
                        value="Expert Stamp"
                        checked={formData.stampType === "Expert Stamp"}
                        onChange={handleChange}
                        required
                    />
                    Expert Stamp
                </label>
                <label>
                    <input
                        type="radio"
                        name="stampType"
                        value="Curved Stamp"
                        checked={formData.stampType === "Curved Stamp"}
                        onChange={handleChange}
                        required
                    />
                    Curved Stamp
                </label>

                <h3>Extras</h3>
                <div className={styles.checkboxContainer}>
                    <input
                        type="checkbox"
                        name="includeInk"
                        id="includeInk"
                        checked={formData.includeInk}
                        onChange={handleChange}
                        className={styles.checkbox}
                    />
                    <label htmlFor="includeInk">Include Stazon Black ink pad</label>
                </div>
                <div>
                    <img src="../images/stazon.png" alt="stazon ink img" style={{maxWidth: '200px'}}/>
                </div>
                <p>
                    We are currently only able to offer black ink pads. You can choose to include one for no additional
                    charge if you don't already have an ink pad of your own.
                    Other colors can be purchased from your local craft store.
                </p>

                <div className={styles.checkboxContainer}>
                    <input
                        type="checkbox"
                        name="reuse"
                        id="reuse"
                        checked={formData.reuseChecked}
                        onChange={handleChange}
                        className={styles.checkbox}
                    />
                    <label htmlFor="reuse">No reuse; $5</label>
                </div>
                <p>
                    If you are providing creative direction on an image that you don't wish to see anyone else with
                    there is an extra fee of $5 as all creative work is the property of the designer and Nova Discs
                </p>

                <label htmlFor="comments">Additional Comments</label><br/>
                <textarea
                    name="comments"
                    id="comments"
                    rows="5"
                    style={{width: '80%'}}
                    value={formData.comments}
                    onChange={handleChange}
                    placeholder="Additional Comments to help us create the perfect stamp for your game. Include whether you want your name, PDGA number, phone number, or just an image included on your stamp"
                />

                <div className={styles.form}>
                    <button className={`${styles.submitButton} ${submitButtonVisible ? 'enable' : 'disabled'}`}
                            onClick={handleSubmit}>
                        Submit
                    </button>
                </div>

            </form>
        </div>
    );
}

export default StampOrderForm;
