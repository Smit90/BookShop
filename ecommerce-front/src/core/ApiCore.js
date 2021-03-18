import { API } from "../config"


export const getProducts = async (sortBy) => {
    try {
        const response = await fetch(`${API}/products?sortBy=${sortBy}&order=desc&limit=6`, {
            method: "GET",
        })
        return response.json()
    } catch (err) {
        console.log(err)
    }
}