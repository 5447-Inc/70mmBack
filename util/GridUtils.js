const crypto = require('crypto');
const path = require('path');
const GridFsStorage = require('multer-gridfs-storage');
const multer  = require('multer');

const storage = new GridFsStorage({
    url: 'mongodb+srv://90mmUser:5447@cluster.rcddm.mongodb.net/70mmDB?retryWrites=true&w=majority',
    options: {useUnifiedTopology: true},
    file: (req, file) => {
        return new Promise((resolve, reject) => {
        crypto.randomBytes(16, (err, buf) => {
            if (err) {
            return reject(err);
            }
            
            const filename = buf.toString('hex') + path.extname(file.originalname);
            const fileInfo = {
            filename: filename,
            bucketName: 'productPhotos'
            };
            resolve(fileInfo);
        });
        });
    }
});
const upload = multer({ storage });

module.exports = {
    upload: upload,
    storage: storage
};