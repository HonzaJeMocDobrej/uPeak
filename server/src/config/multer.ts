import multer from "multer"
import path from "path"

const userStorage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'images/users')
    },
    filename: (req, file, callback) => {
        callback(null, Date.now() + path.extname(file.originalname))
    },
})

const notesStorage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'images/notes')
    },
    filename: (req, file, callback) => {
        callback(null, Date.now() + path.extname(file.originalname))
    },
})

export const uploadUserProfilePic = multer({
    storage: userStorage,
    limits: { fileSize: 5000000 },
    fileFilter(req, file, callback) {
        const fileTypes = /jpeg|jpg|png|gif|PNG|JPG|JPEG|GIF|SVG|svg/
        const mimeType = fileTypes.test(file.mimetype)
        const extName = fileTypes.test(path.extname(file.originalname))

        if (mimeType && extName) {
            return callback(null, true)
        }
        callback(null, false)
    },
}).single('profilePic')

export const uploadNotesImg = multer({
    storage: notesStorage,
    limits: { fileSize: 5000000 },
    fileFilter(req, file, callback) {
        const fileTypes = /jpeg|jpg|png|gif|PNG|JPG|JPEG|GIF|SVG|svg/
        const mimeType = fileTypes.test(file.mimetype)
        const extName = fileTypes.test(path.extname(file.originalname))

        if (mimeType && extName) {
            return callback(null, true)
        }
        callback(null, false)
    },
}).single('notesPic')