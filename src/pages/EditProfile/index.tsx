/* eslint-disable react-hooks/exhaustive-deps */
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { z } from 'zod'
import { usePlatform } from '../../hook/ButtonContext'
import { useAuth } from '../../hook/auth'
import { api } from '../../lib/api'

const createClient = z.object({
  name: z.string().min(3, { message: 'Coloque um nome valido' }),
  password: z.string().optional(),
  img: z.string().optional(),
  old_password: z.string().optional(),
  email: z.string().email({ message: 'Ensira um e-mail valido' }),
})

type CreateClient = z.infer<typeof createClient>

export function EditProfile() {
  // const [image, setImage] = useState<string | null>(null)
  // const avatar = `${image}` || `${api.defaults.baseURL}/files/${image}`
  // const [hover, setHover] = useState('')

  const navigate = useNavigate()

  // const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const selectedImage = e.target.files?.[0]

  //   const fileUploadForm = new FormData()
  //   fileUploadForm.append('img', selectedImage!)

  //   await api.patch('/logistician/img', fileUploadForm)

  //   if (selectedImage) {
  //     const reader = new FileReader()
  //     reader.onload = () => {
  //       const result = reader.result as string
  //       setImage(result)
  //     }
  //     reader.readAsDataURL(selectedImage)
  //   }
  // }

  const { register, handleSubmit, setValue } = useForm<CreateClient>({
    resolver: zodResolver(createClient),
  })

  const { id } = useAuth()
  const { EditValue } = usePlatform()

  function handleBack() {
    navigate('/')
    EditValue()
  }

  async function onSubmit(data: CreateClient) {
    try {
      await api.put(`/shopkeeper/${id}`, {
        id,
        name: data.name,
        email: data.email,
        old_password: data.old_password,
        password: data.password,
      })

      toast.success('Cliente atualizado com sucesso')
      EditValue()
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const mensagemDeErro = (error as any)?.response?.data?.message
      toast.error(mensagemDeErro ?? 'Mensagem de erro não disponível')
    }
  }

  async function loading() {
    const id = localStorage.getItem('@sessions: id')
    const response = await api
      .get(`/shopkeeper/${id}`)
      .then((response): CreateClient => response.data)
      .catch((error) => console.log(error))
    if (response?.name && response?.email) {
      setValue('name', response?.name)
      setValue('email', response?.email)
    }
  }

  useEffect(() => {
    loading()
  }, [])

  return (
    <div className="mt-8 m-auto">
      <div className="w-96 m-auto">
        <div>
          <form
            action=""
            className="flex flex-col relative"
            onSubmit={handleSubmit(onSubmit)}
          >
            <label
              htmlFor="img"
              className="w-[100px] h-[100px] rounded-[50%] m-auto"
              // onMouseEnter={() => setHover('div1')}
              // onMouseLeave={() => setHover('')}
            >
              {/* <div className="w-[100px] h-[100px] rounded-[50%] flex justify-center items-center bg-[#49cae4]  hover:cursor-pointer">
                {image === null ? (
                  <TbUserEdit />
                ) : (
                  <img
                    src={avatar}
                    alt="Foto perfil"
                    className="rounded-[50%] hover:cursor-pointer"
                  />
                )}
                {hover === 'div1' ? (
                  <div className=" rounded-[50%] absolute w-[80px] h-[80px] top-[10px] right-[151px]  bg-[#0000004f] m-auto flex justify-center items-center">
                    <IoDocumentAttach className="w-[30px] h-[30px] text-white" />
                  </div>
                ) : null}
              </div> */}
            </label>
            <p className="pb-1.5 font-weight:400">Nome</p>
            <input
              type="name"
              className="border-2 border-zinc-500  rounded px-2.5 py-1.5 mb-2.5 font-weight:400 outline-1 outline-cyan-500"
              {...register('name')}
            />
            <p className="pb-1.5 font-weight:400">E-mail</p>
            <input
              type="email"
              className="border-2 border-zinc-500  rounded px-2.5 py-1.5 mb-2.5 font-weight:400 outline-1 outline-cyan-500"
              {...register('email')}
            />
            <p className="pb-1.5 font-weight:400">Senha atual</p>
            <input
              type="password"
              className="border-2 border-zinc-500  rounded px-2.5 py-1.5 mb-2.5 font-weight:400 outline-1 outline-cyan-500"
              {...register('old_password')}
            />
            <p className="pb-1.5 font-weight:400">Nova senha</p>
            <input
              type="password"
              minLength={6}
              className="border-2 border-zinc-500  rounded px-2.5 py-1.5 mb-2.5 font-weight:400 outline-1 outline-cyan-500"
              {...register('password')}
            />
            <div className="flex gap-4 ">
              <button
                type="button"
                onClick={handleBack}
                className="flex-1 p-2 bg-slate-400 text-white mt-8 rounded cursor-pointer font-bold tracking-widest hover:bg-slate-600"
              >
                Voltar
              </button>
              <button
                type="submit"
                className="flex-1 p-2 bg-[#49cae4] text-white mt-8 rounded cursor-pointer font-bold tracking-widest hover:bg-[#35b4cd]"
              >
                Atualizar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
