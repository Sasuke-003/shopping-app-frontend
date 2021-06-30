import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import GradeSharpIcon from "@material-ui/icons/GradeSharp";
import { api } from "../../server";
import { getPopup, SERVER_URL } from "../../util";
import { ROUTER_LINKS } from "../../Router";
import "./SearchResult.css";

class SearchResult extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
        };
    }

    handleShowMore = () => {
        this.setState((state) => {
            const products = state.products.concat(state.products);
            return {
                products,
            };
        });
    };
    getData = async () => {
        const { match } = this.props;
        try {
            const res = await api.item.search(match.params.id);
            let data = Object.assign({}, res);

            for (let i = 0; i < data.itemList.length; i++) {
                data.itemList[i]["offer"] = 0;
            }
            data.onSale.forEach((saleItem) => {
                for (let i = 0; i < data.itemList.length; i++) {
                    if (data.itemList[i].itemID === saleItem.itemID) {
                        data.itemList[i]["offer"] = saleItem.offer;
                        break;
                    }
                }
            });
            this.setState({
                products: data,
            });
        } catch (e) {
            console.log(e);
        }
    };

    componentDidMount() {
        this.getData();
    }
    render() {
        const { match, history } = this.props;
        const { products } = this.state;
        return (
            <div className='search-result'>
                <div className='search-result__filter'>
                    {/* <div className='search-result__filter-button'>
                        <h1 className='search-result__filter-button-text'>FILTER</h1>
                    </div> */}
                    <h1 className='search__helper-text'>
                        {products?.itemList?.length} results for {match.params.id}
                    </h1>
                </div>
                <div className='search-result__products'>
                    {products?.itemList?.map((product, index) => (
                        <div
                            id={product + index}
                            className='search-result__container'
                            onClick={() => history.push(ROUTER_LINKS.item + product.itemID)}>
                            <span className='search-result__name'>{product.name.length > 16 ? product.name.slice(0, 16) + "..." : product.name}</span>
                            <img className='search-result__image' src={SERVER_URL + "item/" + product.img[0]} alt='cannot load' />
                            <div className='search-result__bottom'>
                                <span className='search-result__price'>
                                    {product.offer !== 0 ? <span className='search-result__price-strike'>${product.price}</span> : null}$
                                    {product.offer === 0 ? product.price : (product.price * (100 - product.offer)) / 100}
                                </span>
                                <div className='search-result__ratings'>
                                    {[...Array(product.rating)].map((elementInArray, index) => (
                                        <GradeSharpIcon key={product + index + elementInArray} style={{ marginLeft: "3px", fontSize: "15px" }} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {/* <div className='search-result__filter'>
                    <div className='search-result__filter-button  search-result__show-more-button' onClick={this.handleShowMore}>
                        <h1 className='search-result__filter-button-text'>SHOW MORE</h1>
                    </div>
                </div> */}
            </div>
        );
    }
}

export default withRouter(SearchResult);
