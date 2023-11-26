import React from "react";
import './Verification.css'

const Verification = ({ email }) => {
    return (
        <div className="verification-container">
            <div className="text-1-container">
                <p className="verification-text-1">(Email Verification Link Sent To)</p>
            </div>
            <div className="text-2-container">
                <p className="verification-text-2"><b>{email}</b></p>
            </div>
        </div>
    )
}

export default Verification;