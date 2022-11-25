import multer from "multer";

// Amanda
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './client/src/assets/uploads');
    },
    filename: function(req, file, cb) {
        cb(null, new Date().toISOString() + '-' + file.originalname)
    }
})

const fileFilter = (req, file, cb) => {
    console.log("test file filter");
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png" || file.mimetype === "image/jpeg") {
        cb(null, true)
    } else {
        cb({message: "Unsupported File Format"}, false);
    }
}

// file validation
const upload = multer({
    storage: storage,
    limits: {fileSize: 1024*1024},
    fileFilter: fileFilter
})


export default upload;
