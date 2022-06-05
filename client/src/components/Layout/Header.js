import "./Header.css";
import React from "react";
import { Link } from "react-router-dom";

export default function Header(props) {
  return (
    <header>
      <Link className="header-enterprise" to="/users/roster">
          <h1>{props.enterprise}</h1>
          <p>Welcome, {props.user}.</p>
      </Link>
      <Link className="header-logo" to='/'>
          <img src="/images/icons/iplus.png" alt="Inventory+ Logo" />
      </Link>
    </header>
  );
}
