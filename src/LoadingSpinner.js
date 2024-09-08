import React from "react";
import { useSelector } from "react-redux";
import { DotLoader } from "react-spinners";
import './spinner.css';

const LoadingSpinner = () => {
    const isLoading = useSelector((state) => state.loader.isLoading);
    return (isLoading &&  <div className="spinner-container">
        <DotLoader color="#0dcaf0" size={50} />
    </div>
    )
};

export default LoadingSpinner;
