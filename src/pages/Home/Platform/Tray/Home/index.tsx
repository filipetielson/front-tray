import { format } from 'date-fns'
import { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { api } from '../../../../../lib/api'

interface OrderProps {
  Order: ProductsProps
}

interface ProductsProps {
  id: string
  date: string
  shipment: string
  status: string
}

export function HomeTray() {
  const [products, setProducts] = useState<OrderProps[]>([])
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
    null,
    null,
  ])
  const [startDate, endDate] = dateRange

  const start = format(startDate === null ? 0 : startDate, 'yyyy-MM-dd')
  const end = format(endDate === null ? 0 : endDate, 'yyyy-MM-dd')

  console.log(start, end)

  async function loading() {
    await api
      .post('/products', {
        start,
        end,
      })
      .then((response) => setProducts(response.data.Orders))
      .catch((error) => console.error(error))
  }

  return (
    <div className="flex flex-col ">
      <div className="flex gap-4 px-8 py-4 mb-5 w-full">
        <DatePicker
          selectsRange={true}
          startDate={startDate}
          endDate={endDate}
          onChange={(update: any) => {
            setDateRange(update)
          }}
          withPortal
          className="border p-2 rounded"
          locale="pt-BR"
          dateFormat="dd/MM/yyyy"
        />
        <button className="border rounded px-4" onClick={loading}>
          Filtrar
        </button>
      </div>
      <table className="border-2 mx-8 my-4 mb-5 text-left rounded border-separate">
        <thead className="border-2 px-2 py-8 rounded ">
          <tr>
            <th className="border-2 px-2 py-2">Id</th>
            <th className="border-2 px-2 py-2">Data</th>
            <th className="border-2 px-2 py-2">Transportadora</th>
            <th className="border-2 px-2 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {products &&
            products.map((product: OrderProps, index) => (
              <tr
                key={index}
                className="border-2 px-2 py-8 rounded group hover:bg-gray-100"
              >
                <td className="border-2 px-2 py-3">{product.Order.id}</td>
                <td className="border-2 px-2 py-3">{product.Order.date}</td>
                <td className="border-2 px-2 py-3">{product.Order.shipment}</td>
                <td className="border-2 px-2 py-3">{product.Order.status}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}
