import categoryModel from "../../models/category.js";

export const createCategoryList = (categories, parent = null) => {
    const categoryList = [];
    let category;

    if (parent == null) {
        category = categories.filter(cate => cate.parentId === undefined);
    } else {
        category = categories.filter(cate => cate.parentId == parent);
    }

    for (let data of category) {
        let newCategory = {
            id: data._id,
            name: data.name,
            // categoryImage: data.categoryImage,
            parentId: data.parentId,
            status: data.status,
            level: data.level,
            children: createCategoryList(categories, data._id)
        };
        categoryList.push(newCategory);
    }
    return categoryList;

}

export const getAllCategory = async (req, res) => {
    try {
        const categories = await categoryModel.find({});
        const categoryList = createCategoryList(categories);
        res.status(200).json({ categories: categoryList, msg: 'all category list' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'server error' });
    }
}

