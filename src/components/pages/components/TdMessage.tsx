import { Switch } from '@chakra-ui/react'
import { useState } from 'react'
import { api } from '../../../lib/api'
import { ModalMessage } from './ModalMessage'
import './cssTable.css'

type MessageType = 'ag' | '*' | 'env' | 'fin' | 'can'

interface MessageProps {
  id: string
  title: string
  text: string
  status: string
  checkedWhatsapp: string
  type: MessageType
  typeMessage?: string
}

export function TdMessage({
  id,
  title,
  status,
  text,
  checkedWhatsapp,
  type,
}: MessageProps) {
  const shopkeeperId = localStorage.getItem('@sessions: id')
  const [checked, setChecked] = useState(checkedWhatsapp === 'true')

  async function handleCheck(value: boolean) {
    setChecked(value)
    await api.put(`/shopkeeper/message/valueCheck`, {
      value,
      shopkeeper_id: shopkeeperId,
      id,
    })
  }
  return (
    <>
      <td className="align-top py-3 w-[33%] font-light text-xs  ">{title}</td>
      <td className="align-top  flex font-light text-xs">
        <ModalMessage
          shopkeeperId={shopkeeperId}
          id={id}
          message={text.substring(0, 120).concat('...')}
          type={type}
          title={title}
          text={text}
          status={status}
          checkedWhatsapp={checkedWhatsapp}
        />
      </td>
      <td className="relative align-top py-3 w-[2%] font-light text-xs">
        <Switch
          className="relative "
          onChange={(e) => handleCheck(e.target.checked)}
          defaultChecked={checked}
        />
      </td>
    </>
  )
}
