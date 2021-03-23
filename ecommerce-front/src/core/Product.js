import React, { useState, useEffect } from 'react'
import Layout from './Layout'
import { read, listRelated } from './ApiCore'
import Card from './Card'


const Product = props => {

    const [product, setProduct] = useState({})
    const [relatedProduct, setRelatedProduct] = useState({})
    const [error, setError] = useState(false)

    const loadSingleProduct = productId => {
        read(productId).then(data => {
            if (data.error) {
                setError(data.error)
            }
            else {
                setProduct(data)
                //fetch related products
                listRelated(data._id).then(res => {
                    if (res.error) {
                        setError(res.error)
                    }
                    else {
                        setRelatedProduct(res)
                    }
                })
            }
        })
    }

    useEffect(() => {
        const productId = props.match.params.productId
        loadSingleProduct(productId)
    }, [props])

    return (
        <Layout title={product && product.name} description={product && product.description && product.description.substring(0, 100)} className="container-fluid">
            <h2 className="mb-4">Single Product</h2>
            <div className="row">
                <div className="col-8">
                    {product && product.description && <Card product={product} showViewProductButton={false} />}
                </div>
                <div className="col-4">
                    <h4>Related products</h4>
                    {relatedProduct?.length > 0 ? (<span>{relatedProduct.map((product, i) => (<div className="mb-3"><Card key={i} product={product} /> </div>))}</span>) : (<span>No related products!</span>)}
                </div>
            </div>
        </Layout>
    )
}

export default Product