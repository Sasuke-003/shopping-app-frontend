import React from "react";
import Category from "../../Components/Category/Category";
import Banner from "../../Components/Banner/Banner";
import ProductHomeView from "../../Components/ProductHomeView/ProductHomeView";

import "./Home.css";

function Home() {
    return (
        <div className='home'>
            <Category />
            <Banner />
            <h1 className='product-home-view-title'>PRODUCTS ON SALE</h1>
            <ProductHomeView key='sale' classKey='sale' url='/shop/list-offer' />
            <h1 className='product-home-view-title'>MOST POPULAR PRODUCTS</h1>
            <ProductHomeView key='recent' classKey='recent' url='/shop/popular' />
        </div>
    );
}

export default Home;
