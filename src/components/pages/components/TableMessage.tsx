import { useEffect, useState } from 'react'
import { api } from '../../../lib/api'
import { ModalMessage } from './ModalMessage'
import { TdMessage } from './TdMessage'

type MessageType = 'ag' | '*' | 'env' | 'fin' | 'can'

interface MessageProps {
  id: string
  checked_whatsapp: string
  shopkeeper_id: string
  text: string
  title: string
  status: string
  type_message: string
}

export function TableMessage({ type }: { type: MessageType }) {
  const [messages, setMessage] = useState<MessageProps[]>([])
  const shopkeeperId = localStorage.getItem('@sessions: id')

  async function loading() {
    await api
      .get(`/shopkeeper/messages/${shopkeeperId}`)
      .then((response) => setMessage(response.data))
  }
  useEffect(() => {
    loading()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <>
      <table className="w-full text-left border-b text-sm">
        <thead>
          <tr>
            <th>Titulo</th>
            <th>Mensagem</th>
            <th className="flex justify-center">Ativo</th>
            <th className="flex justify-center"></th>
          </tr>
        </thead>
        <tbody className="h-10 ">
          {messages
            ?.filter((item) =>
              item.type_message.toLocaleLowerCase().includes(type),
            )
            .map((message) => (
              <tr key={shopkeeperId} className="h-10 border-b">
                <TdMessage
                  id={message.id}
                  title={message.title}
                  text={message.text}
                  status={message.status}
                  checkedWhatsapp={message.checked_whatsapp}
                  type={type}
                />
              </tr>
            ))}
        </tbody>
      </table>

      <ModalMessage
        id="undefined"
        status=""
        shopkeeperId={shopkeeperId}
        checkedWhatsapp="true"
        message="Criar mensagem"
        text=""
        title=""
        type={type}
      />
    </>
  )
}
