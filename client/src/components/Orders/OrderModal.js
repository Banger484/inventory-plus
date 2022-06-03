import React from "react"
import { Link } from 'react-router-dom'

export default function OrderModal ({closeModal, orderNumber}) {
    return (
        <div className="modal">
            <div className="modal-container">
                <div className="modal-header">
                    <h1>Order Successfully Placed</h1>
                </div>
                <div className="modal-body">
                    <p>Order number #{orderNumber} is now processing...</p>
                </div>
                <div className="modal-footer">
                    <Link to='/orders/'>
                        <button>Return to Order Dashboard</button>
                    </Link>
                    <button onClick={() => closeModal(false)}>Close</button>
                </div>
            </div>
        </div>
    )
}