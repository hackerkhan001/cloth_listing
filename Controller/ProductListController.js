const Category = require("../Model/categorymodel");
const Product = require("../Model/productmodel");
const path = require('path');

async function ProductList(req,res){
    console.log(req.body);
    try{
        
        const ProductList = await Product.findAll();
        const updatedList = ProductList.map((product) => ({
            ...product.toJSON(),
            imageurl: path.join("uploads", "imageDir",product.imageurl).replace(/\\/g, '/')
        }));
        if(req.body.admin){
        res.status(200).json({msg:"Prdouct List fetched successfully", data:updatedList}); 
        }
        else{
            const FilterData = updatedList.filter(val => val.activeStatus == true);
            res.status(200).json({msg:"Active Prdoucts fetch", data:FilterData});
        } 
    }
    catch(error){
        res.status(500).json(error);
    }
}

async function ProductById(req,res){
    const { id } = req.params;
    try{
        const item = await Product.findByPk(id);
        if(!item) {
            return res.status(400).json({msg:"No data"})
        }
        const imageurl = path.join("uploads", "imageDir", item.imageurl).replace(/\\/g, '/');
        const productWithImageUrl = {
            ...item.toJSON(),
            imageurl: imageurl
        };
        res.status(200).json(productWithImageUrl)
    }
    catch(error){

    }
}

async function ProductBycategory(req,res){
    const {categoryId} = req.body;
    try{
        const getCategory = await Product.findAll({where: {categoryId: categoryId}});
        const updatedList = getCategory.map((product) => ({
            ...product.toJSON(),
            imageurl: path.join("uploads", "imageDir",product.imageurl).replace(/\\/g, '/')
        }));
        if(req.body.admin){
        res.status(201).json({categoryList: updatedList ,msg:"List fetched by id is successfully"});
        }
        else{
            const FilterData = updatedList.filter(val => val.activeStatus == true);
            res.status(200).json({msg:"Active Prdoucts fetch", categoryList:FilterData});
        }
    }
    catch(error){
        res.status(500).json(error);
    }

}
module.exports = {ProductList, ProductBycategory,ProductById}