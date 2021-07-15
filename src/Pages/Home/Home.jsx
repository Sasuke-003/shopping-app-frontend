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
            newArrival: [],
            isOnSaleStarted: false,
            isPopularStarted: false,
            isRecommendedStarted: false,
            isNewArrivalsStarted: false,
        };
    }
    getData = async () => {
        let res1 = [];
        let res2 = [];
        let res3 = [];
        let res4 = [];
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
        try {
            res4 = await api.shop.newArrival();
        } catch (e) {
            console.log(e);
        }
        let datas1 = res1 === undefined ? [] : [...res1];
        datas1.forEach((data1) => {
            data1["price"] = data1?.itemObj?.subDetail[0]?.price;
        });
        let datas2 = res2 === undefined ? [] : [...res2];
        datas2.forEach((data2) => {
            data2["price"] = data2?.itemObj?.subDetail[0]?.price;
        });
        let datas3 = res2 === undefined ? [] : [...res3];
        datas3.forEach((data3) => {
            data3["price"] = data3?.itemObj?.subDetail[0]?.price;
        });
        let datas4 = res2 === undefined ? [] : [...res4];
        datas4.forEach((data4) => {
            data4["price"] = data4?.itemObj?.subDetail[0]?.price;
        });
        this.setState({
            // onSaleProducts: datas1.length > 0 ? datas1 : [],
            popularProducts: datas2.length > 0 ? datas2 : [],
            recommendedProducts: datas3.length > 0 ? datas3 : [],
            newArrival: datas4.length > 0 ? datas4 : [],
            isOnSaleStarted: true,
            isPopularStarted: true,
            isRecommendedStarted: true,
            isNewArrivalsStarted: true,
        });
    };
    componentDidMount() {
        this.getData();
    }
    render() {
        const {
            onSaleProducts,
            popularProducts,
            recommendedProducts,
            newArrival,
            isPopularStarted,
            isOnSaleStarted,
            isRecommendedStarted,
            isNewArrivalsStarted,
        } = this.state;
        return (
            <div className='home'>
                <Category />
                <Banner />
                {console.log(this.state)}
                {onSaleProducts !== [] && onSaleProducts?.length > 0 ? (
                    <div>
                        <h1 className='product-home-view-title'>PRODUCTS ON SALE</h1>
                        <ProductHomeView key='sale' classKey='sale' products={onSaleProducts} isStarted={isOnSaleStarted} />
                    </div>
                ) : null}
                {popularProducts !== [] && popularProducts?.length > 0 ? (
                    <div>
                        <h1 className='product-home-view-title'>MOST POPULAR PRODUCTS</h1>
                        <ProductHomeView key='popular' classKey='popular' products={popularProducts} isStarted={isPopularStarted} />
                    </div>
                ) : null}
                {recommendedProducts !== [] && recommendedProducts?.length > 0 ? (
                    <div>
                        <h1 className='product-home-view-title'>RECOMMENDED FOR YOU</h1>
                        <ProductHomeView key='recommended' classKey='recommended' products={recommendedProducts} isStarted={isRecommendedStarted} />
                    </div>
                ) : null}
                {newArrival !== [] && newArrival?.length > 0 ? (
                    <div>
                        <h1 className='product-home-view-title'>NEW ARRIVALS</h1>
                        <ProductHomeView key='newArrival' classKey='newArrival' products={newArrival} isStarted={isNewArrivalsStarted} />
                    </div>
                ) : null}
            </div>
        );
    }
}

export default Home;
