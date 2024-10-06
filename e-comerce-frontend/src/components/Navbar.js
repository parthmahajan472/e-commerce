import './Navbar.css'
import {Link, useHistory} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {useMemo} from 'react'
import {logout} from '../utils/localstorage'
import {setInitialState} from '../redux/actions/userAction'

const Navbar = ({click}) => {
  const cart = useSelector(state => state.cart)
  const history = useHistory()
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  // console.log({user})

  const {cartItems} = cart

  const getCartCount = () => {
    return cartItems.reduce((qty, item) => Number(item.qty) + qty, 0)
  }

  const _handleLogout = () => {
    // console.log('click')
    dispatch(setInitialState())
    logout()
    history.push('/')
  }

  return (
 <>
      <nav className="navbar">

          <ul className="mainlist">
            <li className="sublist"><Link to="/" className="link">Home</Link></li>
            <li className="sublist"><Link to="/cart" className="link"><i className="fas fa-shopping-cart"></i>
            <span>
              Cart <span className="cartlogo__badge">{getCartCount()}</span>
            </span></Link></li>
            <li className="sublist"><Link to="/" className="link">Shop</Link></li>
            {!user.userInfo.isLogin ? (
              <li className="sublist">
                <Link to="/signin" className="link">Login</Link>
              </li>
            ) : (
              <li className="sublist">
                <p onClick={_handleLogout}>Logout</p>
              </li>
            )}
          </ul>
        </nav>
    </>
  )
}

export default Navbar
