import mongoose from "mongoose";
import slugify from "slugify";
import categoryModel from "../../models/category.js";

const createCategoryLists = (categories, parentId = null, parentName = null) => {
    let List = [], category;

    if (parentId == null) {
        category = categories.filter(val => val.parentId == undefined);
    } else {
        category = categories.filter(val => val.parentId == parentId);
    }

    if (category.length == 0) {
        return [];
    }

    for (let cate of category) {
        let eachCat = {
            id: cate._id,
            name: cate.name,
            parentName: parentName != null ? parentName : 'root',
            parentId: cate?.parentId,
            status: cate.status,
            level: cate.level
        };
        List.push(eachCat);
        let child = createCategoryLists(categories, cate._id, cate.name);
        List = [...List, ...child];
    }
    return List;
}

export const addNewCategory = async (req, res) => {
    const { categoryName, parentId, categoryImage } = req.body;

    try {
        const newCategory = {
            name: categoryName,
            slug: slugify(categoryName, { replacement: '_', lower: true }),
            createdBy: req.user?._id
        };

        if (parentId) {
            let category = await categoryModel.findById(parentId);
            newCategory.parentId = parentId;
            newCategory.level = category.level + 1;
        }
        if (categoryImage) {
            newCategory.categoryImage = categoryImage;
        }

        await categoryModel.create(newCategory);
        const allCat = await categoryModel.find({});
        const categories = createCategoryLists(allCat);
        res.status(201).json({ msg: 'new category added', categories });

    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ msg: 'duplicate category are allowed' });
        }
        console.log(error);
        res.status(500).json({ msg: 'internal server error' });
    }
}

export const getAllCategory = async (req, res) => {
    try {
        const allCat = await categoryModel.find({});
        const categories = createCategoryLists(allCat);
        res.status(200).json({ categories, msg: 'categories found' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'something went wrong' });
    }
}

export const getCategoryBelongsToUser = async (req, res) => {
    try {
        let id = req.id.toString();
        let categories = await categoryModel.find({ createdBy: id });
        categories = createCategoryLists(categories);
        res.status(200).json({ categories, msg: 'categories found' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'something went wrong' });
    }
}

export const deleteCategory = async (req, res) => {
    const id = req.params.id;
    try {
        await categoryModel.deleteMany({ $or: [{ _id: id }, { parentId: id }] });
        const allCat = await categoryModel.find({});
        const categories = createCategoryLists(allCat);
        res.status(200).json({ msg: 'category deleted successfully', categories });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'server error' });
    }
}

export const categoryInfo = async (req, res) => {
    const id = req.params.id;

    try {
        const category = await categoryModel.findById(id);
        if (!category) {
            return res.status(404).json({ msg: 'category not found' });
        }
        res.status(200).json({ msg: 'found category', categoryInfo: category });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'server error' });
    }
}

export const editCategory = async (req, res) => {
    const { categoryName, parentId, categoryImage, id } = req.body;
    try {
        await categoryModel.findByIdAndUpdate(id, {
            name: categoryName,
            slug: slugify(categoryName, { replacement: '_', lower: true }),
            parentId,
            categoryImage
        });
        const allCat = await categoryModel.find({});
        const categories = createCategoryLists(allCat);
        res.status(200).json({ msg: 'category updated successfully', categories });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'server error' });
    }
}