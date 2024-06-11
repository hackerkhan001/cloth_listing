const AddCart = require('../Model/addCartmodel');
const Product = require('../Model/productmodel');

async function AddCartProduct(req, res) {
    try {
        const { userId, productId, checkOut } = req.body;

        const product = await Product.findOne({ where: { productId } });

        const existingCartProduct = await AddCart.findOne({where: { userId, productId }});

        if (existingCartProduct) {
            if (existingCartProduct.checkOut === false) {
                
                const newCartProduct = await AddCart.create({
                    userId,
                    productId,
                    checkOut: checkOut || true, 
                });

                return res.status(201).json({ cartProduct: newCartProduct, productDetails: product, msg: "Product successfully added in a new cart" });
            } else {
                return res.status(400).json({ msg: "Product already exists in the cart" });
            }
        }

        const newCartProduct = await AddCart.create({
            userId,
            productId,
            checkOut: checkOut || true,
        });

        res.status(201).json({ cartProduct: newCartProduct, productDetails: product, msg: "Product successfully added in cart" });

    } catch (error) {
        console.error('Error adding product to cart:', error);
        res.status(500).json( error.message );
    }
}



module.exports = { AddCartProduct };
