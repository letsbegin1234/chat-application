import React from "react";
import {Link} from "react-router-dom";
function Navbar(props) {
  return (
    <div className="navbar">
      <h1><Link className="navlink" to="/">Chat App</Link></h1>
      <div>
        <span>
          Username : <b>{props.name}</b>
        </span>
        <span>
          Room Id &nbsp;&nbsp;&nbsp;: <b>{props.room}</b>
        </span>
      </div>
    </div>
  );
}
export default Navbar;
