import React, { useState } from "react";
import GradeSharpIcon from "@material-ui/icons/GradeSharp";

function Ratings({ rated = false }) {
    const [rate, setRate] = useState(0);
    // const [rate, setRate] = useState(0);
    const [currentStar, setCurrentStar] = useState(-1);

    return rated ? (
        <div>
            {[...Array(5)].map((elementInArray, index) => (
                <GradeSharpIcon key={index + "orders" + index + elementInArray} style={{ marginLeft: "5px", fontSize: "40px" }} />
            ))}
        </div>
    ) : (
        <div>
            {[...Array(5)].map((elementInArray, index) => (
                <GradeSharpIcon
                    onMouseEnter={() => setCurrentStar(index)}
                    onMouseLeave={() => setCurrentStar(-1)}
                    key={index + "orders" + index + elementInArray}
                    style={{ marginLeft: "5px", fontSize: "40px", fill: `${currentStar < index ? "var(--border)" : "var(--secondary)"}` }}
                />
            ))}
        </div>
    );
}

export default Ratings;
