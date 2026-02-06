import multer from "multer";
import path from "path";
import fs from "fs";

const uploadDir = "uploads";
if(!fs.existsSync(uploadDir)){ //jika directorynya tidak ada maka buat directory baru dengan nama "uploads"
    fs.mkdirSync(uploadDir)
}


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir); // callback, dimana errornya null dan directorynya "uploads"
    }, 
    filename: (req, file, cb) => { //assign nama file yang terupload
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9)
        const originalName = path.parse(file.originalname).name;
        cb(null, `${uniqueSuffix}-${originalName}${path.extname(file.originalname)}`);
    }
})

const fileFilter = (req: any, file: Express.Multer.File, cb: multer.FileFilterCallback)=> {
    if(file.mimetype.startsWith("image/") || file.mimetype === "image/svg+xml"){ // kalau yang diupload berupa image maka error = null dan acceptFile = true
        cb(null, true)
    }else{
        cb(new Error ("Only images are allowed"))
    }
}

export const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {fileSize: 5*1024*1024} //5MB
})