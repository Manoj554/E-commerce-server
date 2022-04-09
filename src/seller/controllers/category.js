import slugify from "slugify";
import categoryModel from "../../models/category.js";

const createCategoryList = (categories) => {
    let List = [], childList = [], rootCategory, childCategory;
    let rid = 0;

    rootCategory = categories.filter(val => val.parentId == undefined);
    let cid = rootCategory.length;
    for (let cate of rootCategory) {
        let category = {
            id: cate._id,
            name: cate.name,
            categoryImage: cate?.categoryImage,
            parentName: 'root',
            status: cate.status,
            did: ++rid
        };
        List.push(category);

        childCategory = categories.filter(val => val.parentId == cate._id);

        for (let childCat of childCategory) {
            let childcategory = {
                id: childCat._id,
                name: childCat.name,
                categoryImage: cate?.categoryImage,
                parentId: childCat?.parentId,
                parentName: cate.name,
                status: childCat.status,
                did: ++cid
            };
            childList.push(childcategory);
        }
    }
    if (childList.length > 0) {
        List = [...List, ...childList];
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
            newCategory.parentId = parentId;
        }
        if (categoryImage) {
            newCategory.categoryImage = categoryImage;
        }

        await categoryModel.create(newCategory);
        const allCat = await categoryModel.find({});
        const categories = createCategoryList(allCat);
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
        const categories = createCategoryList(allCat);
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
        const categories = createCategoryList(allCat);
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
        const categories = createCategoryList(allCat);
        res.status(200).json({ msg: 'category updated successfully', categories });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'server error' });
    }
}