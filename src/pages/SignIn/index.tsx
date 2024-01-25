import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { RiLockPasswordLine } from 'react-icons/ri'
import { TfiEmail } from 'react-icons/tfi'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'
import logo from '../../assets/logo-plugoo.png'
import { useAuth } from '../../hook/auth'

const createClient = z.object({
  password: z.string().min(6, { message: 'Coloque uma senha valido' }),
  email: z.string().email({ message: 'Ensira um e-mail valido' }),
})

type CreateClient = z.infer<typeof createClient>

export function SignIn() {
  const { register, handleSubmit, formState, reset } = useForm<CreateClient>({
    resolver: zodResolver(createClient),
  })

  const { signIn } = useAuth()

  const navigate = useNavigate()

  async function onSubmit(data: CreateClient) {
    signIn({
      email: data.email,
      password: data.password,
    })
    reset()
  }

  function handleRegister() {
    navigate('/signup')
  }
  return (
    <div className="m-auto flex h-full items-center justify-around max-w-[1140px] max-h-[500px] w-full rounded-md border-2">
      <div className="relative">
        <img src={logo} alt="" />
        <p className="absolute top-[300px] left-[120px]">
          Feito por quem ama tecnologia 💙
        </p>
      </div>
      <div>
        <form
          action=""
          className="flex flex-col"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="inputBox relative">
            <div className="absolute top-[13px] left-[25px]">
              <TfiEmail size={20} />
            </div>
            <input
              type="name"
              placeholder="E-mail"
              className="border-2 w-full pl-14 border-zinc-500  rounded-3xl px-2.5 py-2 mb-5 font-weight:400 text-lg  outline-1 bg-[#f7f7f7] outline-cyan-500"
              {...register('email')}
            />
          </div>
          <div className="inputBox relative">
            <div className="absolute top-[13px] left-[25px]">
              <RiLockPasswordLine size={20} />
            </div>
            <input
              type="password"
              placeholder="Senha"
              className="border-2 w-full pl-14 border-zinc-500  rounded-3xl px-2.5 py-2 mb-5 font-weight:400 text-lg  outline-1 bg-[#f7f7f7] outline-cyan-500"
              {...register('password')}
            />
          </div>
          <div className="w-full flex">
            <button
              disabled={!formState.isDirty || !formState.isValid}
              type="submit"
              className="px-4 py-2 flex-1 bg-[#49cae4] mt-6 rounded-3xl cursor-pointer font-medium tracking-widest disabled:bg-slate-200 disabled:cursor-no-drop"
            >
              Login
            </button>
          </div>
          <p className="mt-4">
            Não possui uma conta?{' '}
            <button
              className="text-sky-800 hover:underline"
              onClick={handleRegister}
            >
              Registrar
            </button>
          </p>
        </form>
      </div>
    </div>
  )
}
