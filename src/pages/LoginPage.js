import { Button, Input, Text, VStack, useToast } from '@chakra-ui/react'
import axios from 'axios'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export const LoginPage = () => {
  const [email, setEmail] = useState(undefined)
  const [pwd, setPwd] = useState(undefined)


  const toast = useToast()

  const handleLoginMethod = () => {
    if (!email || !pwd) {
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
    axios.post('http://localhost:3900/auth/login', {
      email, pwd
    }).then(res => {
      if (res.status == 200 && res?.data && res.data.ok) {
        toast({
          title: 'Уведомление',
          description: "Вы успешно авторизовались",
          status: 'success',
          duration: 9000,
          isClosable: true,
        })
        // localStorage.setItem('token', res.data.token)
        // localStorage.setItem('user_data', JSON.stringify(res.data.user))
      } else {
        toast({
          title: 'Уведомление',
          description: "Введеные данные не верны",
          status: 'error',
          duration: 9000,
          isClosable: true,
        })
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
        <Input name='pwd' type='password' placeholder='Password' onChange={(e) => setPwd(e.target.value)} />

        <Button onClick={() => handleLoginMethod()}>Вход</Button>
        <Text>Нет аккаунта? <Text color={'blue.400'}><Link to={'/register'}>Создать</Link></Text></Text>
      </VStack>


    </div>
  )
}
