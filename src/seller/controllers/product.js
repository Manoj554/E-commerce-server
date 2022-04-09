import slugify from "slugify";
import productModel from "../../models/product.js";

const createProductSeller = (products) => {
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

export const addNewProduct = async (req, res) => {
    const { productName, category, offeredPrice, retailPrice, quantity, description, productImage } = req.body;

    try {
        const percentageOff = Math.round(((retailPrice - offeredPrice) / retailPrice) * 100);
        const newProduct = {
            name: productName,
            slug: slugify(productName, { replacement: '_', lower: true }),
            price: retailPrice,
            priceOffered: offeredPrice,
            quantity: quantity,
            createBy: req.user?._id,
            category: category,
            description: description,
            percentageOff
        }

        if (productImage) {
            newProduct.productImage = productImage
        }

        await productModel.create(newProduct);
        let products = await productModel.find({});
        products = createProductSeller(products);
        res.status(201).json({ msg: 'new product created', products })
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'server error' });
    }
}

export const getAllProducts = async (req, res) => {
    try {
        let products = await productModel.find({});
        products = createProductSeller(products);
        res.status(200).json({ msg: 'product found', products });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'server error' });
    }
}

export const editProduct = async (req, res) => {
    const { productName, category, offeredPrice, retailPrice, quantity, description, productImage, id } = req.body;

    try {
        const percentageOff = Math.round(((retailPrice - offeredPrice) / retailPrice) * 100);
        const updatedProduct = {
            name: productName,
            slug: slugify(productName, { replacement: '_', lower: true }),
            price: retailPrice,
            priceOffered: offeredPrice,
            quantity: quantity,
            createBy: req.user?._id,
            category: category,
            description: description,
            percentageOff
        };
        if (productImage) {
            updatedProduct.productImage = productImage
        };

        await productModel.findByIdAndUpdate(id, updatedProduct);
        let products = await productModel.find({});
        products = createProductSeller(products);
        res.status(200).json({ msg: 'product susscessfully updated', products });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'server error' });
    }
}

export const getProductInfo = async (req, res) => {
    const id = req.params.id;

    try {
        const product = await productModel.findById(id);
        if (!product) {
            return res.status(404).json({ msg: 'product not found' });
        }
        res.status(200).json({ msg: 'found category', productInfo: product });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'server error' });
    }
}

export const deleteProduct = async (req, res) => {
    const id = req.params.id;

    try {
        await productModel.findByIdAndDelete(id);
        let products = await productModel.find({});
        products = createProductSeller(products);
        res.status(200).json({ msg: 'product successfully deleted', products })
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'server error' });
    }
}

export const searchProduct = async (req, res) => {
    const { query } = req.query;
    try {
        const regex = new RegExp(query, 'i');
        const products = await productModel.find({ name: regex }).sort({ "updatedAt": -1 }).sort({ "createdAt": -1 });
        res.status(200).json({ products });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'internal server error' });
    }
}

export const searchProductByCategory = async (req, res) => {
    const id = req.params.id;
    try {
        const products = await productModel.find({ category: id }).sort({ "updatedAt": -1 }).sort({ "createdAt": -1 });
        res.status(200).json({ products });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'internal server error' });
    }
}