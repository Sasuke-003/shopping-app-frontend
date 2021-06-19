import React, { Component } from "react";
import "./Category.css";
import { HorizontalDragScrollEnable } from "../../util";

export default class Category extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: [
                {
                    name: "TOYS",
                    imageUrl:
                        "https://images.unsplash.com/photo-1609419658162-232e83ceb6e1?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
                },

                {
                    name: "T-SHIRTS",
                    imageUrl:
                        "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=658&q=80",
                },
                {
                    name: "SHIRTS",
                    imageUrl:
                        "https://images.unsplash.com/photo-1602810319250-a663f0af2f75?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
                },
                {
                    name: "JEANS",
                    imageUrl:
                        "https://images.unsplash.com/photo-1603202577997-003d15cfc20b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=738&q=80",
                },
                {
                    name: "ELECTRONICS",
                    imageUrl:
                        "https://images.unsplash.com/photo-1498049794561-7780e7231661?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
                },
                {
                    name: "KITCHEN",
                    imageUrl:
                        "https://images.unsplash.com/photo-1565620731358-e8c038abc8d1?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=676&q=80",
                },
                {
                    name: "BOOKS",
                    imageUrl:
                        "https://images.unsplash.com/photo-1513001900722-370f803f498d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
                },
                {
                    name: "GAMING",
                    imageUrl:
                        "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
                },
                {
                    name: "GAMEPADS",
                    imageUrl:
                        "https://images.unsplash.com/photo-1580327344181-c1163234e5a0?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1047&q=80",
                },
            ],
        };
    }

    componentDidMount() {
        HorizontalDragScrollEnable("category");
    }

    render() {
        const { categories } = this.state;

        return (
            <div className='category'>
                {categories.map((category, index) => (
                    <div id={category + index} className='category__item'>
                        <img className='category__image' src={category.imageUrl} alt='cannot load' />
                        <span className='category__name'>{category.name}</span>
                    </div>
                ))}
            </div>
        );
    }
}
