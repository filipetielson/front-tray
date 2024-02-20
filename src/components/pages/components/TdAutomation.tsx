import { format } from 'date-fns'
import { TfiTrash } from 'react-icons/tfi'
import { api } from '../../../lib/api'
import './cssTable.css'
import { toast } from 'react-toastify'

// type MessageType = 'ag' | '*' | 'env' | 'fin' | 'can'

interface MessageProps {
  id: string
  title: string
  days: string
  hours: string
  minutes: string
  updatedAt: string
  loading: () => void
}

export function TdAutomation({
  id,
  title,
  days,
  hours,
  minutes,
  updatedAt,
  loading,
}: MessageProps) {
  // const shopkeeperId = localStorage.getItem('@sessions: id')

  async function deleteAutomation() {
    const confirm = window.confirm('Deseja deletar a automação?')

    if (confirm) {
      await api
        .delete(`/automation/${id}`)
        .then(() => {
          loading()
          toast.info('Mensagem apagada com sucesso')
        })
        .catch((error) => console.log(error))
    }
  }

  return (
    <>
      <td className="align-top py-3 w-[40%] font-light text-xs ">{title}</td>
      <td className="align-top  w-[30%] font-light text-xs ">
        {days === '0' && hours === '0' && minutes === '1' ? (
          <p>{minutes} minuto após a compra</p>
        ) : (
          <p>{`${days} dias ${hours} horas ${minutes} minutos após a compra`}</p>
        )}
      </td>
      <td className="relative align-top py-3 w-[20%] font-light text-xs ">
        {format(new Date(updatedAt), 'dd/MM/yyyy')} ás{' '}
        {format(new Date(updatedAt), 'HH:mm')}
      </td>
      <td className="relative align-top py-3 w-[10%] font-light text-xs">
        <button className="absolute left-[15px]" onClick={deleteAutomation}>
          <TfiTrash size={18} />
        </button>
      </td>
    </>
  )
}
