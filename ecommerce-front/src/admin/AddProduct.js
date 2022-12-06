import React, { useState, useEffect } from 'react'
import Layout from '../core/Layout'
import { isAuthenticated } from '../auth/index'
import { Link } from 'react-router-dom'
import { createProduct, getCategories } from './ApiAdmin'

const AddProduct = () => {

    const { user, token } = isAuthenticated()
    const [picLoading, setPicLoading] = useState(false);
    const [values, setValues] = useState({
        name: '',
        description: '',
        price: '',
        categories: [],
        category: '',
        shipping: '',
        quantity: '',
        photo: '',
        loading: false,
        error: '',
        createdProduct: '',
        redirectToProfile: false,
        formData: ''
    })

    const init = () => {
        getCategories()
            .then(data => {
                if (data.error) {
                    setValues({ ...values, error: data.error })
                } else {
                    setValues({ ...values, categories: data, formData: new FormData() })
                }
            })
    }

    useEffect(() => {
        init()
    }, [])

    const { name, description, price, categories, category, shipping, quantity, loading, error, createdProduct, redirectToProfile, formData } = values

    const handleChange = name => async event => {
        const value = name === 'photo' ? await uploadToCloudinary(event.target.files[0]) : event.target.value
        formData.set(name, value)
        setValues({ ...values, [name]: value })
    }

    const uploadToCloudinary = async (pic) => {
        try {
            setPicLoading(true)
            const data = new FormData();
            data.append("file", pic);
            data.append("upload_preset", process.env.REACT_APP_UPLOAD_PRESET);
            data.append("cloud_name", process.env.REACT_APP_CLOUD_NAME);
            let response = await fetch(
                `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/upload`,
                {
                    method: "post",
                    body: data,
                }
            )
            response = await response.json()
            setPicLoading(false)
            return response.url.toString()
        } catch (error) {
            console.log("error", error)
            setPicLoading(false);
        }
    }


    const clickSubmit = event => {
        event.preventDefault()
        setValues({ ...values, error: "", loading: true })

        createProduct(user._id, token, formData)
            .then(data => {
                if (data.error) {
                    setValues({ ...values, error: data.error })
                } else {
                    setValues({ ...values, name: '', description: '', price: '', photo: '', quantity: '', loading: false, createdProduct: data.name })
                }
            })
    }

    const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    )

    const showSuccess = () => (
        <div className="alert alert-info" style={{ display: createdProduct ? '' : 'none' }}>
            <h2>{`${createdProduct} is created!`}</h2>
        </div>
    )

    const showLoading = () => (
        loading && (
            <div className="alert alert-success">
                <h2>Loading...</h2>
            </div>
        )
    )

    const showUploadLoading = () => (
        picLoading && (
            <div className="alert alert-success">
                <h2>Uploading...</h2>
            </div>
        )
    )

    const newPostForm = () => (
        <form className="mb-3" onSubmit={clickSubmit}>
            <h4>Post Photo</h4>
            <div className="form-group">
                <label className="btn btn-secondary btn-sm">
                    <input onChange={handleChange('photo')} type="file" name="photo" accept="image/*"></input>
                </label>
            </div>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input className="form-control" onChange={handleChange('name')} type="text" value={name}></input>
            </div>
            <div className="form-group">
                <label className="text-muted">Description</label>
                <textarea className="form-control" onChange={handleChange('description')} value={description}></textarea>
            </div>
            <div className="form-group">
                <label className="text-muted">Price</label>
                <input className="form-control" onChange={handleChange('price')} type="number" value={price}></input>
            </div>
            <div className="form-group">
                <label className="text-muted">Category</label>
                <select className="form-control" onChange={handleChange('category')} >
                    <option>Please Select Category</option>
                    {categories && categories.map((c, i) => (<option key={i} value={c._id}>{c.name}</option>))}
                </select>
            </div>
            <div className="form-group">
                <label className="text-muted">Shipping</label>
                <select className="form-control" onChange={handleChange('shipping')} >
                    <option value="0">No</option>
                    <option value="1">Yes</option>
                </select>
            </div>
            <div className="form-group">
                <label className="text-muted">Quantity</label>
                <input className="form-control" onChange={handleChange('quantity')} type="number" value={quantity}></input>
            </div>
            <button className="btn btn-outline-primary">Create Product</button>
        </form>
    )

    return (
        <Layout title="Add a new Product" description={`G'day ${user.name}!, ready to add new product?`} className="container" >
            <div className="row">
                <div className="col-sm-12 col-md-8 offset-md-2">
                    {showUploadLoading()}
                    {showLoading()}
                    {showSuccess()}
                    {showError()}
                    {newPostForm()}
                </div>
            </div>
        </Layout>
    )
}

export default AddProduct