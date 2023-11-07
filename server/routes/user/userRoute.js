import { PrismaClient } from '@prisma/client'
import express from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const router = express.Router()

const prisma = new PrismaClient()


const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) res.sendStatus(401)

  const token = authHeader.split(' ')[1]
  console.log('token', token)

  jwt.verify(token, 'secret_key', (err, user) => {
    if (err) {
      res.sendStatus(403);
    }
    console.log('user', user)
    req.user = user
    next()
  })
}

/**
 * @openapi
 * /auth/:
 *  get:
 *    tags:
 *      - User
 *    description: Get message
 *    responses:
 *      200:
 *        description: return  message
 *      401:
 *        description: Пользователь не авторизован
 */
router.get('/', authMiddleware, (req, res) => {
  res.json({ ok: true, path: 'auth', user: req.user })
})

/**
 * @openapi
 * /auth/:
 *  post:
 *    tags:
 *      - User
 *    description: Register user
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - email
 *              - name
 *              - pwd
 *              - age
 *            properties:
 *               email:
 *                type: string
 *                default: 1@mail.ru
 *               name:
 *                type: string
 *                default: Test_name
 *               pwd:
 *                type: string
 *                default: 1234
 *               age:
 *                type: number
 *                default: 20
 *    responses:
 *      200:
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - email
 *                - name
 *                - pwd
 *                - age
 *              properties:
 *                email:
 *                  type: string
 *                  default: 1@mail.ru
 *                name:
 *                  type: string
 *                  default: Test_name
 *                pwd:
 *                  type: string
 *                  default: 1234
 *                age:
 *                  type: number
 *                  default: 20
 */
router.post('/reg', async (req, res) => {
  const { email, name, pwd, age, city } = req.body

  try {
    let findedUser = await prisma.user.findMany({
      where: {
        email: email
      }
    })

    if (findedUser && Array.isArray(findedUser) && findedUser.length > 0) {
      res.json({ ok: false, errMsg: 'Такой пользователь уже существует' })
    }

    await bcrypt.hash(pwd, 3, async (err, hashedPwd) => {
      let createdUser = await prisma.user.create({
        data: {
          email: email,
          name: name,
          pwd: hashedPwd
        }
      })


      let token = jwt.sign(createdUser, 'secret_key')
      // res.json({ token })
      res.json({ ok: true, token: token, user: createdUser })
    })


    // res.json({ ok: true, user: createdUser })
    prisma.$disconnect()
    return
  } catch (error) {
    res.json({ ok: false, errMsg: error })
    return
  }

  return
  // return res.json({ ok: true, result: ['ok'] })
})

/**
 * @openapi
 * /auth/:
 *  post:
 *    tags:
 *      - User
 *    description: Register user
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - email
 *              - name
 *              - pwd
 *              - age
 *            properties:
 *               email:
 *                type: string
 *                default: 1@mail.ru
 *               name:
 *                type: string
 *                default: Test_name
 *               pwd:
 *                type: string
 *                default: 1234
 *               age:
 *                type: number
 *                default: 20
 *    responses:
 *      200:
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - email
 *                - name
 *                - pwd
 *                - age
 *              properties:
 *                email:
 *                  type: string
 *                  default: 1@mail.ru
 *                name:
 *                  type: string
 *                  default: Test_name
 *                pwd:
 *                  type: string
 *                  default: 1234
 *                age:
 *                  type: number
 *                  default: 20
 */
router.post('/login', async (req, res) => {
  const { email, pwd } = req.body

  try {
    let findedUser = await prisma.user.findMany({
      where: {
        email: email
      }
    })
    if (findedUser && Array.isArray(findedUser) && findedUser.length > 0) {

      await bcrypt.compare(pwd, findedUser[0].pwd, (err, result) => {
        if (result) {
          res.json({ ok: true, user: findedUser[0] })
        } else {
          res.json({ ok: false, errMsg: err })
        }
      })
    } else {
      res.json({ ok: false, errMsg: 'Такой пользователь не существует' })
    }



    prisma.$disconnect()
    // return
  } catch (error) {
    res.json({ ok: false, errMsg: error })
    return
  }

  return
  // return res.json({ ok: true, result: ['ok'] })
})

export default router