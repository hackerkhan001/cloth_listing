const Product = require("../Model/productmodel");

async function UpdateProduct(req, res) {
    const { id } = req.params;
    try {
        const { imageurl } = req.files
        const { productName, price, categoryId, activeStatus } = req.body;
        const item = await Product.findByPk(id);

        if (!item) {
            res.status(404).json({ error: 'Product not found' });
        }
        if (productName) item.productName = productName;
        if (categoryId) item.categoryId = categoryId;
        if (price) item.price = price;
        if (imageurl) {

            item.imageurl = imageurl[0].filename;
        }
        if (typeof activeStatus === 'string') {
            item.activeStatus = activeStatus.toLowerCase() === 'true';
        }
        await item.save();
        res.status(201).json({ msg: "Product Updated Successfully" })

    }
    catch (error) {
        return res.status(500).json({ error: error.message });

    }
}

module.exports = {UpdateProduct};