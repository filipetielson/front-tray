import { MdMenu } from 'react-icons/md'
import { usePlatform } from '../hook/ButtonContext'
import { Conf } from './pages/Conf/Menu'

export function Header() {
  const { EditValue } = usePlatform()

  return (
    <div className="px-8 py-4 w-full flex justify-between border-b-2">
      <div className="flex gap-4 w-full justify-between">
        <button onClick={EditValue}>
          <MdMenu />
        </button>
        <Conf />
      </div>
    </div>
  )
}
