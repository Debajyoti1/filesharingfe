import React from "react";
import style from "./Error404.module.css";

import { useNavigate } from "react-router-dom";
const Error404 = () => {
    const navigate = useNavigate();

    return (
        <div className={style.errorPage}>
            <h1>Oops! Something went Wrong.</h1>
            <h2>Page Not Found</h2>
            <button
                onClick={() => {
                    navigate("/");
                }}
            >
                Go to Home
            </button>
        </div>
    );
}

export default Error404;
