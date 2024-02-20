import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react'
import { useState } from 'react'
import ReactPlayer from 'react-player'
import { toast } from 'react-toastify'
import { useAuth } from '../../../hook/auth'
import { api } from '../../../lib/api'

export function ModalWhatsapp() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [instanceWhatsapp, setInstanceWhatsapp] = useState('')
  const { id } = useAuth()

  async function handleSalveToken() {
    console.log(id)
    try {
      await api.put(`/shopkeeper/updateToken/${id}`, {
        instance_whatsApp: instanceWhatsapp,
      })
      toast.info('Token cadastrado com sucesso')
      onClose()
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const mensagemDeErro = (error as any)?.response?.data?.message
      toast.error(`${mensagemDeErro ?? 'Mensagem de erro não disponível'}`)
    }
  }
  return (
    <div className="px-8 py-4 ">
      <button
        onClick={onOpen}
        className="w-[200px] h-[200px] flex justify-center items-center border-4 rounded border-dashed hover:opacity-80 hover:scale-110 ease-in hover:ease-in duration-300"
      >
        <div className="flex items-center flex-col">
          <ReactPlayer
            url="https://cdnl.iconscout.com/lottie/premium/thumb/whatsapp-9901141-8093846.mp4"
            playing={true}
            muted={true}
            loop={true}
            width={'150px'}
            height={'150px'}
          />
          <h2>Adicionar número</h2>
        </div>
      </button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Token Whatsapp</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <input
              type="text"
              className="border rounded px-4 py-1 focus-visible:outline"
              onChange={(e) => setInstanceWhatsapp(e.target.value)}
            />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSalveToken}>
              Salvar
            </Button>
            <Button onClick={onClose} variant="ghost">
              Fechar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}
