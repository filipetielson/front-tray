import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Switch,
  Tooltip,
  useDisclosure,
} from '@chakra-ui/react'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { api } from '../../../lib/api'
import './cssTable.css'

type MessageType = 'ag' | '*' | 'env' | 'fin' | 'can' | 'Criar mensagem'

export function ModalMessage({
  id,
  message,
  shopkeeperId,
  type,
  title,
  text,
  status,
  checkedWhatsapp,
  loading,
}: {
  id: string | undefined
  message: string
  shopkeeperId: string | null
  type: MessageType
  title: string
  text: string
  status: string
  checkedWhatsapp: string
  loading?: () => void
}) {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const types = {
    '*': 'Carrinho Abandonado',
    ag: ' Aguardando Pagamento',
    env: 'Envio',
    fin: 'Finalizado',
    can: 'Cancelados',
    'Criar mensagem': 'Criar mensagem',
  }

  const [checked, setChecked] = useState(JSON.parse(checkedWhatsapp) === true)
  const [titlee, setTitle] = useState(title)
  const [statuss, setStatus] = useState(status)
  const [textt, setText] = useState(text)

  const typess = {
    '*': 'Carrinho Abandonado',
    ag: ' AGUARDANDO PAGAMENTO',
    env: statuss === 'Enviado' ? 'ENVIADO' : 'A enviar',
    fin: 'Finalizado',
    can: 'CANCELADO',
    'Criar mensagem': 'Criar mensagem',
  }

  async function messageCreate() {
    const messageType = typess[type] || 'Tipo não encontrado'

    if (titlee === '' && statuss === '' && textt === '') {
      return alert('Por gentileza preencha todos os campos')
    }
    if (
      statuss === '' &&
      types[type] !== 'Cancelados' &&
      types[type] !== 'Finalizado'
    ) {
      return alert('Por gentileza preencha todos os campos')
    }
    if (textt === '') {
      return alert('Por gentileza preencha todos os campos')
    }

    await api
      .post('/shopkeeper/create/message', {
        shopkeeper_id: shopkeeperId,
        text: textt,
        title: titlee,
        status: statuss,
        checked_whatsapp: checked,
        type_message: messageType,
      })
      .then(() => {
        if (loading) {
          loading()
        }
        toast.info('Mensagem criada com sucesso')
        onClose()
      })
      .catch((error) => {
        console.log(error)
        toast.error('Error ao criar mensagem')
      })
  }

  async function handleUpdate() {
    try {
      await api.put(`/shopkeeper/message/updateMessage/ss`, {
        id,
        shopkeeper_id: shopkeeperId,
        text: textt,
        status: statuss,
        checked_whatsapp: checked,
        title: titlee,
      })
      if (loading) {
        loading()
      }
      onClose()
      toast.info('Mensagem atualizada com sucesso')
    } catch (error) {
      console.error(error)
    }
  }

  async function deleteMessage() {
    await api.delete(`/shopkeeper/${id}`).then(() => {
      onClose()
      toast.info('Mensagem deletada com sucesso')
    })
  }

  const compare = [
    '{{{order.status}}',
    '{{{order.id}}}',
    '{{{order.date}}}',
    '{{{order.storeNote}}}',
    '{{{order.discount}}}',
    '{{{order.shipment}}}',
    '{{{order.tracking_url}}}',
    '{{{order.sending_code}}}',
    '{{{order.urls}}}',
    '{{{order.has_payment}}}',
    '{{{customer.name}}}',
    '{{{customer.phone}}}',
    '{{{customer.address}}}',
    '{{{customer.zip_code}}}',
    '{{{customer.number}}}',
    '{{{customer.complement}}}',
    '{{{customer.neighborhood}}}',
    '{{{customer.city}}}',
    '{{{line_items.product_id}}}',
    '{{{line_items.quantity}}}',
    '{{{line_items.reference}}}',
    '{{{line_items.price}}}',
  ]

  const copyToClipboard = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        toast.info('Copiado')
      })
      .catch((err) => {
        console.error('Erro ao copiar para a área de transferência:', err)
      })
  }

  return (
    <>
      {message === 'Criar mensagem' ? (
        <div className="relative w-full h-14">
          <button
            className="font-normal p-2 bg-[#3182ce] rounded text-white hover:bg-[##519de5] absolute right-0"
            onClick={onOpen}
          >
            {message}
          </button>
        </div>
      ) : (
        <div className="relative w-full h-14">
          <button
            className="hover:underline  text-left absolute left-0"
            onClick={onOpen}
          >
            {message}
          </button>
        </div>
      )}
      <Modal isOpen={isOpen} onClose={onClose} size={''}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Editar mensagem de {`${types[type]}.`}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div className="flex flex-col gap-6 w-full">
              <div className="flex relative justify-between w-[90%]">
                <div className="mr">
                  <h3 className="pb-2 font-normal">Nome da mensagem</h3>
                  <input
                    type="text"
                    className=" text-[#839bb3] px-5 py-1.5 border rounded-md focus-visible:outline focus-visible:text-black"
                    value={titlee}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className="flex items-end gap-4">
                  <div className="flex items-center gap-2 relative">
                    <h3 className="font-medium">Ativo</h3>
                    <Switch
                      id="email-alerts"
                      className="relative "
                      onChange={(e) => setChecked(e.target.checked)}
                      defaultChecked={checked}
                    />
                  </div>
                  <div className="flex items-end gap-4">
                    {type === 'ag' ? (
                      <div className="relative">
                        <Select
                          placeholder="Status do pagamento"
                          onChange={(e) => setStatus(e.target.value)}
                          defaultValue={statuss}
                        >
                          <option value="Pagamento confirmado">
                            Pagamento confirmado
                          </option>
                          <option value="Pagamento não confirmado">
                            Pagamento não confirmado
                          </option>
                        </Select>
                      </div>
                    ) : type === 'env' ? (
                      <div className="relative">
                        <Select
                          placeholder="Status do envio"
                          onChange={(e) => setStatus(e.target.value)}
                          defaultValue={statuss}
                        >
                          <option value="A enviar">A enviar</option>
                          <option value="Enviado">Enviado</option>
                        </Select>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
              <div>
                <textarea
                  className="border rounded w-[90%] h-48 font-medium p-4"
                  name=""
                  id=""
                  value={textt}
                  onChange={(e) => setText(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex gap-2">
                  <h2 className="font-medium text-sm">Tags</h2>
                  <p className="text-[#b3bcdc] text-sm mb-6">
                    | As tags te ajudam a automatizar as mensagens para seus
                    clientes
                  </p>
                </div>
                <div
                  className="flex flex-wrap gap-3 mb-8
                "
                >
                  {compare.map((tag, index) => (
                    <button
                      onClick={() => copyToClipboard(tag)}
                      className="px-2 py-1 bg-cyan-100 border rounded-full text-cyan-600 "
                      key={index}
                    >
                      {tag}
                    </button>
                  ))}

                  <Tooltip
                    label="Outros emojis você pode copiar e colar de outras fontes."
                    aria-label="A tooltip"
                    borderRadius={'10px'}
                    padding={'10px 20px'}
                  >
                    <div className="px-2 py-1 bg-cyan-100 border rounded-full text-cyan-600 hover:cursor-pointer">
                      😉😍😃💋
                    </div>
                  </Tooltip>
                </div>
              </div>
            </div>
          </ModalBody>

          {id === 'undefined' ? (
            <ModalFooter className="flex gap-3">
              <button
                className="px-6 py-2 rounded border bg-cyan-400 text-white font-medium hover:bg-cyan-600 ease-in-out duration-300"
                onClick={messageCreate}
              >
                Criar Mensagem
              </button>
            </ModalFooter>
          ) : (
            <ModalFooter className="flex gap-3">
              <button
                className="px-6 py-2 rounded border bg-cyan-400 text-white font-medium hover:bg-cyan-600 ease-in-out duration-300"
                onClick={handleUpdate}
              >
                Salvar
              </button>
              <button
                className="px-6 py-2 font-medium text-red-600 rounded border border-red-400 hover:bg-red-500 hover:text-white ease-in-out duration-300"
                onClick={deleteMessage}
              >
                Apagar Mensagem
              </button>
            </ModalFooter>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
