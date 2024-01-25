import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react'
import { useState } from 'react'

export function ModalMensage() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [message, setMensage] = useState('')

  async function send() {
    console.log(message)
  }

  return (
    <div>
      <Button onClick={onOpen} style={{ color: 'black' }}>
        Cadastrar mensagem
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent style={{ width: '700px' }}>
          <ModalHeader>Mensagem: </ModalHeader>
          <ModalBody>
            <textarea
              style={{ height: '600px', width: '100%', padding: '10px' }}
              name=""
              id=""
              onChange={(e) => setMensage(e.target.value)}
            ></textarea>
          </ModalBody>

          <ModalFooter>
            <Button
              style={{
                background: '#40c4de',
                color: 'white',
                transition: 'background 0.3s',
              }}
              mr={3}
              onClick={send}
            >
              Enviar
            </Button>
            <Button
              style={{
                background: '#ff3f3f',
                color: 'white',
                transition: 'background 0.3s',
              }}
              mr={3}
              onClick={onClose}
            >
              Fechar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}
