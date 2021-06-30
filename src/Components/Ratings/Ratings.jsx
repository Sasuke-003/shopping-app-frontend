import React, { useState } from "react";
import GradeSharpIcon from "@material-ui/icons/GradeSharp";

function Ratings({ rating = 3, getRating }) {
    const [rate, setRate] = useState(0);
    // const [rate, setRate] = useState(0);
    const [currentStar, setCurrentStar] = useState(-1);

    return rating > 0 ? (
        <div>
            {[...Array(rating)].map((elementInArray, index) => (
                <GradeSharpIcon key={index + "orders" + index + elementInArray} style={{ marginLeft: "5px", fontSize: "40px" }} />
            ))}
            {[...Array(5 - rating)].map((elementInArray, index) => (
                <GradeSharpIcon
                    key={index + "orders" + index + elementInArray}
                    style={{ marginLeft: "5px", fontSize: "40px", fill: "var(--border)" }}
                />
            ))}
        </div>
    ) : (
        <div>
            {[...Array(5)].map((elementInArray, index) => (
                <GradeSharpIcon
                    onMouseEnter={() => setCurrentStar(index)}
                    onMouseLeave={() => setCurrentStar(-1)}
                    onClick={() => getRating(index + 1)}
                    key={index + "orders" + index + elementInArray}
                    style={{ marginLeft: "5px", fontSize: "40px", fill: `${currentStar < index ? "var(--border)" : "var(--secondary)"}` }}
                />
            ))}
        </div>
    );
}

export default Ratings;
