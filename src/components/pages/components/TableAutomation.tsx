import {
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { FaArrowRight } from 'react-icons/fa'
import { PiPlus } from 'react-icons/pi'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { api } from '../../../lib/api'
import { TdAutomation } from './TdAutomation'

type MessageType = 'ag' | '*' | 'env' | 'fin' | 'can'

interface MessageProps {
  id: string
  checked_whatsapp: string
  type_message: string
  timer: string
  shopkeeper_id: string
  text: string
  title: string
  status: string
  updated_at: string
}

interface AutomationProps extends MessageProps {
  days: string
  hours: string
  minutes: string
}

export function TableAutomation({ type }: { type: MessageType }) {
  const [messages, setMessage] = useState<MessageProps[]>([])
  const [automation, setAutomation] = useState<AutomationProps[]>([])
  const shopkeeperId = localStorage.getItem('@sessions: id')

  const [days, setDay] = useState('')
  const [hours, setHours] = useState('')
  const [minutes, setMinutes] = useState('')
  const [titleSelect, setTitleSelect] = useState('')

  console.log(messages)

  async function dataFomAutomation() {
    if (titleSelect === '') {
      alert('Por gentileza selecione a mensagem')
      return
    }
    await api
      .post(`/automation/${shopkeeperId}`, {
        title: titleSelect,
        days,
        hours,
        minutes,
      })
      .then(() => {
        loading()
        toast.info('Automação criada com sucesso')
      })
      .catch((error) => console.log(error))
  }

  async function loading() {
    await api
      .get(`/shopkeeper/messages/${shopkeeperId}`)
      .then((response) => setMessage(response.data))

    await api
      .get(`/automation/${shopkeeperId}`)
      .then((response) => setAutomation(response.data))
  }
  useEffect(() => {
    loading()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (days === '') {
      setDay('0')
    }
    if (hours === '') {
      setHours('0')
    }
    if (minutes === '') {
      setMinutes('0')
    }

    if (minutes === '0' && hours === '0' && minutes === '0') {
      setMinutes('1')
    }

    if (minutes === '' && hours === '' && minutes === '') {
      setMinutes('1')
    }
  }, [days, hours, minutes])
  return (
    <>
      <div className="flex items-center gap-12 mb-6 relative">
        <form>
          <h4 className="font-normal text-[#617182] text-xs mb-4">
            Enviar mensagem:
          </h4>
          <Select
            placeholder="Selecione  a mensagem"
            className="pl-5px font-light text-xs"
            style={{
              paddingLeft: '5px',
              fontSize: '0.76rem',
              fontWeight: '300',
            }}
            size={'20'}
            width={'270px'}
            height={'35px'}
            borderRadius={'5px'}
            onChange={(e) => setTitleSelect(e.target.value)}
          >
            {messages
              ?.filter((item) => {
                return (
                  (item.checked_whatsapp === 'true' &&
                    item.type_message?.toLocaleLowerCase()) ||
                  ''
                ).includes(type)
              })
              .map((message) => (
                <option
                  className="font-light text-xs pl-5px"
                  key={message.id}
                  value={message.title}
                >
                  {message.title}
                </option>
              ))}
          </Select>
        </form>
        <FaArrowRight className="absolute left-[290px] top-[43px]" />
        <div className="flex gap-2 w-[220px]">
          <div className="">
            <h4 className="font-normal text-[#617182] text-xs mb-4">Dias:</h4>
            <NumberInput
              defaultValue={0}
              min={0}
              max={30}
              clampValueOnBlur={false}
              onChange={(e) => setDay(e.toString())}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </div>
          <div>
            <h4 className="font-normal text-[#617182] text-xs mb-4">Horas:</h4>
            <NumberInput
              defaultValue={0}
              min={0}
              max={24}
              clampValueOnBlur={false}
              onChange={(e) => setHours(e.toString())}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </div>
          <div>
            <h4 className="font-normal text-[#617182] text-xs mb-4">
              Minutos:
            </h4>
            <NumberInput
              defaultValue={0}
              min={0}
              max={60}
              clampValueOnBlur={false}
              onChange={(e) => setMinutes(e.toString())}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </div>
        </div>
      </div>
      <div className="font-medium py-6 text-xs flex gap-2">
        <Link to="/message" className="text-cyan-400">
          Clique aqui
        </Link>
        para configurar as mensagens.
      </div>
      <button
        className="h-[40px] pl-[24px] relative border rounded-lg bg-[#7624fa] text-white flex items-center justify-center mb-8"
        onClick={dataFomAutomation}
      >
        <p className="">Criar regra</p>
        <div className="h-full w-[45px] ml-[12px] rounded-r-lg flex items-center justify-center bg-[#6a19ec] ">
          <PiPlus />
        </div>
      </button>
      <table className="w-full text-left border-b text-sm">
        <thead>
          <tr>
            <th>Titulo</th>
            <th>Tempo</th>
            <th>Criada em:</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody className="h-10 ">
          {automation
            ?.filter(
              (item) =>
                item.checked_whatsapp === 'true' &&
                item.type_message.toLocaleLowerCase().includes(type),
            )
            .map((message) => {
              return (
                <tr key={message.id} className="h-10 border-b">
                  <TdAutomation
                    id={message.id}
                    title={message.title}
                    days={message.days}
                    hours={message.hours}
                    minutes={message.minutes}
                    updatedAt={message.updated_at}
                    loading={loading}
                  />
                </tr>
              )
            })}
        </tbody>
      </table>
    </>
  )
}
