import React, { useState } from 'react'
import Layout from '../core/Layout'
import { isAuthenticated } from '../auth/index'
import { Link } from 'react-router-dom'
import { createCategory } from './ApiAdmin'

const AddCategory = () => {

    const [values, setValues] = useState({
        name: "",
        error: false,
        success: false
    })

    const { name, error, success } = values
    // destructure user and token from localstorage
    const { user, token } = isAuthenticated()

    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value });
    };

    const clickSubmit = (event) => {
        event.preventDefault()
        setValues({ ...values, error: false, success: false })
        // make request to the api to create category
        createCategory(user._id, token, { name })
            .then(data => {
                if (data.error) {
                    setValues({ ...values, error: data.error });
                }
                else {
                    setValues({ ...values, error: '', success: true });
                }
            })
    }

    const newCategoryForm = () => (
        <form onSubmit={clickSubmit}>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input className="form-control" type="text" autoFocus required onChange={handleChange('name')} value={name}></input>
            </div>

            <button className="btn btn-outline-primary">Create Category</button>
        </form>

    )


    const showSuccess = () => {
        if (success) {
            return <h3 className="text-success">Category <span className='fw-bold'>{name}</span> is created.</h3>
        }
    }
    const showError = () => {
        if (error) {
            return <h3 className="text-danger">Cateogry Name is should be unique.</h3>
        }
    }

    const goBack = () => (
        <div className="mt-5">
            <Link to='/admin/dashboard' className="text-warning">Back to Dashboard</Link>
        </div>
    )

    return (
        <Layout title="Add a new category" description={`G'day ${user.name}!, ready to add new category?`} >
            <div className="row">
                <div className="col-8 offset-md-2">
                    {showSuccess()}
                    {showError()}
                    {newCategoryForm()}
                    {goBack()}
                </div>
            </div>
        </Layout>
    )
}

export default AddCategory