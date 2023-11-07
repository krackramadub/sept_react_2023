import { Box, Button, HStack, Input, Text, VStack, useToast } from '@chakra-ui/react'
import axios from 'axios'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export const RegisterPage = () => {

  const [email, setEmail] = useState(undefined)
  const [name, setName] = useState(undefined)
  const [pwd, setPwd] = useState(undefined)
  const [age, setAge] = useState(undefined)

  const toast = useToast()

  const handleRegisterMethod = () => {
    if (!email || !name || !pwd) {
      toast({
        title: 'Внимание!',
        description: "Вы должны заполнить обязательные поля",
        status: 'error',
        duration: 9000,
        isClosable: true,
      })

      return
    }

    console.log('handler')
    axios.post('http://localhost:3900/auth/reg', {
      email, name, pwd
    }).then(res => {
      if (res.status == 200 && res?.data) {
        localStorage.setItem('token', res.data.token)
        localStorage.setItem('user_data', JSON.stringify(res.data.user))
      }
    })
  }
  return (
    <div style={{
      width: 500,
      margin: '0 auto',
      padding: 20
    }}>
      <VStack>
        <Input name='email' type='email' placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
        <Input name='name' type='text' placeholder='Your name' onChange={(e) => setName(e.target.value)} />
        <Input name='pwd' type='password' placeholder='Password' onChange={(e) => setPwd(e.target.value)} />
        <Input name='age' type='text' placeholder='Age' onChange={(e) => setAge(e.target.value)} />
        <Button onClick={() => handleRegisterMethod()}>Зарегистрироваться</Button>
        <Text>Уже есть аккаунт? <Text color={'blue.400'}><Link to={'/login'}>Авторизоваться</Link></Text></Text>
      </VStack>


    </div>
  )
}
