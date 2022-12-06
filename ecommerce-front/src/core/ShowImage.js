import { API } from "../config"

const ShowImage = ({ url }) => (
    <div className="product-img">
        <img src={url} style={{ maxHeight: "100%", maxWidth: "100%" }} className="mb-3" alt="product" ></img>
        {/* <img src={`${API}/${url}/photo/${item._id}`} alt={item.name} style={{ maxHeight: "100%", maxWidth: "100%" }} className="mb-3"></img> */}
    </div>
)

export default ShowImage