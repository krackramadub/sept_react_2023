import { PrismaClient } from '@prisma/client'
import express from 'express'

const prisma = new PrismaClient()

const router = express.Router()

router.get('/', (req, res) => {
  return res.json({ ok: true, result: ['ok'] })
})

router.get('/u', (req, res) => {
  const { id } = req.query
  return res.json({ ok: true, result: ['ok'], userId: id })
})

router.post('/u/registers', async (req, res) => {
  console.log('r', req.body)

  const { email, name } = req.body


  try {
    let findedUser = await prisma.user.findMany({
      where: {
        email: email
      }
    })

    if (findedUser && Array.isArray(findedUser) && findedUser.length > 0) {
      res.json({ ok: false, errMsg: 'Такой пользователь уже существует' })
    }

    let createdUser = await prisma.user.create({
      data: {
        email: email,
        name: name
      }
    })
    res.json({ ok: true, user: createdUser })
    prisma.$disconnect()
  } catch (error) {
    res.json({ ok: false, errMsg: error })
  }

  return res.json({ ok: true, result: ['ok'] })
})

router.post('/post/create', async (req, res) => {

  const { post_title, post_body, uid } = req.body

  console.log(post_title, post_body, uid)

  try {
    let post = await prisma.post.create({
      data: {
        post_body: post_body,
        post_title: post_title,
        userId: typeof uid == 'string' ? Number(uid) : uid
      }
    })
    res.json({ ok: true, post: post })
  } catch (error) {
    res.json({ ok: false, errMsg: error })
  }
})

router.get('/posts', async (req, res) => {


  try {
    let post = await prisma.post.findMany({
      select: {
        id: true,
        post_title: true,
        author_id: {
          select: {
            id: true,
            email: true
          }
        }
      }
    })

    res.json({ ok: true, post: post })
  } catch (error) {
    res.json({ ok: false, errMsg: error })
  }
})

// router.put()
// router.delete()

export default router;