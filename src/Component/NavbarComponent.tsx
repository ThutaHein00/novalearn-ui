
import {Link, useNavigate} from "react-router-dom";
import {GiMagicLamp} from "react-icons/gi";
import {isLoggedLin, isStudent, isTeacher} from "../service/AuthService.ts";
import {FaShoppingCart} from "react-icons/fa";
import {useContext} from "react";
import {CartContext} from "../context/CartContext.ts";


export default function NavbarComponent() {
    const beTeacher = isTeacher();
    const beLoggedIn = isLoggedLin();
    const beStudent = isStudent();
    const navigator = useNavigate();
    const { cartItems } = useContext(CartContext);
    const logoutHandler = () =>{
        localStorage.removeItem("token");
        sessionStorage.removeItem("roleName");
        sessionStorage.removeItem("username");
        navigator('/login');
        window.location.reload();
    }
    return (
        <>
            <div className="navbar bg-primary shadow-sm text-primary-content">
                <div className="flex-1">
                   <Link to="/" className="flex items-center">
                       <GiMagicLamp size={40}  className="mx-2 text-primary-content"/> NovaLearn
                   </Link>
                </div>
                <div className="flex-none">
                    <ul className="menu menu-horizontal px-1">
                        {beTeacher && (
                            <li><Link to="/admin-dashboard">Admin Dashboard</Link></li>
                        )}
                        {
                            !beLoggedIn && (
                                <li><Link to="/cart-view">
                                    <FaShoppingCart size={20}/>
                                    <span className="badge">{cartItems.length}</span>
                                </Link></li>
                            )
                        }
                        <li><Link to="/">Home</Link></li>
                        { !beLoggedIn && <li><Link to="/login">Login</Link></li>}
                        {
                            beLoggedIn &&  <li><Link to="/logout"
                            onClick={logoutHandler}>Logout</Link></li>
                        }

                        {
                            beLoggedIn && beStudent && <li><Link to="/own-property"
                            >Own Property</Link></li>
                        }

                        {!beLoggedIn && <li><Link to="/register">Register</Link></li>}
                    </ul>
                </div>
            </div>
        </>
    );
}
