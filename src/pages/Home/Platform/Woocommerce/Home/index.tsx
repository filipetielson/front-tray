import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
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

export function HomeWoocommerce() {
  const [customers, setCustomers] = useState<CustomersProps[]>([])
  const navigate = useNavigate()

  function pageClient(id: string) {
    navigate(`/client/${id}`)
  }

  async function loading() {
    const response = await api.get('/created').then((response) => response.data)
    setCustomers(response)
  }
  useEffect(() => {
    loading()
  }, [customers])
  return (
    <div className="flex flex-col ">
      <div className="px-8 flex gap-6 flex-wrap">
        <table className="border-2 text-left w-full rounded border-separate">
          <thead className="border-2 px-2 py-8 rounded ">
            <tr>
              <th className="border-2 px-2 py-2">Nome</th>
              <th className="border-2 px-2 py-2">Pais</th>
              <th className="border-2 px-2 py-2">Estado</th>
              <th className="border-2 px-2 py-2">Cidade</th>
              <th className="border-2 px-2 py-2">Endereço 1</th>
              <th className="border-2 px-2 py-2">Endereço 2</th>
              <th className="border-2 px-2 py-2">Codigo postal</th>
              <th className="border-2 px-2 py-2">E-mail</th>
              <th className="border-2 px-2 py-2">Telefone</th>
            </tr>
          </thead>
          <tbody>
            {customers &&
              customers.map((customer: CustomersProps) => (
                <tr
                  key={customer.id}
                  className="border-2 px-2 py-8 rounded group hover:bg-gray-100"
                >
                  <td className="border-2 px-2 py-3">
                    <button
                      className=" group-hover:underline"
                      onClick={() => pageClient(customer.id)}
                    >
                      {customer.name}
                    </button>
                  </td>
                  <td className="border-2 px-2 py-3">{customer.country}</td>
                  <td className="border-2 px-2 py-3">{customer.state}</td>
                  <td className="border-2 px-2 py-3">{customer.city}</td>
                  <td className="border-2 px-2 py-3">{customer.address_1}</td>
                  <td className="border-2 px-2 py-3">{customer.address_2}</td>
                  <td className="border-2 px-2 py-3">{customer.postcode}</td>
                  <td className="border-2 px-2 py-3">{customer.email}</td>
                  <td className="border-2 px-2 py-3">{customer.phone}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
