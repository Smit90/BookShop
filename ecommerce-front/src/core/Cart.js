import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { Link } from "react-router-dom";
import { getCart, removeItem } from "./cartHelpers";
import Card from "./Card";
import Checkout from "./Checkout";
import { isAuthenticated } from "../auth";
import { EventEmitter } from "../Utils/events";

const Cart = () => {
    const [items, setItems] = useState([]);
    // const [cartSize, setCartSize] = useState([]);
    const [run, setRun] = useState(false);

    EventEmitter.subscribe('ITEM_REMOVED', (e) => setItems(getCart()))
    EventEmitter.subscribe('QUANTITY_CHANGED', () => setItems(getCart()))

    useEffect(() => {
        console.log("MAX DEPTH ...");
        setItems(getCart());
    }, []);

    const showItems = (items) => {
        return (
            <div>
                <div className="d-flex justify-content-between">

                    <h2>Your cart has {`${items.length}`} items</h2>
                    <button onClick={() => {
                        items.map((product, index) => {
                            removeItem(product._id)
                        })
                        setItems(getCart())
                    }} className="btn btn-outline-danger mt-2 mb-2 card-btn-1  ">
                        Clear Cart
                    </button>
                </div>
                <hr />
                <div className="row">
                    {items.map((product, i) => (
                        <div key={i} className="col-4 mb-3">
                            <Card
                                key={i}
                                product={product}
                                showAddToCartButton={false}
                                cartUpdate={true}
                                showRemoveProductButton={true}
                                setRun={setRun}
                                run={run}
                                showAddToWishlistButton={false}
                            // changeCartSize={changeCartSize}
                            />
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    const noItemsMessage = () => (
        <h2>
            Your Cart is empty. <br />
            <Link to="/shop"><button className="btn btn-outline-primary mt-2 mb-2 card-btn-1">Continue shopping</button> </Link>
        </h2>
    );

    return (
        <Layout
            title="Shopping Cart"
            description="Checkout now!"
            className="container-fluid"
        >
            <div className="row">
                <div className="col-8">
                    {items.length > 0 ? showItems(items) : noItemsMessage()}
                </div>
                {
                    items.length > 0 &&
                    <div className="col-4">
                        <div>
                            <h2>Your Cart Summary</h2>
                            <hr />
                        </div>
                        <Checkout products={items} />
                    </div>
                }
            </div>
        </Layout>
    );
};

export default Cart;
