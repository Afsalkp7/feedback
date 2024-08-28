import { Outlet } from 'react-router-dom'
import Navbar from '../common/header/Navbar'

const Layout = () => {
  return (
    <>
    <Navbar/>
    <Outlet />
    </>
  )
}

export default Layout