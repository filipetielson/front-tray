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
import { MdOutlineShoppingCart } from 'react-icons/md'

export function Automation() {
  return (
    <div className="flex flex-col gap-8 p-[10px]">
      <div className="flex items-center gap-6">
        <h2 className="text-[#171b37] font-bold text-lg">Automação</h2>
        <p className="border-l ml-1 pl-6 text-[#b3bcdc] font-normal text-sm">
          Crie mensagens automáticas com regras de disparo
        </p>
      </div>
      <div>
        <ChakraTabs>
          <TabList>
            <Tab className="gap-2">
              <MdOutlineShoppingCart /> Carrinho Abandonado
            </Tab>
            <Tab className="gap-2">
              <FaBarcode /> Boleto e Pix
            </Tab>
            <Tab className="gap-2">
              <IoCheckmarkDone />
              Pós Venda
            </Tab>
            <Tab className="gap-2">
              <ImCancelCircle />
              Cancelados
            </Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <p>Carrinho Abandonado</p>
            </TabPanel>
            <TabPanel>
              <p>Boleto e Pix</p>
            </TabPanel>
            <TabPanel>
              <p>Pós Venda</p>
            </TabPanel>
            <TabPanel>
              <p>Cancelados</p>
            </TabPanel>
          </TabPanels>
        </ChakraTabs>
      </div>
    </div>
  )
}
