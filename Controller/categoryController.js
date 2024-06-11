const Category = require('../Model/categorymodel');

async function AddCategory(req, res) {
    try {
        const { categoryName } = req.body;

        const newCategory = await Category.create({
            categoryName
        });

        const responseData = {
            id: newCategory.categoryId,
            categoryName: newCategory.categoryName,
        }
        res.status(201).json({ categoryDetail: responseData, msg: "Category is created successfully" })
    }
    catch (error) {
        res.status(500).json({ error });
    }
}

async function categoryList(req, res) {
    try {
        const categories = await Category.findAll();
        const updateCategory = categories.map((category) => ({
            ...category.toJSON(),
        }));
        res.status(201).json({ msg: " Categories List Fetched Successfully", data: updateCategory })
    }
    catch (error) {
        res.status(500).json(error);
    }
}
module.exports = { AddCategory,categoryList };