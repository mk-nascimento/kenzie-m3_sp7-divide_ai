import { createContext, useState } from 'react';
import { iProducts } from '../components/FormProducts';
import Avatar1 from '../assets/avatar1.png'
import Avatar2 from '../assets/avatar2.png'
import Avatar3 from '../assets/avatar3.png'
import Avatar4 from '../assets/avatar4.png'
import Avatar5 from '../assets/avatar5.svg'
import Avatar6 from '../assets/avatar6.svg'
import Avatar7 from '../assets/avatar7.svg'
import Avatar8 from '../assets/avatar8.png'
import { iLoginForm } from '../components/Forms/LoginForm'
import { api } from '../services/api'
import { useNavigate } from 'react-router-dom'
import { setToken } from '../scripts/localStorage'
import { callToast } from '../scripts/Toast'
import { iRegisterForm } from '../components/Forms/RegisterForm.tsx'

interface iUserProviderChildren {
    user: number[]
    setUser: React.Dispatch<React.SetStateAction<number[]>>
    products: iProducts[]
    setProducts: React.Dispatch<React.SetStateAction<iProducts[]>>
    client: any
    setClient: React.Dispatch<React.SetStateAction<any>>
    avatar: string[]
    logUser: (data: iLoginForm) => Promise<void>
    registerUser: (data: iRegisterForm) => Promise<void>

}

export const ContextUser = createContext({} as iUserProviderChildren);

interface iUserChildren {
    children: React.ReactNode;
}


export const UserProvider = ({ children }: iUserChildren) =>{

    const [user, setUser] = useState([] as number[])
    const [products, setProducts] = useState([] as iProducts[])
    const [client, setClient] = useState([] as any)
    const [avatar, setAvatar] = useState([
        Avatar1, Avatar2, Avatar3, Avatar4, Avatar5, Avatar6, Avatar7, Avatar8,
        Avatar1, Avatar2, Avatar3, Avatar4, Avatar5, Avatar6, Avatar7, Avatar8,
        Avatar1, Avatar2, Avatar3, Avatar4,
    ] as string[])
    const navigation = useNavigate();

    const logUser = async (data: iLoginForm) => {
        try {
          const answer = await api.post('/login', data)
          setToken(answer.data.accessToken)
          callToast("Login realizado com sucesso", false)
          setTimeout(() => {navigation('/counterpage')}, 4000)
          
        } catch (error) {
            callToast("Credenciais inválidas", true)
        }
    }

    const registerUser = async (data: iRegisterForm) => {
        const requestParams = {
          name: data.name,
          email: data.email,
          password: data.password,
        };
        try {
          const answer = await api.post('/register', requestParams)
          setToken(answer.data.accessToken)
          callToast("Registro realizado com sucesso", false)
          setTimeout(() => {navigation('/counterpage')}, 4000)
        } catch (error) {
            callToast("Credenciais inválidas", true)
        }
    };
    
    return(
        <ContextUser.Provider
        value={{
            user,
            setUser,
            products,
            setProducts,
            client,
            setClient,
            avatar,
            logUser,
            registerUser
        }}
        >
            { children }
        </ContextUser.Provider>
    )

}
