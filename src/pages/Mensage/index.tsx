import { Example } from '../../components/Radio'
import { ModalMensage } from '../../components/modalMensage'

export function Mensage() {
  return (
    <div className="h-full w-full flex">
      <div className="w-[280px] h-full border-r flex flex-col">
        <Example />
      </div>
      <div className="w-full">
        <div className="px-8 py-4 mb-5 w-full flex justify-between">
          <ModalMensage />
        </div>
      </div>
    </div>
  )
}
