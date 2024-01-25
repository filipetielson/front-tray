import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { BasicUsage } from '../../../../../components/modal'
import { Header } from './../../../../../components/Header'
import { ModalMensage } from './../../../../../components/modalMensage'
import { api } from './../../../../../lib/api'

interface CustomersProps {
  id: string
  name: string
  address_1: string
  address_2: string
  city: string
  state: string
  postcode: string
  country: string
  email: string
  phone: string
}

interface OrdersProps {
  id: string
  status: string
  discount_total: number
  shipping_total: number
  value_total: number
  payment_method_title: number
}

export function Client() {
  const [client, setClient] = useState<CustomersProps[]>([])
  const [orders, setOrders] = useState<OrdersProps[]>([])

  const params = useParams()

  async function loading() {
    const response = await api
      .get(`/client/customerorders/${params.id}`)
      .then((response) => response.data)
    setClient(response.client)
    setOrders(response.orders)
  }

  useEffect(() => {
    loading()
  }, [])
  return (
    <div>
      <Header />
      <div>
        {client.map((client) => (
          <div className="px-2rem" key={client.id}>
            <div
              className="mx-8 p-3 flex border-2 rounded-md gap-16 flex-wrap"
              key={client.id}
            >
              <div className="flex  flex-col flex-wrap gap-4 ">
                <div>
                  <strong>Cliente</strong>: {client.name}
                </div>
                <div>
                  <strong>Endereço 1</strong>: {client.address_1}
                </div>
                <div>
                  <strong>Endereço 2</strong>: {client.address_2}
                </div>
                <div>
                  <strong>Cidade</strong>: {client.city}
                </div>
              </div>
              <div className="flex flex-col flex-wrap gap-4">
                <div>
                  <strong>Estado</strong>: {client.state}
                </div>
                <div>
                  <strong>Codigo postal</strong>: {client.postcode}
                </div>
                <div>
                  <strong>Cidade</strong>: {client.country}
                </div>
                <div>
                  <strong>E-mail</strong>: {client.email}
                </div>
              </div>
              <div className="flex flex-col flex-wrap gap-4">
                <div>
                  <strong>Celular</strong>: {client.phone}
                </div>
              </div>
              <ModalMensage id={client.id} number={client.phone} />
            </div>
            <div className="mt-16 flex items-center gap-8 px-8">
              {orders &&
                orders.map((order) => (
                  <div key={order.id}>
                    <BasicUsage order={order} />
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
