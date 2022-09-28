import { api } from './api'

type UserTypes = {
  form?: {
    name: string
    password: string
    email: string
    age?: number
  }
  clear: () => void
  navigate: (url: string) => void
}

type LogoutTypes = {
  navigate: (url: string) => void
}

export const login = async ({ form, clear, navigate }: UserTypes) => {
  await api
    .post('/user/login', form)
    .then((res) => {
      localStorage.setItem('token', res.data.token)
      clear()
      navigate('/home')
      console.log(res.data)
    })
    .catch((err) => {
      console.log(err)
    })
}

export const signUp = ({ form, clear, navigate }: UserTypes) => {
  api
    .post('/user/register', form)
    .then((res) => {
      localStorage.setItem('token', res.data.token)
      clear()
      navigate('/home')
      console.log(res.data)
    })
    .catch((err) => {
      console.log(err.data)
    })
}

export const logout = ({ navigate }: LogoutTypes) => {
  api
    .post('/user/logout')
    .then((res) => {
      localStorage.removeItem('token')
      navigate('/')
      console.log(res.data)
    })
    .catch((err) => {
      console.log(err.response.data)
    })
}
