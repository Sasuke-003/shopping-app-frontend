import { useState, useEffect } from "react";
import "./Banner.css";
import { SERVER_URL } from "../../util";
import { api } from "../../server";
function Banner() {
    const [banner, setBanner] = useState("");
    const getBanner = async () => {
        try {
            const res = await api.shop.getBanner();
            setBanner(res);
            console.log(res);
        } catch (e) {}
    };

    useEffect(() => {
        getBanner();
    }, []);

    return banner === "none" ? null : <img className='banner' src={SERVER_URL + "banner/" + banner} alt='cannot load' />;
}

export default Banner;
