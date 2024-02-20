/* eslint-disable react-hooks/exhaustive-deps */
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { z } from 'zod'
import { useAuth } from '../../../hook/auth'
import { api } from '../../../lib/api'
import '../myTabs.css'

const codeUrl = z.object({
  id: z.string().optional(),
  code: z.string().min(10, 'Coloque code valido'),
  url_api: z.string().url(),
  seller_id: z.string().min(4, 'Coloque id da loja valido'),
})

type CodeUrl = z.infer<typeof codeUrl>

export function ModalTray() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [hover, setHover] = useState('')
  const [codeUrlApi, setCodeUrlApi] = useState<CodeUrl[]>([])
  const { id } = useAuth()

  const { register, handleSubmit, reset, setValue } = useForm<CodeUrl>({
    resolver: zodResolver(codeUrl),
    defaultValues: {
      code: codeUrlApi[0]?.code,
      url_api: codeUrlApi[0]?.url_api,
      seller_id: codeUrlApi[0]?.seller_id,
    },
  })

  async function handleToSalve(data: CodeUrl) {
    try {
      await api.post(`/tray/urlApiCodeCreate/${id}`, {
        code: data.code.replace(/\s/g, ''),
        url_api: data.url_api.replace(/\s/g, ''),
        seller_id: data.seller_id.replace(/\s/g, ''),
      })
      reset()
      onClose()
      toast.info('Cadastrado com sucesso')
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const mensagemDeErro = (error as any)?.response?.data?.message
      toast.error(`${mensagemDeErro ?? 'Mensagem de erro não disponível'}`)
    }
  }

  async function handleToUpdate(data: CodeUrl) {
    console.log(id)
    try {
      await api.put(`/tray/urliApiCodeUpdate/${id}`, {
        code: data.code.replace(/\s/g, ''),
        url_api: data.url_api.replace(/\s/g, ''),
      })
      onClose()
      toast.info('Atualizado com sucesso')
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const mensagemDeErro = (error as any)?.response?.data?.message
      toast.error(`${mensagemDeErro ?? 'Mensagem de erro não disponível'}`)
    }
  }

  async function loading() {
    const response = await api
      .get(`/tray/codeUrlApiView/${id}`)
      .then((response) => response.data)
      .catch((error) => console.log(error.Mensage))
    if (response) {
      setCodeUrlApi(response)
      setValue('code', response[0]?.code)
      setValue('url_api', response[0]?.url_api)
    }
  }

  useEffect(() => {
    loading()
  }, [])
  return (
    <>
      <div
        onClick={onOpen}
        onMouseEnter={() => setHover('div1')}
        onMouseLeave={() => setHover('')}
        className="itemsDiv w-[250px] h-[120px] border rounded-md flex justify-center items-center px-3 hover:cursor-pointer relative"
      >
        <div>
          <a href="#" className="w-[250px] h-[60%]">
            <span className="hoverSpan absolute w-[100px] flex justify-center items-center top-0 left-0 px-2 py-1 bg-[#e9e9e9] ">
              {hover === 'div1' ? <p>Configurar</p> : <p>Instalar</p>}
            </span>
            <img src="https://app.sak.com.br/image/gateways/tray.jpg" alt="" />
          </a>
        </div>
      </div>
      {codeUrlApi.length === 0 && codeUrlApi.map((e) => e.id === id) ? (
        <div className="">
          <Modal isOpen={isOpen} onClose={onClose} size={'full'}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader className="border-b">Configuração Tray</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <form
                  className="h-full"
                  action=""
                  onSubmit={handleSubmit(handleToSalve)}
                  id="meuFormulario"
                >
                  <div>
                    Para carregar os seus pedidos e carrinhos abandonados, é
                    necessário fazer login na sua Loja Tray
                  </div>
                  <div>
                    <div className="py-4">
                      <h3 className="text-lg font-medium">Passo 1</h3>
                      <p className="text-[#4d5a68]">
                        Clique no menu lateral &quot;meus Aplicativos&quot;
                      </p>
                    </div>
                    <div className="py-4">
                      <h3 className="text-lg font-medium">Passo 2</h3>
                      <p className="text-[#4d5a68]">
                        Digite &quot;Plugoo&quot; e clique em
                        &quot;Acessar&quot;
                      </p>
                    </div>
                    <div className="py-4">
                      <h3 className="text-lg font-medium">Passo 3</h3>
                      <p className="text-[#4d5a68]">
                        Copie o id da loja e cole no campo abaixo
                      </p>
                      <h3 className="text-lg font-medium pt-4 pb-2">
                        Id da loja
                      </h3>
                      <input
                        type="text"
                        className="w-full p-2 border border-gray-300 rounded-md focus-visible:outline-sky-500 "
                        placeholder="xxxxxxxxxxxx"
                        {...register('seller_id')}
                      />
                    </div>
                    <div className="py-4">
                      <h3 className="text-lg font-medium">Passo 4</h3>
                      <p className="text-[#4d5a68]">
                        Copie o campo Code e cole no campo abaixo
                      </p>
                      <h3 className="text-lg font-medium pt-4 pb-2">Code</h3>
                      <input
                        type="text"
                        className="w-full p-2 border border-gray-300 rounded-md focus-visible:outline-sky-500 "
                        placeholder="xxxxxxxxxxxx"
                        {...register('code')}
                      />
                    </div>
                    <div className="py-4">
                      <h3 className="text-lg font-medium">Passo 5</h3>
                      <p className="text-[#4d5a68]">
                        Copie o campo URL e cole no campo abaixo e clique em
                        Salvar
                      </p>
                      <h3 className="text-lg font-medium pt-4 pb-2">URL Api</h3>
                      <input
                        type="text"
                        className="w-full p-2 border border-gray-300 rounded-md focus-visible:outline-sky-500 "
                        placeholder="https://sualojatray.com.br/web_api"
                        {...register('url_api')}
                      />
                    </div>
                  </div>
                </form>
              </ModalBody>
              <ModalFooter className="flex gap-4 border-t relative b-[0]">
                <Button className="border" variant="ghost" onClick={onClose}>
                  Fechar
                </Button>
                <Button
                  className="buttonSalve"
                  background={'#22d3ee'}
                  variant="ghost"
                  color={'white'}
                  type="submit"
                  form="meuFormulario"
                >
                  Salvar
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </div>
      ) : (
        <div className="">
          <Modal isOpen={isOpen} onClose={onClose} size={'full'}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader className="border-b">Configuração Tray</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                {codeUrlApi.map(
                  (data: { code: string; url_api: string }, index) => (
                    <form
                      className="h-full"
                      action=""
                      onSubmit={handleSubmit(handleToUpdate)}
                      id="meuFormularioAtualizacao"
                      key={index}
                    >
                      <div className="py-4">
                        <h3 className="text-lg font-medium pb-2">Code</h3>
                        <input
                          className="w-full px-2 py-2 border rounded focus-visible:outline-cyan-400 focus-visible:outline text-xs font-medium text-[#4d5a68]"
                          {...register('code')}
                        />
                      </div>
                      <div className="py-4" key={index}>
                        <h3 className="text-lg font-medium pb-2">url_api</h3>
                        <input
                          className="w-full px-2 py-2 border rounded focus-visible:outline-cyan-400 focus-visible:outline text-xs font-medium text-[#4d5a68]"
                          {...register('url_api')}
                        />
                      </div>
                    </form>
                  ),
                )}
              </ModalBody>
              <ModalFooter className="flex gap-4 border-t relative b-[0]">
                <Button className="border" variant="ghost" onClick={onClose}>
                  Fechar
                </Button>
                <Button
                  className="buttonSalve"
                  background={'#22d3ee'}
                  variant="ghost"
                  color={'white'}
                  type="submit"
                  form="meuFormularioAtualizacao"
                >
                  Atualizar
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </div>
      )}
    </>
  )
}
