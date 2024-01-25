/* eslint-disable react-hooks/exhaustive-deps */
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
import { useEffect, useState } from 'react'
import { api } from '../lib/api'

interface OrdersProps {
  id: string
  status: string
  discount_total: number
  shipping_total: number
  value_total: number
  payment_method_title: number
}

interface ItemsProps {
  id: string
  name: string
  quantity: number
  price: number
}

export function BasicUsage({ order }: { order: OrdersProps }) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [items, setItems] = useState<ItemsProps[]>([])

  async function loading() {
    const response = await api
      .get(`/client/${order.id}`)
      .then((response) => response.data)
    setItems(response)
  }

  useEffect(() => {
    loading()
  }, [])
  return (
    <div key={order.id}>
      <Button
        onClick={onOpen}
        style={{ background: '#40c4de', color: 'white' }}
      >
        Pedido: {order.id}
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Pedido: {order.id}</ModalHeader>
          <ModalBody>
            <strong>Detalhes do pedido:</strong>
            <p>
              {' '}
              <strong>Valor total: </strong>
              {order.value_total}
            </p>
            <p>
              {' '}
              <strong>Metodo de pagamento: </strong>
              {order.payment_method_title}
            </p>
            <p>
              <strong>Desconto: </strong>
              {order.shipping_total}
            </p>
            <p>
              <strong>Status: </strong>
              {order.status}
            </p>
            <br />

            {items &&
              items.map((item) => (
                <div key={item.id}>
                  {items.length === 1 ? (
                    <strong>Detalhes do item:</strong>
                  ) : (
                    <strong>Detalhes dos items:</strong>
                  )}
                  <p>
                    <strong>Item: </strong>
                    {item.name}
                  </p>
                  <p>
                    <strong>Valor: </strong>
                    {item.price}
                  </p>
                  <p>
                    <strong>Quantidade: </strong>
                    {item.quantity}
                  </p>
                </div>
              ))}
          </ModalBody>

          <ModalFooter>
            <Button
              style={{ background: '#40c4de', color: 'white' }}
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
