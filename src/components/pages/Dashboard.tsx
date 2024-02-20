/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import ReactPlayer from 'react-player'
import { Link } from 'react-router-dom'
import { api } from '../../lib/api'
import { Header } from '../Header'

interface ShopkeeperProps {
  name: string
}

export function Dashboard() {
  const [shopkeeper, setshopkeeper] = useState<ShopkeeperProps>(
    {} as ShopkeeperProps,
  )
  const id = localStorage.getItem('@sessions: id')

  async function loading() {
    await api
      .get(`/shopkeeper/${id}`)
      .then((response) => setshopkeeper(response.data))
      .catch((error) => console.error(error))
  }

  useEffect(() => {
    loading()
  }, [])
  return (
    <div className="flex flex-col w-full">
      <Header />
      <div className="px-8 py-4">
        <div>
          <h1 className="text-[#171b37] font-bold text-lg">Dashboard</h1>
        </div>
        <div className="w-[500px] h-[300px] flex justify-between pt-8 mt-4 border rounded  px-10">
          <div>
            <h2 className="font-bold text-base">
              Olá {shopkeeper.name && shopkeeper.name.split(' ', 1)}!
            </h2>
            <p className="w-[200px] mb-4">
              Use o app Plugoo para recuperar carrinhos abandonados e converter
              leads em vendas usando o WhatsApp.
            </p>
            <Link
              to="https://wa.me/+5575983618551"
              target="_blank"
              className="px-2 py-2 font-medium border rounded duration-300 ease-in-out hover:bg-[#48c9e4] hover:text-white"
            >
              Suporte Online
            </Link>
          </div>
          <div>
            <ReactPlayer
              url="https://cdnl.iconscout.com/lottie/premium/thumb/purchase-order-reminder-8699606-7001059.mp4"
              playing={true}
              muted={true}
              loop={true}
              width={'250px'}
              height={'150px'}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
