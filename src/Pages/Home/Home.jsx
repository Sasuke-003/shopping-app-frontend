import React, { Component } from "react";
import Category from "../../Components/Category/Category";
import Banner from "../../Components/Banner/Banner";
import ProductHomeView from "../../Components/ProductHomeView/ProductHomeView";
import { api } from "../../server";
import "./Home.css";

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            onSaleProducts: [],
            popularProducts: [],
            recommendedProducts: [],
            isOnSaleStarted: false,
            isPopularStarted: false,
            isRecommendedStarted: false,
        };
    }
    getData = async () => {
        let res1 = [];
        let res2 = [];
        let res3 = [];
        try {
            res1 = await api.shop.listOffer();
        } catch (e) {
            console.log(e);
        }
        try {
            res2 = await api.shop.popular();
        } catch (e) {
            console.log(e);
        }
        try {
            res3 = await api.shop.recommended();
        } catch (e) {
            console.log(e);
        }
        let datas1 = [...res1];
        datas1.forEach((data1) => {
            data1["price"] = data1?.itemObj?.subDetail[0]?.price;
        });
        let datas2 = [...res2];
        datas2.forEach((data2) => {
            data2["price"] = data2?.itemObj?.subDetail[0]?.price;
        });
        let datas3 = [...res3];
        datas3.forEach((data3) => {
            data3["price"] = data3?.itemObj?.subDetail[0]?.price;
        });
        this.setState({
            onSaleProducts: datas1,
            popularProducts: datas2,
            recommendedProducts: datas3,
            isOnSaleStarted: true,
            isPopularStarted: true,
            isRecommendedStarted: true,
        });
    };
    componentDidMount() {
        this.getData();
    }
    render() {
        const { onSaleProducts, popularProducts, recommendedProducts, isPopularStarted, isOnSaleStarted, isRecommendedStarted } = this.state;
        return (
            <div className='home'>
                <Category />
                <Banner />
                {onSaleProducts.length > 0 ? (
                    <div>
                        <h1 className='product-home-view-title'>PRODUCTS ON SALE</h1>
                        <ProductHomeView key='sale' classKey='sale' products={onSaleProducts} isStarted={isOnSaleStarted} />
                    </div>
                ) : null}
                {popularProducts.length > 0 ? (
                    <div>
                        <h1 className='product-home-view-title'>MOST POPULAR PRODUCTS</h1>
                        <ProductHomeView key='popular' classKey='popular' products={popularProducts} isStarted={isPopularStarted} />
                    </div>
                ) : null}
                {recommendedProducts.length > 0 ? (
                    <div>
                        <h1 className='product-home-view-title'>RECOMMENDED FOR YOU</h1>
                        <ProductHomeView key='recommended' classKey='recommended' products={recommendedProducts} isStarted={isRecommendedStarted} />
                    </div>
                ) : null}
            </div>
        );
    }
}

export default Home;
