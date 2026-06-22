import { Request, Response } from "express";
import Order from "../database/models/orderModel";
import OrderDetails from "../database/models/orderDetails";
import { PaymentMethod } from "../globals/types";
import Payment from "../database/models/paymentModel";
import axios from 'axios'

interface IProduct{
    productId : string,
    productQty : number
}

interface OrderRequest extends Request{
    user? : {
        id : string
    }
}

class OrderController{
    static async createOrder(req:OrderRequest,res:Response):Promise<void>{
        const userId =  req.user?.id
        const {phoneNumber,shippingAddress,totalAmount,paymentMethod} = req.body 
        const products:IProduct[] = req.body.products
        if(!phoneNumber || !shippingAddress || !totalAmount || products.length == 0 ){
            res.status(400).json({
                message : "Please provide phoneNumber,shippingAddress,totalAmount,products"
            })
            return
        }
        // for order 
        const orderData = await Order.create({
            phoneNumber, 
            shippingAddress, 
            totalAmount, 
            userId
        })
        // for orderDetails
        // console.log(orderData,"OrderData!!")
        // console.log(products)
            for (const product of products){
                await OrderDetails.create({
                        quantity : product.productQty,
                        productId : product.productId,
                        orderId : orderData.id
                })
            }
      // for payment 
    //   let paymentData;
    //   if(paymentMethod == PaymentMethod.COD){
        const paymentData = await Payment.create({
            orderId : orderData.id, 
            paymentMethod : paymentMethod, 
        })
    if (paymentMethod == PaymentMethod.Khalti){
        // khalti logic
                const data = {
                        return_url: "http://localhost:5173/", //after successful
                        website_url: "http://localhost:5173/", //your home page
                        amount: totalAmount * 100,  //khalti accepts in paisa so
                        purchase_order_id: orderData.id, //your orderId
                        purchase_order_name: "order_" + orderData.id  //Your OrderId Name
                }

                try{
                    const khaltiRes = await axios.post("https://dev.khalti.com/api/v2/epayment/initiate/", data, {
                        headers: {
                            Authorization: "Key 937f47f08a504d26bc548980bfc2db0f"
                        }
                    })

                    const khaltiResponse = khaltiRes.data
                    paymentData.pidx = khaltiResponse.pidx
                    await paymentData.save()

                    res.status(200).json({
                        message: "Khalti payment initiated",
                        url: khaltiResponse.payment_url
                    })
                    return
                }catch(err:any){
                    console.error("Khalti init error:", err?.response?.data || err.message || err)
                    res.status(500).json({ message: "Failed to initiate Khalti payment" })
                    return
                }
      }else{
        // esewa logic

      }
            res.status(200).json({
                message : "Order created successfully"
            })
    }
}

export default OrderController

/* 
{  
    shippingAddress : "Itahari", 
    phoneNumber : 912323, 
    totalAmount : 1232, 
    products : [{
 productId : 89123123, 
 qty : 2 
},
 {productId : 123123, 
 qty : 1
}]
}
*/