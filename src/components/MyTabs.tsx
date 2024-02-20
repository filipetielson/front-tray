import {
  Breadcrumb,
  BreadcrumbItem,
  Tabs as ChakraTabs,
  TabList,
} from '@chakra-ui/react'

import { AiOutlineHome } from 'react-icons/ai'
import { BsRobot } from 'react-icons/bs'
import { FaWhatsapp } from 'react-icons/fa'
import { MdMarkEmailUnread } from 'react-icons/md'
import { PiPlugsBold } from 'react-icons/pi'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import logo from '../assets/logo-plugoo.png'
import { usePlatform } from '../hook/ButtonContext'
import './cssComponents.css'

export function MyTabs() {
  const navigate = useNavigate()
  const { value } = usePlatform()
  const location = useLocation()

  const isActive = (pathname: string) => {
    console.log(pathname)
    return location.pathname === pathname
  }

  return (
    <>
      <ChakraTabs height={'100%'} display={'flex'} isLazy>
        <TabList
          display={'flex'}
          className="Mytabs"
          hidden={value}
          flexDirection={'column'}
          alignItems={'center'}
          padding={'25px 10px'}
          width={'150px'}
          height={'100vh'}
          gap={'20px'}
          borderRight={'1px solid #d9d9d9'}
        >
          <img
            onClick={() => navigate('/')}
            className="w-24 cursor-pointer "
            src={logo}
            alt=""
          />
          <Breadcrumb>
            <BreadcrumbItem className={isActive('/') ? 'active' : ''}>
              <Link to="/">
                <AiOutlineHome size={20} />
              </Link>
            </BreadcrumbItem>
          </Breadcrumb>

          <Breadcrumb>
            <BreadcrumbItem className={isActive('/whatsapp') ? 'active' : ''}>
              <Link to="/whatsapp">
                <FaWhatsapp size={20} />
              </Link>
            </BreadcrumbItem>
          </Breadcrumb>

          <Breadcrumb>
            <BreadcrumbItem className={isActive('/automation') ? 'active' : ''}>
              <Link to="/automation">
                <BsRobot size={20} />
              </Link>
            </BreadcrumbItem>
          </Breadcrumb>

          <Breadcrumb>
            <BreadcrumbItem className={isActive('/message') ? 'active' : ''}>
              <Link to="/message">
                <MdMarkEmailUnread size={20} />
              </Link>
            </BreadcrumbItem>
          </Breadcrumb>

          <Breadcrumb>
            <BreadcrumbItem
              className={isActive('/integration') ? 'active' : ''}
            >
              <Link to="/integration">
                <PiPlugsBold size={20} />
              </Link>
            </BreadcrumbItem>
          </Breadcrumb>
        </TabList>
      </ChakraTabs>
    </>
  )
}
