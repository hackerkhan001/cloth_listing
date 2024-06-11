const AddCart = require("../Model/addCartmodel");

async function DeleteCart(req, res) {
    const{ id } = req.params;
    try{
        const item = await AddCart.findByPk(id);
        if(!item) {
            return res.status(400).send({error: "Item"})
    }
    await item.destroy();

    return res.status(201).json({ message: 'cart Product deleted successfully' });
}
catch(error){
    res.status(500).json({error: error.message});
}
}
module.exports = {DeleteCart};