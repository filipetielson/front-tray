import {
  Tabs as ChakraTabs,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tooltip,
} from '@chakra-ui/react'
import { AiOutlineHome } from 'react-icons/ai'
import { FaWhatsapp } from 'react-icons/fa'
import { MdMarkEmailUnread } from 'react-icons/md'
import { PiPlugsBold } from 'react-icons/pi'
import { useNavigate } from 'react-router-dom'
import logo from '../assets/logo-plugoo.png'
import { usePlatform } from '../hook/ButtonContext'
import { Header } from './Header'
import { Dashboard } from './pages/Dashboard'
import { Integration } from './pages/Integration'
import { Message } from './pages/Message'
import { Whatsapp } from './pages/Whatsapp'

export function MyTabs() {
  const navigate = useNavigate()
  const { value } = usePlatform()

  return (
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
        <Tooltip label="Dashboard" placement="right">
          <Tab>
            <AiOutlineHome size={20} />
          </Tab>
        </Tooltip>
        <Tooltip label="Whatsapp token" placement="right">
          <Tab>
            <FaWhatsapp size={20} />
          </Tab>
        </Tooltip>
        {/* <Tab>Automação</Tab> */}
        <Tooltip label="Mensagens" placement="right">
          <Tab>
            <MdMarkEmailUnread size={20} />
          </Tab>
        </Tooltip>
        <Tooltip label="Integrações" placement="right">
          <Tab>
            <PiPlugsBold size={20} />
          </Tab>
        </Tooltip>
      </TabList>
      <div className="w-full">
        <Header />
        <TabPanels>
          <TabPanel>
            <Dashboard />
          </TabPanel>
          <TabPanel>
            <Whatsapp />
          </TabPanel>
          {/* <TabPanel>
            <Automation />
          </TabPanel> */}
          <TabPanel>
            <Message />
          </TabPanel>
          <TabPanel>
            <Integration />
          </TabPanel>
        </TabPanels>
      </div>
    </ChakraTabs>
  )
}
