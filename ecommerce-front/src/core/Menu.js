import { Fragment } from "react";
import { Link, withRouter } from 'react-router-dom'
import { signout, isAuthenticated } from '../auth/index'
import { itemTotal } from './cartHelpers'

const isActive = (history, path) => {
    if (history.location.pathname === path) {
        return { color: '#ff9900' }
    } else {
        return { color: '#ffffff' }
    }
}

const Menu = ({ history }) => (
    <div>

        <nav class="navbar navbar-expand-lg navbar-light bg-primary">
            <Link class="navbar-brand text-white" to="/">BookShop</Link>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                    <li className="nav-item">
                        <Link className="nav-link" style={isActive(history, '/')} to='/'>Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" style={isActive(history, '/shop')} to='/shop'>Shop</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" style={isActive(history, '/cart')} to='/cart'>Cart <sup><small className="cart-badge">{itemTotal()}</small></sup></Link>
                    </li>
                    {/* {isAuthenticated() && isAuthenticated().user.role === 0 && (
                        <li className="nav-item">
                            <Link className="nav-link" style={isActive(history, '/user/wishlist')} to='/user/wishlist'>Wishlist</Link>
                        </li>
                    )} */}
                    {isAuthenticated() && isAuthenticated().user.role === 0 && (
                        <li className="nav-item">
                            <Link className="nav-link" style={isActive(history, '/user/dashboard')} to='/user/dashboard'>Dashboard</Link>
                        </li>
                    )}
                    {isAuthenticated() && isAuthenticated().user.role === 1 && (
                        <li className="nav-item">
                            <Link className="nav-link" style={isActive(history, '/admin/dashboard')} to='/admin/dashboard'>Dashboard</Link>
                        </li>
                    )}
                    {!isAuthenticated() && (
                        <Fragment>
                            <li className="nav-item">
                                <Link className="nav-link" style={isActive(history, '/signin')} to='/signin'>Signin</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" style={isActive(history, '/signup')} to='/signup'>Signup</Link>
                            </li>
                        </Fragment>
                    )}
                    {isAuthenticated() && (
                        <li className="nav-item">
                            <span className="nav-link" style={{ cursor: 'pointer', color: '#ffffff' }} onClick={() => signout(() => { history.push('/') })}>Signout</span>
                        </li>
                    )}
                </ul>
            </div>
        </nav>
        {/* <ul className="nav nav-tabs bg-primary">
            <li className="nav-item">
                <Link className="nav-link" style={isActive(history, '/')} to='/'>Home</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" style={isActive(history, '/shop')} to='/shop'>Shop</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" style={isActive(history, '/cart')} to='/cart'>Cart <sup><small className="cart-badge">{itemTotal()}</small></sup></Link>
            </li>
            {isAuthenticated() && isAuthenticated().user.role === 0 && (
                <li className="nav-item">
                    <Link className="nav-link" style={isActive(history, '/user/dashboard')} to='/user/dashboard'>Dashboard</Link>
                </li>
            )}
            {isAuthenticated() && isAuthenticated().user.role === 1 && (
                <li className="nav-item">
                    <Link className="nav-link" style={isActive(history, '/admin/dashboard')} to='/admin/dashboard'>Dashboard</Link>
                </li>
            )}
            {!isAuthenticated() && (
                <Fragment>
                    <li className="nav-item">
                        <Link className="nav-link" style={isActive(history, '/signin')} to='/signin'>Signin</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" style={isActive(history, '/signup')} to='/signup'>Signup</Link>
                    </li>
                </Fragment>
            )}
            {isAuthenticated() && (
                <li className="nav-item">
                    <span className="nav-link" style={{ cursor: 'pointer', color: '#ffffff' }} onClick={() => signout(() => { history.push('/') })}>Signout</span>
                </li>
            )}
        </ul> */}
    </div>
)

export default withRouter(Menu)