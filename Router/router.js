const express = require('express');
const router =  express.Router();


const { registerUser } = require('../Controller/RegisterationController');
const { loginUser } = require('../Controller/loginUserController');
const { ProductDetail } = require('../Controller/productcontroller');
const {upload} = require('../helper/filehelper');
const { AddCategory, categoryList } = require('../Controller/categoryController');
const { ProductList, ProductBycategory, ProductById } = require('../Controller/ProductListController');
const { DeleteProduct } = require('../Controller/deleteProductController');
const { UpdateProduct } = require('../Controller/UpdatePrdouctController');
const { AddCartProduct } = require('../Controller/addCartController');
const { CartByUser, CheckOutCartProduct } = require('../Controller/getCartByusercontroller');
const { GetCartList } = require('../Controller/getCartListcontroller');
const { DeleteCart } = require('../Controller/deleteCartController');


router.get('/' , (req,res)=>{
    res.send('new Cloth listing Application created')
});
router.post('/Register' , registerUser);

router.post('/LoginUser' ,loginUser);

router.post('/ProductDetail',upload.fields([
    { name: 'imageurl', maxCount: 1 }]), ProductDetail);

router.post('/Category',AddCategory);

router.post('/ProductList', ProductList);

router.get('/ProductById/:id', ProductById)

router.post('/CategoryList', categoryList);

router.post('/ProductListBycategoryId', ProductBycategory);

router.delete('/DeleteProduct/:id', DeleteProduct);

router.put('/UpdateProduct/:id',upload.fields([
    { name: 'imageurl', maxCount: 1 }]), UpdateProduct);

router.post('/cartProduct', AddCartProduct);

router.post('/GetCartList', GetCartList );

router.post('/CartByUser', CartByUser);

router.put('/CheckOutProduct/:id', CheckOutCartProduct);

router.delete('/Deletecart/:id', DeleteCart);

module.exports = router;