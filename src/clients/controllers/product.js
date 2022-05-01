import categoryModel from "../../models/category.js";
import productModel from "../../models/product.js";

export const createProductList = (products) => {
    let myProduct = [];
    for (let prod of products) {
        let product = {
            id: prod._id,
            name: prod.name,
            category: prod.category,
            price: prod.price,
            priceOffered: prod.priceOffered,
            productImage: prod.productImage,
            percentageOff: prod.percentageOff
        };
        myProduct.unshift(product);
    }
    return myProduct;
}

const createCategoriesList = (categories) => {
    let mycategories = [];
    for (let data of categories) {
        let category = {
            id: data._id,
            name: data.name,
            // categoryImage: data.categoryImage,
            parentId: data.parentId,
            status: data.status,
            level: data.level
        };
        mycategories.push(category);
    }
    return mycategories;
}

export const getProductsByCategory = async (req, res) => {
    const id = req.params.id;

    try {
        const children = await categoryModel.find({ parentId: id });
        const subCategory = createCategoriesList(children);
        let ids = children.map((val) => val._id);
        let products = await productModel.find().where('category').in(ids);
        products = createProductList(products);
        res.status(200).json({ products, subCategory, msg: 'products found' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'server error' });
    }
}

export const getProductsByRootCategory = async (req, res) => {
    const id = req.params.id;

    try {
        const subcat = await categoryModel.find({ parentId: id });
        let subcatIds = subcat.map(id => id._id);
        const subcat2 = await categoryModel.find().where('parentId').in(subcatIds);
        let ids = subcat2.map(id => id._id);
        let products = await productModel.find().where('category').in(ids);
        products = createProductList(products);
        let subCategory = [...subcat, ...subcat2];
        subCategory = createCategoriesList(subCategory);
        res.status(200).json({ products, subCategory, msg: 'products found' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'server error' });
    }
}

export const getAllProduct = async (req, res) => {
    try {
        let categories = await categoryModel.find({});
        categories = categories.filter((val) => val.level >= 2);
        categories = createCategoriesList(categories);
        let products = await productModel.find({});
        products = createProductList(products);
        res.status(200).json({ products, subCategory: categories, msg: 'products found' });

    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'server error' });
    }
}

export const filterProductsByCategory = async (req, res) => {
    const ids = req.body.ids;

    try {
        if (ids.length == 0) {
            return res.status(204).json({ products: [], msg: 'no id selected' });
        }
        let products = await productModel.find().where('category').in(ids);
        products = createProductList(products);
        res.status(200).json({ products, msg: 'products found' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'server error' });
    }

}

export const filterProductsBySubRootCategory = async (req, res) => {
    const ids = req.body.ids;

    try {
        if (ids.length == 0) {
            return res.status(204).json({ products: [], msg: 'no id selected' });
        }
        const subcat = await categoryModel.find().where('parentId').in(ids);
        let newids = subcat.map(val => val._id);
        let products = await productModel.find().where('category').in(newids);
        products = createProductList(products);
        res.status(200).json({ products, msg: 'products found' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'server error' });
    }
}

export const searchSuggestion = async (req, res) => {
    const { query } = req.query;
    try {
        const regex = new RegExp(query, 'i');
        let products = await productModel.find({ name: regex }).sort({ "updatedAt": -1 }).sort({ "createdAt": -1 }).limit(5);
        products = products.map(val => val.name);
        res.status(200).json({ products });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'internal server error' });
    }
}

export const searchByName = async (req, res) => {
    const { query } = req.query;
    try {
        const regex = new RegExp(query, 'i');
        let products = await productModel.find({ name: regex });
        products = createProductList(products);
        res.status(200).json({ products });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'internal server error' });
    }
}

export const getProductInfo = async (req, res) => {
    const id = req.params.id;

    try {
        const product = await productModel.findById(id);
        res.status(200).json({ product });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'internal server error' });
    }
}