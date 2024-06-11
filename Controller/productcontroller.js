const Product = require('../Model/productmodel');

async function ProductDetail(req, res){
    console.log(req.files);
    try {
        const { imageurl } = req.files
        const { productName, price, categoryId ,activeStatus} = req.body;
        

        const newProduct = await Product.create({
            imageurl: imageurl[0].filename,
            productName,
            price,
            categoryId,
            activeStatus: activeStatus || true,
        })
        res.status(201).json({ productDetail: newProduct, msg: 'Product Detail created successfully' });
    } catch (error) {
        console.error('Error to collect detail', error);
        res.status(500).json({ error });
    } 
}

module.exports = {ProductDetail}