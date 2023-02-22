import React from 'react'
import ClipLoader from "react-spinners/ClipLoader";

const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
};


const Spinners = () => {
    const color = "#ffffff";
    return (
        <div className='sweet-loading spinner'>
            <ClipLoader
                loading={true}
                color={color}
                cssOverride={override}
                size={150}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
        </div>
    )
}

export default Spinners