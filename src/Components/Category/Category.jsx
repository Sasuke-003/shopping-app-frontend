import React, { Component } from "react";
import "./Category.css";
import { HorizontalDragScrollEnable, SERVER_URL } from "../../util";
import { ROUTER_LINKS } from "../../Router";
import { withRouter } from "react-router-dom";
import { api } from "../../server";

class Category extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: [],
        };
    }

    getData = async () => {
        const res = await api.item.categoryList();
        this.setState({ categories: res });
    };

    componentDidMount() {
        this.getData();
        HorizontalDragScrollEnable("category");
    }

    // handleClick = (name) => {
    //     const { history } = this.props;
    //     let drag = false;
    //     document.addEventListener("mousedown", () => (drag = false));
    //     document.addEventListener("mousemove", () => (drag = true));
    //     document.addEventListener("mouseup", () => {
    //         if (!drag) history.push(ROUTER_LINKS.searchResult + name);
    //     });
    // };

    render() {
        const { categories } = this.state;
        const { history } = this.props;

        return (
            <div className='category'>
                {categories.map((category, index) => (
                    <div className='category__item-container'>
                        <div id={category + index} className='category__item'>
                            <img loading='lazy' className='category__image' src={SERVER_URL + "item/" + category.img} alt='cannot load' />
                            <span className='category__name'>{category.name}</span>
                            <div className='category__image-hover'>
                                <div className='category__image-hover-btn' onClick={() => history.push(ROUTER_LINKS.searchResult + category.name)}>
                                    VIEW
                                </div>
                            </div>
                        </div>
                        {/* <div className='category__image-hover'>
                            <div className='category__image-hover-btn' onClick={() => history.push(ROUTER_LINKS.searchResult + category.name)}>
                                VIEW
                            </div>
                        </div> */}
                    </div>
                ))}
            </div>
        );
    }
}

export default withRouter(Category);
