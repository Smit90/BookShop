import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { Link } from "react-router-dom";
import { getWishListItems, addItem, removeItem } from "../core/cartHelpers";
import Card from "../core/Card";
import { EventEmitter } from "../Utils/events";

const WishList = () => {
    const [items, setItems] = useState([]);
    // const [cartSize, setCartSize] = useState([]);
    const [run, setRun] = useState(false);

    EventEmitter.subscribe('ITEM_REMOVED', (e) => setItems(getWishListItems()))
    EventEmitter.subscribe('WISHLIST_ITEM_ADDED_TO_CART', (e) => setItems(getWishListItems()))

    useEffect(() => {
        console.log("MAX DEPTH ...");
        setItems(getWishListItems());
    }, []);

    const showItems = (items) => {
        return (
            <div>
                <div className="d-flex justify-content-between">
                    <h2>Your wishlist has {`${items.length}`} items</h2>
                    <div>
                        <button onClick={() => {

                            items.map((product, index) => {
                                addItem(product)
                                removeItem(product._id, true)
                            })
                            setItems(getWishListItems())
                        }
                        } className="btn btn-outline-primary mr-2 mt-2 mb-2 card-btn-1  ">
                            Add All
                        </button>
                        <button onClick={() => {
                            items.map((product, index) => {
                                removeItem(product._id, true)
                            })
                            setItems(getWishListItems())
                        }} className="btn btn-outline-danger mt-2 mb-2 card-btn-1  ">
                            Remove All
                        </button>
                    </div>
                </div>
                <hr />
                <div className="row">
                    {items.map((product, i) => (
                        <div key={i} className="col-3 mb-3">
                            <Card
                                key={i}
                                product={product}
                                showViewProductButton={false}
                                // cartUpdate={true}
                                showRemoveProductButton={true}
                                setRun={setRun}
                                run={run}
                                showAddToWishlistButton={false}
                                isWishListItem={product.wishlist}
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
            Your Wishlit is empty. <br />
            <Link to="/shop"> <button className="btn btn-outline-primary mt-2 mb-2 card-btn-1">Go to Shop</button> </Link>
        </h2>
    );

    return (
        <Layout
            title="Wishlist Items"
            description="Buy now!"
            className="container-fluid"
        >
            <div className="row">
                <div className="col-12">
                    {items.length > 0 ? showItems(items) : noItemsMessage()}
                </div>
                {/* <div className="col-4">
                    <div>
                        <h2>Your Cart Summary</h2>
                        <hr />
                    </div>
                    <Checkout getTotal={getTotal} showCheckout={showCheckout} />
                </div> */}
            </div>
        </Layout>
    );
};

export default WishList;
