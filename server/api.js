const express = require('express')
const router = express.Router()
const db = require('./db')
//导入加密模块
const crypto = require("crypto")
const fn = () => { }
const successData = {
  code: 0,
  data: true,
  message: '成功'
}
const errorData = { code: 111114, message: '参数错误' }

//保存
router.post('/api/savePwd', (req, res) => {
  const { name, pwd } = req.body
  db.User.findOneAndUpdate({ name }, { pwd }, fn)
  res.status(200).end()
})
//登录
router.post('/api/login', (req, res) => {
  const { name, pwd } = req.body
  let md5 = crypto.createHash("md5");
  let newPas = md5.update(pwd).digest("hex");
  db.User.findOne({ name }, 'pwd', (err, doc) => {
    switch (true) {
      case !!err:
        console.log(err)
        break
      case !doc:
        res.send({ data: 1, msg: '账号不存在' })
        break
      case doc.pwd === newPas:
        res.send({ data: 0, msg: '登陆成功' })
        break
      case doc.pwd !== newPas:
        res.send({ data: 2, msg: '密码错误' })
        break
      default:
        res.send({ data: 3, msg: '未知错误' })
    }
  })
})
//客户列表
router.all('/api/white/query', (req, res) => {
  const param = req.body.mobile ? { mobile: req.body.mobile } : null;
  db.White.find(param, '', (err, doc) => {
    if (err) {
      console.log(err)
    } else if (doc) {
      const data = {
        code: 0,
        data: {
          data: doc,
          count: doc.length
        }
      }
      res.send(data)
    }
  })
})
//客户查询
router.post('/api/white/query/one', (req, res) => {
  const _id = req.body.id
  db.White.findOne({ _id: _id }, (err, doc) => {
    if (err) {
      console.log(err)
      res.send({ code: 111113, message: '参数错误' })
    } else if (doc) {
      const data = {
        code: 0,
        data: doc
      }
      res.send(data)
    }
  })
})
//保存名单
router.post('/api/white/update', (req, res) => {
  const _id = req.body.id
  const white = {
    amount: req.body.amount,
    address: req.body.address
  }
  db.White.findByIdAndUpdate(_id, white, (err, doc) => {
    if (err) {
      console.log(err)
      res.send({ code: 111114, message: '参数错误' })
    } else if (doc) {
      const data = {
        code: 0,
        data: true,
        message: '成功'
      }
      res.send(data)
    }
  })
})
//新增名单
router.post('/api/white/add', (req, res) => {
  const white = {
    amount: req.body.amount,
    uname: req.body.uname,
    mobile: req.body.mobile,
    address: req.body.address,
  }
  new db.White(white).save((err, doc) => {
    if (err) {
      console.log(err)
      res.send({ code: 111114, message: '参数错误' })
    } else if (doc) {
      const data = {
        code: 0,
        data: true,
        message: '成功'
      }
      res.send(data)
    }
  })
});
//删除名单
router.post('/api/white/delete', (req, res) => {
  db.White.findByIdAndRemove(req.body.id, (err, doc) => {
    if (err) {
      console.log(err)
      res.send({ code: 111114, message: '参数错误' })
    } else if (doc) {
      const data = {
        code: 0,
        data: true,
        message: '删除成功'
      }
      res.send(data)
    }
  })
})
//布料列表
router.all('/api/cloth/query', (req, res) => {
  const param = req.body.name ? { name: req.body.name } : null;
  db.Cloth.find(param, '', (err, doc) => {
    if (err) {
      console.log(err)
    } else if (doc) {
      const data = {
        code: 0,
        data: {
          data: doc,
          count: doc.length
        }
      }
      res.send(data)
    }
  })
})
//新增布料名单
router.post('/api/cloth/add', (req, res) => {
  const cloth = {
    name: req.body.name,
    source: req.body.source,
    mobile: req.body.mobile,
    bankCard: req.body.bankCard,
    uname: req.body.uname,
    price: req.body.price,
    length: req.body.length,
    deliveryTime: req.body.deliveryTime,
  }
  new db.Cloth(cloth).save((err, doc) => {
    if (err) {
      console.log(err)
      res.send(errorData)
    } else if (doc) {
      res.send(successData)
    }
  })
});
//保存布料名单
router.post('/api/cloth/update', (req, res) => {
  const _id = req.body.id
  const cloth = {
    name: req.body.name,
    source: req.body.source,
    mobile: req.body.mobile,
    bankCard: req.body.bankCard,
    uname: req.body.uname,
    price: req.body.price,
    length: req.body.length,
    deliveryTime: req.body.deliveryTime,
  }
  db.Cloth.findByIdAndUpdate(_id, cloth, (err, doc) => {
    if (err) {
      console.log(err)
      res.send(errorData)
    } else if (doc) {
      res.send(successData)
    }
  })
})
//删除布料
router.post('/api/cloth/delete', (req, res) => {
  db.Cloth.findByIdAndRemove(req.body.id, (err, doc) => {
    if (err) {
      console.log(err)
      res.send(errorData)
    } else if (doc) {
      res.send(successData)
    }
  })
})


module.exports = router
