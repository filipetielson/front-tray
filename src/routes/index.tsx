import { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { useAuth } from '../hook/auth'
import { EditProfile } from '../pages/EditProfile'
import { Home } from '../pages/Home'
import { Client } from '../pages/Home/Platform/Tray/Client'
import { Mensage } from '../pages/Mensage'
import { SignIn } from '../pages/SignIn'
import { SignUp } from '../pages/SignUp'

export function Router() {
  const { name } = useAuth()

  useEffect(() => {}, [name])
  return (
    <Routes>
      {name === undefined ? (
        <>
          <Route path="/" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </>
      ) : (
        <>
          <Route path="/" element={<Home />} />
          <Route path="/message" element={<Mensage />} />
        </>
      )}
      <Route path="/editprofile" element={<EditProfile />} />
      <Route path="/client/:id" element={<Client />} />
    </Routes>
  )
}
