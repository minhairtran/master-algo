import React, { useState, useEffect } from "react";

const Logout = (props) => {
    const {setLoginedUser} = props
    const handleLogout = () => {
        localStorage.removeItem("username")
        window.location.replace("/")
    }

    return ( 
        <div>
            <button className="btn btn-primary" onClick={handleLogout}>Log out</button>
        </div>
     );
}
 
export default Logout;