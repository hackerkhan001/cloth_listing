const AddCart = require("../Model/addCartmodel");
const Product = require("../Model/productmodel");

async function CartByUser(req,res){
    const {userId} = req.body; 
    try{
    const getCart = await AddCart.findAll({where:{userId:userId}});

    // const product = await Product.

    // const update = getCart.map((value)=>({
    //     ...value.toJSON(),

    // }))
    // const checkOutCart = update.filter((product) => product.checkOut === true);
    // res.status(201).json({ msg: "Cart List Fetched by user", data: checkOutCart })
    const productIds = getCart.map((cartItem) => cartItem.productId);

    const products = await Product.findAll({
        where: {
            productId: productIds
        }
    });

    const update = getCart.map((cartItem) => ({
        ...cartItem.toJSON(),
        productDetails: products.find((product) => product.productId === cartItem.productId)
    }));

    const checkOutCart = update.filter((product) => product.checkOut === true);

    res.status(201).json({ msg: "Cart List Fetched by user", data: checkOutCart });


}
catch(error){
    res.status(500).json(error);
}
}

async function CheckOutCartProduct(req, res){
    const { id } = req.params;
    try{
        const {checkOut} = req.body;
        const item = await AddCart.findByPk(id);
        if (typeof checkOut === 'boolean') {
            item.checkOut = checkOut;
        }
        await item.save();
        res.status(201).json({ msg: "Product Check Out Successfully",data:item});
    }
    catch(error){
        return res.status(500).json({ error: error.message });
    }
}
module.exports = {CartByUser,CheckOutCartProduct};