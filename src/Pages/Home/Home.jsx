import React from "react";
import Category from "../../Components/Category/Category";
import Banner from "../../Components/Banner/Banner";
import ProductHomeView from "../../Components/ProductHomeView/ProductHomeView";
import "./Home.css";

function Home() {
    return (
        <div>
            <Category />
            <Banner />
            <h1 className='product-home-view-title'>ON SALE</h1>
            <ProductHomeView key='sale' classKey='sale' />
            <h1 className='product-home-view-title'>BASED ON YOUR RECENT ACTIVITY</h1>
            <ProductHomeView key='recent' classKey='recent' />
            <h1 className='product-home-view-title'>MOST SEARCHED ITEMS</h1>
            <ProductHomeView key='searched' classKey='searched' />
            <h1 className='product-home-view-title'>MOST PURCHASED ITEMS</h1>
            <ProductHomeView key='purchased' classKey='purchased' />
        </div>
    );
}

export default Home;
