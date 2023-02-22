import { Badge, message } from 'antd'
import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { AdminMenu, UserMenu } from '../Data/Data'
import '../styles/LayoutStyles.css'

const Layout = ({ children }) => {
    const navigate = useNavigate()
    const { user } = useSelector(state => state.user)
    const location = useLocation()

    const handleLogout = () => {
        localStorage.clear()
        message.success("Logged out successfully")
        navigate('/login')
    }

    /* Consultant Menu */
    const ConsultantMenu = [
        {
            name: "Home",
            path: '/',
            icon: "fa-solid fa-house"
        },
        {
            name: "Appointments",
            path: '/consultant/appointments',
            icon: "fa-solid fa-list"
        },
        {
            name: "Profile",
            path: `/consultants/profile/${user?._id}`,
            icon: "fa-solid fa-user"
        }
    ]
    /* Consultant Menu Ends */


    const SidebarMenu = user?.isAdmin ? AdminMenu : user?.isConsultant ? ConsultantMenu : UserMenu

    return (
        <>
            <div className='main'>
                <div className='layout'>
                    <div className='sidebar'>
                        <div className='logo'>
                            <h6>Logo</h6>
                            <hr />
                        </div>
                        <div className='menu'>{SidebarMenu.map((menu, key) => {
                            const isActive = location.pathname === menu.path
                            return (
                                <>
                                    <div key={key} className={`menu-item ${isActive && 'active'}`}>
                                        <i className={menu.icon}></i>
                                        <Link to={menu.path}>{menu.name}</Link>
                                    </div>
                                </>
                            )
                        })}
                            <div className='menu-item' onClick={handleLogout}>
                                <i className='fa-solid fa-right-from-bracket'></i>
                                <Link to='/login'>Logout</Link>
                            </div>
                        </div>
                    </div>
                    <div className='content'>
                        <div className='header'>
                            <div className='header-content' style={{ cursor: 'pointer' }}>
                                <Badge count={user && user?.notifications.length}
                                    onClick={() => { navigate('/notifications') }}
                                >
                                    <i className="fa-solid fa-bell"></i>
                                </Badge>
                                <Link to="/profile">{user?.name}</Link>
                            </div>
                        </div>
                        <div className='body'>{children}</div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Layout