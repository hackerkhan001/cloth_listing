const Product = require("../Model/productmodel");

async function DeleteProduct(req,res){
    const{ id } = req.params;
    try{
        const item = await Product.findByPk(id);
        if(!item) {
            return res.status(400).send({error: "Item"})
    }
    await item.destroy();

    return res.status(201).json({ message: 'Product deleted successfully' });
}
catch(error){
    res.status(500).json({error: error.message});
}
}
module.exports= { DeleteProduct };