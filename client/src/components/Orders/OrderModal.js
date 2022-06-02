import React from "react"
import { Link } from 'react-router-dom'

export default function OrderModal ({closeModal, orderNumber}) {
    return (
        <div className="modal-background">
            <div className="modal-container">
                <button onClick={() => closeModal(false)}> X </button>
                <div className="modal-header">
                    <h1>Order Successfully Placed</h1>
                </div>
                <div className="modal-body">
                    <p>Order number #{orderNumber} is now processing...</p>
                </div>
                <div className="modal-footer">
                    <button>Return to Order Dashboard</button>
                </div>
            </div>
        </div>
    )
}