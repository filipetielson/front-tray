import {
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { FaCircleUser } from 'react-icons/fa6'
import { LiaSignOutAltSolid } from 'react-icons/lia'
import { SlUser } from 'react-icons/sl'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../../hook/auth'
import { api } from '../../../lib/api'
import '../myTabs.css'

export function Conf() {
  const [name, setName] = useState('')
  const [email, setemail] = useState('')
  const navigate = useNavigate()
  const { signOut } = useAuth()

  function handlePerfil() {
    navigate('/editprofile')
  }

  async function loading() {
    const id = localStorage.getItem('@sessions: id')
    const response = await api
      .get(`/shopkeeper/${id}`)
      .then((response) => response.data)
      .catch((error) => console.log(error))

    if (response?.name && response?.email) {
      setName(response?.name)
      setemail(response?.email)
    }
  }

  useEffect(() => {
    loading()
  }, [])

  return (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label="Options"
        icon={<SlUser />}
        variant="outline"
        className="button-icon rounded-[50%]"
      ></MenuButton>
      <MenuList>
        <div className="px-3 border-b">
          <h1 className=" text-sm font-normal">{name}</h1>
          <h3 className="py-2 text-xs">{email}</h3>
        </div>
        <MenuItem className="flex gap-2" onClick={handlePerfil}>
          <FaCircleUser />
          Minha Conta
        </MenuItem>
        <MenuItem className="border-t flex gap-2" onClick={signOut}>
          <LiaSignOutAltSolid /> Sair
        </MenuItem>
      </MenuList>
    </Menu>
  )
}
