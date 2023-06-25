const multer = require('multer')


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        const extension = file.originalname.split(',')
        const ext = extension[extension.length -1]
        const name = `${new Date().getDate()}_${new Date().getTime()}.${ext}`
        cb(null, name)
    },
})

const upload = multer({
    storage,
    // limits: {fileSize: 1024 * 1024 * 2},
    fileFilter: (req, file, callback) =>{
      const extension = file.originalname.split('.')
      const ext = extension[extension.length - 1]
      if(ext !== 'jpg' && ext !== 'png' && ext !== 'jpeg' && ext !== 'gif' && ext !== 'mp4'){
      return callback(new Error('file image extention .png, .jpg, .jpeg, .gif and .mp4 format allowed!'));
      }
      callback(null, true)
    }
})

// const uploadImage = upload.single('images')
// const uploadSingleImage = (req,res,next) => {
//   uploadImage(req,res, (err) =>{
//     if(err){
//       return res.status(400).json({
//         succes: false,
//         message: err.message
//       })
//     }
//     next();
//   })
// }

// const uploadVideo = upload.single('videos')
// const uploadSingleVideo = (req,res,next) => {
//   uploadImage(req,res, (err) =>{
//     if(err){
//       return res.status(400).json({
//         succes: false,
//         message: err.message
//       })
//     }
//     next();
//   })
// }



// module.exports =  {uploadSingleImage, uploadSingleVideo}

const uploadMiddleware = upload.array('files')
// const uploadMiddleware = upload.single('images')
// const uploadMiddlewareVideo = upload.single('videos')

module.exports =  (req, res , next) =>{
  uploadMiddleware(req, res, (err)=>{
    const files = req.files
    const filesImages = []
    const filesVideos = []
    
    files.forEach(element => {
      const extension = element.originalname.split('.')
      const ext = extension[extension.length - 1]
      if( ext === 'jpg' || ext === 'jpeg' || ext === 'png' ){
        filesImages.push(element.filename)
      }
      else if (ext === 'gif' || ext === 'mp4'){
        filesVideos.push(element.filename)
      }
    });

    req.body.images = filesImages
    req.body.videos = filesVideos

    console.log('error', err)
    if(err){
      return res.status(500).json({
        succes: false,
        message: 'error saat upload midleware files'
      })
    }
    next()
  })
}