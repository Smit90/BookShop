import React, { useState } from 'react';
import { Link, Redirect, useHistory } from 'react-router-dom';
import ShowImage from './ShowImage';
import moment from 'moment';
import { addItem, updateItem, removeItem, addItemtoWishList } from './cartHelpers';
import { isAuthenticated } from '../auth';
import { EventEmitter } from '../Utils/events'

const Card = ({
    product,
    showViewProductButton = true,
    showAddToCartButton = true,
    showAddToWishlistButton = true,
    cartUpdate = false,
    showRemoveProductButton = false,
    setRun = f => f,
    run = undefined,
    isWishListItem = false
    // changeCartSize
}) => {
    const [redirect, setRedirect] = useState(false);
    const [count, setCount] = useState(product.count);
    const history = useHistory()

    const showViewButton = showViewProductButton => {
        return (
            showViewProductButton && (
                <Link to={`/product/${product._id}`} className="mr-2">
                    <button className="btn btn-outline-primary mt-2 mb-2 card-btn-1">View Product</button>
                </Link>
            )
        );
    };

    const addToCart = () => {
        // console.log('added');
        let redirect = true
        if (isWishListItem) {
            removeItem(product._id, product.wishlist)
            EventEmitter.dispatch('WISHLIST_ITEM_ADDED_TO_CART', product)
            delete product.wishlist
            redirect = false
        }
        addItem(product, setRedirect(redirect));
    };

    const addToWisList = () => {
        console.log('added');
        if (isAuthenticated()) {
            addItemtoWishList(product);
        } else {
            history.push('/signin')
        }
    };

    const shouldRedirect = redirect => {
        if (redirect) {
            return <Redirect to="/cart" />;
        }
    };

    const showAddToCartBtn = showAddToCartButton => {
        return (
            showAddToCartButton && (
                <button onClick={addToCart} className="btn btn-outline-warning mr-2 mt-2 mb-2 card-btn-1  ">
                    Add to cart
                </button>
            )
        );
    };
    const showAddToWishlistBtn = showAddToWishlistButton => {
        return (
            showAddToWishlistButton && (
                <button onClick={addToWisList} className="btn btn-outline-secondary mt-2 mb-2 card-btn-1  ">
                    Add to wishlist
                </button>
            )
        );
    };

    const showStock = quantity => {
        return quantity > 0 ? (
            <span className="badge badge-primary badge-pill">In Stock </span>
        ) : (
            <span className="badge badge-primary badge-pill">Out of Stock </span>
        );
    };

    const handleChange = productId => event => {
        setRun(!run); // run useEffect in parent Cart
        setCount(event.target.value < 1 ? 1 : event.target.value);
        if (event.target.value >= 1) {
            updateItem(productId, event.target.value);
            EventEmitter.dispatch('QUANTITY_CHANGED', product)
        }
    };

    const showCartUpdateOptions = cartUpdate => {
        return (
            cartUpdate && (
                <div>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text">Adjust Quantity</span>
                        </div>
                        <input type="number" className="form-control" value={count} onChange={handleChange(product._id)} />
                    </div>
                </div>
            )
        );
    };

    const showRemoveButton = showRemoveProductButton => {
        return (
            showRemoveProductButton && (
                <button
                    onClick={() => {
                        removeItem(product._id, isWishListItem);
                        EventEmitter.dispatch('ITEM_REMOVED', product)
                        // setRun(!run); // run useEffect in parent Cart
                    }}
                    className="btn btn-outline-danger mt-2 mb-2"
                >
                    Remove Product
                </button>
            )
        );
    };

    return (
        <div className="card ">
            <div className="card-header card-header-1 ">{product.name}</div>
            <div className="card-body">
                {shouldRedirect(redirect)}
                <ShowImage item={product} url="product" />
                <p className="card-p  mt-2">{product.description.substring(0, 100)} </p>
                <p className="card-p black-10">$ {product.price}</p>
                <p className="black-9">Category: {product.category && product.category.name}</p>
                <p className="black-8">Added on {moment(product.createdAt).fromNow()}</p>
                {showStock(product.quantity)}
                <br />

                {showViewButton(showViewProductButton)}

                {showAddToCartBtn(showAddToCartButton)}
                {showAddToWishlistBtn(showAddToWishlistButton)}

                {showRemoveButton(showRemoveProductButton)}

                {showCartUpdateOptions(cartUpdate)}
            </div>
        </div>
    );
};

export default Card;
