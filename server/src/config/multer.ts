import multer from "multer"
import path from "path"

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'images')
    },
    filename: (req, file, callback) => {
        callback(null, Date.now() + path.extname(file.originalname))
    },
})

export const uploadImg = multer({
    storage: storage,
    limits: { fileSize: 5000000 },
    fileFilter(req, file, callback) {
        const fileTypes = /jpeg|jpg|png|gif|svg/
        const mimeType = fileTypes.test(file.mimetype)
        const extName = fileTypes.test(path.extname(file.originalname))

        if (mimeType && extName) {
            return callback(null, true)
        }
        callback(null, false)
    },
}).single('profilePic')