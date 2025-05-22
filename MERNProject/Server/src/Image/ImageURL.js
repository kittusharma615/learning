const cloudinary = require('cloudinary').v2;
const sharp = require('sharp');
require('dotenv').config();

cloudinary.config({ 
    cloud_name: process.env.Cloud_name, 
    api_key: process.env.API_key, 
    api_secret: process.env.API_secret
});

exports.UserImgURL = async (bufferImg) => {
    try {
        console.log(bufferImg)
        const processedBuffer = await sharp(bufferImg)
            .resize(720, 1080) // resize to profile-pic size
            .jpeg({ quality: 40 }) // compress to lower quality
            .toBuffer();

        const base64Img = `data:image/jpeg;base64,${processedBuffer.toString('base64')}`;

        const uploadResult = await cloudinary.uploader.upload(base64Img, {
            resource_type: 'image',
            folder: 'profile_pics', // optional: saves uploads in a subfolder
        });

        return {asset_id:uploadResult.asset_id,secure_url:uploadResult.secure_url};
    } catch (error) {
        console.error('Upload error:', error);
        throw error;
    }
};
exports.DeleteImage = async (asset_id) => {
    try {
        const searchResult = await cloudinary.api.resource_by_asset_id(asset_id);

        const public_id = searchResult.public_id;

        const deleteResult = await cloudinary.uploader.destroy(public_id);

        return deleteResult;
    } catch (error) {
        console.error('Delete error:', error);
        throw error;
    }
};