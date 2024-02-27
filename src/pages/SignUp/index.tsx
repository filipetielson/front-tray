/* eslint-disable @typescript-eslint/no-explicit-any */
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { FaRegUserCircle, FaWhatsapp } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { z } from 'zod'
import logo from '../../assets/logo-plugoo.png'
import { useAuth } from '../../hook/auth'
import { api } from '../../lib/api'

const createClient = z
  .object({
    name: z.string().min(3, { message: 'Coloque um nome valido' }),
    email: z.string().email({ message: 'Ensira um e-mail valido' }),
    password: z.string().min(6, { message: 'Coloque uma senha valido' }),
    confPassword: z.string().min(6, { message: 'Coloque uma senha válida' }),
    whatsapp: z.string().min(10, { message: 'Coloque um numero valido' }),
  })
  .refine((data) => data.password === data.confPassword, {
    message: 'As senhas não coincidem',
  })

type CreateClient = z.infer<typeof createClient>

export function SignUp() {
  const { register, handleSubmit, formState, reset } = useForm<CreateClient>({
    resolver: zodResolver(createClient),
  })
  const [formSubmitted, setFormSubmitted] = useState(false)
  const { signIn } = useAuth()

  const navigate = useNavigate()

  async function onSubmit(data: CreateClient) {
    try {
      setFormSubmitted(true)
      await api.post('/shopkeeper', {
        name: data.name,
        email: data.email,
        whatsapp: data.whatsapp,
        password: data.password,
      })
      toast.info('Cadastrado com sucesso')
      reset()
      navigate('/')
      signIn({ email: data.email, password: data.password })
    } catch (error) {
      const mensagemDeErro = (error as any)?.response?.data?.message
      alert(mensagemDeErro ?? 'Mensagem de erro não disponível')
    } finally {
      setFormSubmitted(false) // Define o estado como false após o envio do formulário (sucesso ou falha)
    }
  }

  function handleRegister() {
    navigate('/')
  }

  return (
    <div className="m-auto flex h-full items-center justify-around max-w-[1140px] max-h-[500px] w-full rounded-md border-2">
      <div className="flex justify-center">
        <img className="w-[80%]" src={logo} alt="" />
      </div>
      <div className="flex-1 px-4">
        <form
          action=""
          className="flex flex-col"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="inputBox relative">
            <div className="absolute top-[9px] left-[10px]">
              <FaRegUserCircle size={20} />
            </div>
            <input
              type="name"
              placeholder="Nome"
              className="border-2 w-full pl-10 border-zinc-500  rounded-3xl px-2.5 py-2 mb-5 font-weight:400 text-sm text-justify leading-[1.04rem]  outline-1 bg-[#f7f7f7] outline-cyan-500"
              {...register('name')}
            />
          </div>
          <div className="inputBox relative">
            <div className="absolute top-[7px] left-[10px]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                />
              </svg>
            </div>
            <input
              type="email"
              placeholder="E-mail"
              className="border-2 w-full pl-10 border-zinc-500  rounded-3xl px-2.5 py-2 mb-5 font-weight:400 text-sm text-justify leading-[1.04rem]  outline-1 bg-[#f7f7f7] outline-cyan-500"
              {...register('email')}
            />
          </div>
          <div className="inputBox relative">
            <div className="absolute top-[6px] left-[10px]">
              <FaWhatsapp size={24} />
            </div>
            <input
              type="number"
              placeholder="WhatsApp"
              className="border-2 w-full pl-10 border-zinc-500  rounded-3xl px-2.5 py-2 mb-5 font-weight:400 text-sm text-justify leading-[1.04rem]  outline-1 bg-[#f7f7f7] outline-cyan-500"
              {...register('whatsapp')}
            />
          </div>
          <div className="inputBox relative">
            <div className="absolute top-[6px] left-[10px]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
                />
              </svg>
            </div>
            <input
              type="password"
              placeholder="Senha"
              className="border-2 w-full pl-10 border-zinc-500  rounded-3xl px-2.5 py-2 mb-5 font-weight:400 text-sm text-justify leading-[1.04rem]  outline-1 bg-[#f7f7f7] outline-cyan-500"
              {...register('password')}
            />
            {formState.errors.password && (
              <p className="text-red-500 text-sm">
                {formState.errors.password.message}
              </p>
            )}
          </div>
          <div className="inputBox relative">
            <div className="absolute top-[6px] left-[10px]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
                />
              </svg>
            </div>
            <input
              type="password"
              placeholder="Confirmar Senha"
              className="border-2 w-full pl-10 border-zinc-500  rounded-3xl px-2.5 py-2 mb-10 font-weight:400 text-sm text-justify leading-[1.04rem]  outline-1 bg-[#f7f7f7] outline-cyan-500"
              {...register('confPassword')}
            />
            <p>
              {formState.errors.confPassword && (
                <p className="text-red-500 text-sm">
                  {formState.errors.confPassword.message}
                </p>
              )}
            </p>
          </div>
          <div className="flex ">
            <button
              disabled={
                !formState.isDirty || !formState.isValid || formSubmitted
              } // Desabilita o botão se o formulário já foi enviado
              type="submit"
              className="p-2 flex-1 bg-[#49cae4] rounded-3xl cursor-pointer font-normal tracking-widest disabled:bg-slate-200 disabled:cursor-no-drop"
            >
              {formSubmitted ? 'Aguarde...' : 'Cadastrar'}{' '}
              {/* Muda o texto do botão durante o envio do formulário */}
            </button>

            <button
              onClick={handleRegister}
              type="button"
              className="p-2 flex-1  rounded-3xl cursor-pointer font-normal tracking-widest hover:underline"
            >
              Já possui uma conta?
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
