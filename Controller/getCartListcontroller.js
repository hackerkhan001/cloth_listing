const AddCart = require('../Model/addCartmodel');


async function GetCartList(req, res){
    try{
        const CartList = await AddCart.findAll();

        const getList = CartList.map((cartProduct)=>({
            ...cartProduct.toJSON(),
        }))
        res.status(200).json({msg:"Cart List fetched successfully", data:getList}); 
    }
    catch(error){
        res.status(500).json(error);
    }
}

module.exports = {GetCartList};