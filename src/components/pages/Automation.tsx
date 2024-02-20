import {
  Tabs as ChakraTabs,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
} from '@chakra-ui/react'
import { FaBarcode } from 'react-icons/fa6'
import { ImCancelCircle } from 'react-icons/im'
import { IoCheckmarkDone } from 'react-icons/io5'
import { RiMailSendLine } from 'react-icons/ri'
import { Header } from '../Header'
import { TableAutomation } from './components/TableAutomation'

export function Automation() {
  return (
    <div className=" w-full">
      <Header />
      <div className="flex flex-col gap-4  px-8 py-4">
        <div className="flex items-center gap-6">
          <h2 className="text-[#171b37] font-bold text-lg">Mensagens</h2>
          <p className="border-l ml-1 pl-6 text-[#b3bcdc] font-normal text-sm">
            Crie mensagens personalizadas para diferentes situações
          </p>
        </div>
        <div>
          <ChakraTabs>
            <TabList>
              {/* <Tab className="gap-2">
              <MdOutlineShoppingCart /> Carrinho Abandonado
            </Tab> */}
              <Tab className="gap-2">
                <FaBarcode /> Aguardando Pagamento
              </Tab>
              <Tab className="gap-2">
                <RiMailSendLine />
                Envio
              </Tab>
              <Tab className="gap-2">
                <IoCheckmarkDone />
                Finalizado
              </Tab>
              <Tab className="gap-2">
                <ImCancelCircle />
                Cancelados
              </Tab>
            </TabList>

            <TabPanels>
              {/* <TabPanel>
              <TableAutomation type="*" />
            </TabPanel> */}
              <TabPanel>
                <TableAutomation type="ag" />
              </TabPanel>
              <TabPanel>
                <TableAutomation type="env" />
              </TabPanel>
              <TabPanel>
                <TableAutomation type="fin" />
              </TabPanel>
              <TabPanel>
                <TableAutomation type="can" />
              </TabPanel>
            </TabPanels>
          </ChakraTabs>
        </div>
      </div>
    </div>
  )
}
