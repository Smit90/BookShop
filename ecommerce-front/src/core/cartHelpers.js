export const addItem = (item, next) => {
    let cart = []
    if (typeof window !== 'undefined') {
        if (localStorage.getItem('cart')) {
            cart = JSON.parse(localStorage.getItem('cart'))
        }
        cart.push({
            ...item,
            count: 1
        })

        // remove duplicates
        // build an array from new set and turn it back into array usinf Array.from
        // so that later we can re-map it
        // new set will only allow unique values in it
        // so pass the ids of each object/product
        // if the loop tries to add the same value again, it'll get ignored
        // ...with the array of ids we got on when first map() was used
        // run map() on it again and return the actual product from the cart  

        cart = Array.from(new Set(cart.map((p) => (p._id)))).map(id => {
            return cart.find(p => p._id === id)
        })
        localStorage.setItem('cart', JSON.stringify(cart))

    }
    // next()
}

export const addItemtoWishList = (item, next) => {
    let cart = []
    if (typeof window !== 'undefined') {
        if (localStorage.getItem('wishlist')) {
            cart = JSON.parse(localStorage.getItem('wishlist'))
        }
        cart.push({
            ...item,
            count: 1,
            wishlist: true
        })
        cart = Array.from(new Set(cart.map((p) => (p._id)))).map(id => {
            return cart.find(p => p._id === id)
        })
        localStorage.setItem('wishlist', JSON.stringify(cart))

    }
    // next()
}

export const itemTotal = () => {
    if (typeof window !== 'undefined') {
        if (localStorage.getItem('cart')) {
            return JSON.parse(localStorage.getItem('cart')).length
        }
    }
    return 0
}
export const getCart = () => {
    if (typeof window !== 'undefined') {
        if (localStorage.getItem('cart')) {
            return JSON.parse(localStorage.getItem('cart'))
        }
    }
    return []
}
export const getWishListItems = () => {
    if (typeof window !== 'undefined') {
        if (localStorage.getItem('wishlist')) {
            return JSON.parse(localStorage.getItem('wishlist'))
        }
    }
    return []
}

export const updateItem = (productId, count) => {
    let cart = []
    if (typeof window !== 'undefined') {
        if (localStorage.getItem('cart')) {
            cart = JSON.parse(localStorage.getItem('cart'))
        }
        cart.map((product, i) => {
            if (product._id === productId) {
                cart[i].count = count
            }
        })
        localStorage.setItem('cart', JSON.stringify(cart))
    }
}

export const removeItem = (productId, isWishListItem) => {
    let cart = []
    const cartName = isWishListItem ? 'wishlist' : 'cart'
    if (typeof window !== 'undefined') {
        if (localStorage.getItem(cartName)) {
            cart = JSON.parse(localStorage.getItem(cartName))
        }
        cart.map((product, i) => {
            if (product._id === productId) {
                cart.splice(i, 1)
            }
        })
        localStorage.setItem(cartName, JSON.stringify(cart))
    }
    return cart
}