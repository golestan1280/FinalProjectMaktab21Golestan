var express = require('express');
var router = express.Router();
const passport = require('passport');
const LocalStrategy = require('passport-local');
const auth = require('../tools/authentication.js');
const ac = require('../tools/ac.js');
const User = require('../models/user');
const Article = require('../models/article');
const Comment = require('../models/comment');
const path = require('path');
const mongoose = require('mongoose');


/////////////////////////////// اتصال به مونگو
var db = mongoose.connect('mongodb://localhost/ProjectGolestan',{ useNewUrlParser: true }, function (err, res) {
  if (err) { console.log('Failed to connect to ' + db); }
  else { console.log('Connected to ' + db); }
});

// اتصال به فایل های ری اکت
router.get('/panel*', (req, res) => {
  res.sendFile('index.html', { root: path.join(__dirname, '../panel/build/') });
});



//////////////////////////صفحه اصلی که تمام مقالات اشخاص نشان داده می شود/

router.get('/', (req, res) => {

  Article.find({}, function (err, contents) {
    if (err)
        res.send(err)
    res.render('index', {
        contents
    })
  });
});


////////////////////// صفحه لاگ این شدن کاربر
router.post('/signin', passport.authenticate('local-login'), (req, res) => {

  User.find({username: req.body.username}, (err, user)=>{
    if (err)
      console.log(err)
    res.json({
      role: user[0].role,
      success: true,
      msg: "ُSignIn"
    })
  })
});



/////////////////////////////////////////////////// صفحه ثبت نام مشخصات کاربران
router.post('/signup', (req, res) => {

  if (!req.body.username || !req.body.password) {
    return res.json({
      success: false,
      msg: "please fill textbox"
    })
  }


  let user = new User({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    username: req.body.username,
    password: req.body.password,
    sex: req.body.sex,
    phone: req.body.phone,
    role: "user"
  })

  user.save((err, user) => {
    if (err) {
      console.log(err.message)
      return res.json({
        success: false,
        msg: "error in sign up user\n" + err.message
      })
    }
    res.json({
      success: true,
      user
    })
  })
});








/////////////////////////////////////////////////صفحه پروفایل کاربر
// router.get('/myprofile', (req, res) => {

//   User.find({username: req.user.username}, function (err, contents) {
//     if (err) {
//       console.log(err.message)
//       return res.json({
//         success: false,
//         msg: "error profile\n" + err.message
//       })
//     }
//     res.json(contents)
//   });
// });


///////////////////////////////////////////ویرایش پروفایل 
// router.post('/editProfile', (req, res) => {
//   User.update({_id: req.user._id},
//     {$set: { 
//       firstname: req.body.firstname,
//       lastname: req.body.lastname,
//       username: req.body.username,
//       password: req.body.password,
//       sex: req.body.sex,
//       phone: req.body.phone
//      }},
//      function (err, content){
//       if (err) {
//         return res.json({
//           success: false,
//           msg: " error comments\n" + err.message
//         })
//       }
//       res.json({
//         success: true,
//         content
//       })
//     })
// });




/////////////////////////////////////// همه کاربران
// router.post('/allmembers', (req, res) => {  
//   User.find({}, function (err, content) {
//     if (err) {
//       console.log(err.message)
//       return res.json({
//         success: false,
//         msg: "error members\n" + err.message
//       })
//     }
//     res.json({
//         success: true,  
//         content
//     })
//   });
// });




//////////////////////////////////////// ری استارت شدن پسورد
// router.post('/resetPassword', (req, res) => {
//   console.log(req.body.id)
//   User.update({_id: req.body.id},
//     {$set: { 
//       password: req.user.phone
//      }},
//      function (err, content){
//       if (err) {
//         console.log(err.message)
//         return res.json({
//           success: false,
//           msg: "error in reset password\n" + err.message
//         })
//       }
//       res.json({
//         success: true,
//         content
//       })
//     })
// });



// ///////////////////////////////////////////حذف کاربر
// router.post('/deleteUser', (req, res) => {  
//   User.deleteOne({_id: req.body.id}, function (err, content) {
//     if (err) {
//       console.log(err.message)
//       return res.json({
//         success: false,
//         msg: "error in delete member\n" + err.message
//       })
//     }
//     res.json({
//           success: true,  
//           content
//       })
    
//       console.log(content)
//   });
// });

//////////////////////////////////////////////////////// همه مقاله ها
// router.post('/allArticle', (req, res) => {
//   Article.find({}, function (err, content) {
//     if (err) {
//       console.log(err.message)
//       return res.json({
//         success: false,
//         msg: "error articles\n" + err.message
//       })
//     }
//     res.json({
//       success: true,
//       content,
//       role: req.user.role
//     })
//   });
// });



//////////////////////////////////// مقاله های هر کاربر
// router.post('/myArticle', (req, res) => {
//   Article.find({username: req.user.username}, function (err, content) {
//     if (err) {
//       console.log(err.message)
//       return res.json({
//         success: false,
//         msg: "error articles\n" + err.message
//       })
//     }
//     console.log(req.user._id)
//     console.log(req.user.username)
//     res.json({
//       success: true,
//       content
//     })
//   });
// });





///////////////////////////////////////////////اضافه کردن مقاله جدید
// router.post('/addarticle', (req, res) => {  
//   let article = new Article({
//     title: req.body.title,
//     text: req.body.text,
//     createDate: new Date(),
//     author: req.user.firstname + " " + req.user.lastname,
//     username: req.user.username
//   })

//   article.save((err, article) => {
//     if (err) {
//       console.log(err.message)
//       return res.json({
//         success: false,
//         msg: "error add article\n" + err.message
//       })
//     }
//     res.json({
//       success: true,
//       article,
//       role: req.user.role
//     })
//   })
// });



/////////////////////////////////////////////// ویرایش مقاله ها
// router.post('/editArticle', (req, res) => {

//   Article.update({_id: req.body.id},
//     {$set: { 
//       title: req.body.title,
//       text: req.body.text
//      }},
//      function (err, content){
//       if (err) {
//         console.log(err.message)
//         return res.json({
//           success: false,
//           msg: "error in edit article\n" + err.message
//         })
//       }
//       res.json({
//         success: true,
//         content
//       })
//     })
// });


// ///////////////////////////////////////////////// حذف مقاله
// router.post('/deleteArticle', (req, res) => {
 
//   Article.deleteOne({_id: req.body.id}, function (err, content) {
//     if (err) {
//       console.log(err.message)
//       return res.json({
//         success: false,
//         msg: "error delete article\n" + err.message
//       })
//     }
//     res.json({
//           success: true,  
//           content
//       })
//   });
// });










///////////////////////////////////////////// کامنت ها
// router.post('/allComments', (req, res) => {
  
//   Comment.find({}, function (err, content) {
//     if (err) {
//       return res.json({
//         success: false,
//         msg: "error display comments\n" + err.message
//       })
//     }
//     res.json({
//         success: true,  
//         content
//     })
//   });
// });






/////////////////////////////////////نمایش کامنت ها
// router.post('/showComments', (req, res) => {
    
//   Comment.find({articleID: req.body.id}, function (err, comment) {
//     if (err) {
//       console.log(err.message)
//       return res.json({
//         success: false,
//         msg: "error comments\n" + err.message
//       })
//     }
//     res.json({
//       success: true,
//       comment
//     })
//   });
// });


/////////////////////////////////////////////////////اضافه کردن کامنت

// router.post('/addComment', (req, res) => {
    
//   let comment = new Comment({
//     text: req.body.text,
//     createDate: new Date(),
//     username: req.user.username,
//     articleID: req.body.id
//   })

//   console.log(comment)

//   comment.save((err, comment) => {
//     if (err) {
//       console.log(err.message)
//       return res.json({
//         success: false,
//         msg: "error add comment\n" + err.message
//       })
//     }
//     res.json({
//       success: true,
//       comment
//     })
//   })
// });




//////////////////////////////////// حذف کامنت
// router.post('/deleteComment', (req, res) => {

//   Comment.deleteOne({_id: req.body.id}, function (err, content) {
//     if (err) {
//       return res.json({
//         success: false,
//         msg: "error in delete comment\n" + err.message
//       })
//     }
//     res.json({
//           success: true,  
//           content
//       })
//   });
// });






module.exports = router;
