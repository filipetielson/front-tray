/* eslint-disable prettier/prettier */
import { createContext, useContext, useEffect, useState } from 'react';

import { useJwt } from "react-jwt";
import { useNavigate } from 'react-router-dom';
import { api } from '../lib/api';

interface Props {
  children: React.ReactElement | string
}

interface user {
  name: string | null
  id: string | null
  token: string | null
}
interface AuthContextType {
  signIn: (credentials: { email: string; password: string }) => Promise<void>
  signOut: () => void
  name: string | null
  id: string | null
}

const AuthContext = createContext({} as AuthContextType)

function AuthProvider({ children }: Props): JSX.Element {
  const [data, setData] = useState<user>({} as user)
  const { isExpired } = useJwt(data.token!);

  const navigate = useNavigate()


  async function signIn({
    email,
    password,
  }: {
    email: string
    password: string
  }) {
    try {
      const response = await api.post('/sessions', { email, password })
      const { name, id } = response.data.shopkeeper
      const { token } = response.data


      console.log(name, id, token)
      localStorage.setItem('@sessions: name', JSON.stringify(name))
      localStorage.setItem('@sessions: token', token)
      localStorage.setItem('@sessions: id', JSON.stringify(id))

      api.defaults.headers.common.Authorization = `Bearer ${token}`

      
      setData({ name, token, id })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.response) {
        alert(error.response.data.message)
      } else {
        alert('E-mail e/ou senha incorreta')
      }
    }
  }

  function signOut() {
    localStorage.removeItem('@sessions: token')
    localStorage.removeItem('@sessions: name')
    localStorage.removeItem('@sessions: id')
    navigate('/')
    setData({ name: null, token: null, id: null })

    
    window.location.reload()
  }

  
  useEffect(() => {
    const token = localStorage.getItem('@sessions: token')

    try {
      const name: string | null = localStorage.getItem('@sessions: name')
      const id: string | null = localStorage.getItem('@sessions: id')


      if (isExpired !== true && name && id) {
        api.defaults.headers.common.Authorization = `Bearer ${token}`

        return setData({ token, name: JSON.parse(name), id: JSON.parse(id) })
      }
      else {
        localStorage.removeItem('@sessions: token')
        localStorage.removeItem('@sessions: name')
        localStorage.removeItem('@sessions: id')
        }
      } catch (err) {
      console.error('Erro de autenticação:', err)
      localStorage.removeItem('@sessions:token')
      localStorage.removeItem('@sessions:name')
      localStorage.removeItem('@sessions:id')
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <AuthContext.Provider
      value={{ signIn, signOut, name: data.name, id: data.id }}
    >
      {children}
    </AuthContext.Provider>
  )
}

function useAuth() {
  const context = useContext(AuthContext)
  return context
}

export { AuthProvider, useAuth };

