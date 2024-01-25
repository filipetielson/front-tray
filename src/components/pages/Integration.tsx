import { ModalTray } from './modals/ModalTray'
import './myTabs.css'

export function Integration() {
  return (
    <div className="flex flex-col gap-8 p-[10px]">
      <div className="flex items-center gap-6">
        <h2 className="text-[#171b37] font-bold text-lg">
          Plataformas de Integração
        </h2>
        <p className="border-l ml-1 pl-6 text-[#b3bcdc] font-normal text-sm">
          Selecione a plataforma de sua preferência
        </p>
      </div>
      <div className="flex gap-8 flex-wrap">
        <ModalTray />
      </div>
    </div>
  )
}
