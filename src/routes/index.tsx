import { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { MyTabs } from '../components/MyTabs'
import { Automation } from '../components/pages/Automation'
import { Dashboard } from '../components/pages/Dashboard'
import { Integration } from '../components/pages/Integration'
import { Message } from '../components/pages/Message'
import { Whatsapp } from '../components/pages/Whatsapp'
import { useAuth } from '../hook/auth'
import { EditProfile } from '../pages/EditProfile'
import { SignIn } from '../pages/SignIn'
import { SignUp } from '../pages/SignUp'

export function Router() {
  const { name } = useAuth()

  useEffect(() => {}, [name])
  return (
    <>
      {name === undefined ? (
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      ) : (
        <>
          <MyTabs />
          <Routes>
            <Route index element={<Dashboard />} />
            <Route path="/editprofile" element={<EditProfile />} />
            <Route path="/whatsapp" element={<Whatsapp />} />
            <Route path="/automation" element={<Automation />} />
            <Route path="/message" element={<Message />} />
            <Route path="/integration" element={<Integration />} />
          </Routes>
        </>
      )}
    </>
  )
}
