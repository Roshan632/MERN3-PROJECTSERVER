import { Request, Response } from "express";
import Product from "../database/models/productModel";
import Category from "../database/models/categoryModel";




class ProductController{
    async createProduct(req:Request,res:Response):Promise<void>{
        if (!req.body || Object.keys(req.body).length === 0) {
            res.status(400).json({
                message: "Request body is missing or wrong content type. Use multipart/form-data with the expected fields."
            })
            return
        }
        const productName = req.body.productName
        const productDescription = req.body.productDescription
        const productPrice = req.body.productPrice
        const productTotalStock = req.body.productTotalStock
        const discount = req.body.discount
        const categoryId = req.body.categoryId
        console.log('content-type:', req.headers['content-type'])
        console.log('req.body:', req.body)
        console.log(req.file)
        const filename = req.file ? req.file.filename : "https://weimaracademy.org/wp-content/uploads/2021/08/dummy-user.png"
        if(!productName || !productDescription || !productPrice || !productTotalStock  || !categoryId){
            res.status(400).json({
                message : "Please provide productName, productDescription, productPrice, productTotalStock, and categoryId"
            })
            return
        }
        await Product.create({
            productName,
            productDescription,
            productPrice,
            productTotalStock,
            discount : discount || 0,
            categoryId : categoryId, 
            productImageUrl : filename
        })
        res.status(200).json({
            message : "Product created successfully"
        })
    }
    async getAllProducts(req:Request,res:Response) : Promise<void>{
        const datas = await Product.findAll({
            include : [
                {
                    model : Category,
                    attributes : ["id","categoryName"]
                }
            ]
        })
        res.status(200).json({
            message : "Products fetched successfully", 
            data : datas
        })
    }
    async getSingleProduct(req:Request,res:Response) : Promise<void>{
        const {id} = req.params
        const datas = await Product.findAll({
            where : {
                id : id
            },
            include : [
                {
                    model : Category,
                    attributes : ["id","categoryName"]
                }
            ]
        })
        res.status(200).json({
            message : "Products fetched successfully", 
            data : datas
        })
    }
     async deleteProduct(req:Request,res:Response) : Promise<void>{
        const {id} = req.params
        const datas = await Product.findAll({
            where : {
                id : id
            }
        })
        if(datas.length === 0){
            res.status(404).json({
                message : "No product with that id"
            })
        }else{
            await Product.destroy({
                where : {
                    id : id
                }
            })
            res.status(200).json({
                message : "Products deleted successfully", 
                data : datas
            })
        }
    }


    // update
    async updateProduct(req:Request,res:Response) : Promise<void>{
        const {id} = req.params
        const body = req.body || {}
        const {productName,productDescription,productPrice,productTotalStock,discount,categoryId} = body
        const filename = req.file ? req.file.filename : "https://weimaracademy.org/wp-content/uploads/2021/08/dummy-user.png"
        const datas = await Product.findAll({
            where : {
                id : id
            }
        })
        if(datas.length === 0){
            res.status(404).json({
                message : "No product with that id"
            })
        }else{
            await Product.update({
                productName : productName || datas[0].get("productName"),
                productDescription : productDescription || datas[0].get("productDescription"),
                productPrice : productPrice || datas[0].get("productPrice"),
                productTotalStock : productTotalStock || datas[0].get("productTotalStock"),
                discount : discount || datas[0].get("discount"),
                categoryId : categoryId || datas[0].get("categoryId"),
                productImageUrl : filename
            }, {
                where : {
                    id : id
                }
            })
            res.status(200).json({
                message : "Product updated successfully"
            })
        }
    }
}

export default new ProductController