import {Table,Column,Model,DataType} from 'sequelize-typescript'
import { OrderStatus } from '../../globals/types'

@Table({
    timestamps : true,
    tableName : "orders",
    modelName : "Order"
})
class Order extends Model{
    @Column({
        primaryKey : true,
        type:DataType.UUID,
        defaultValue : DataType.UUIDV4
    })
    declare id : string

    @Column({
        type : DataType.STRING,
        allowNull : false,
        validate : {
            len:{
                args : [10,10],
                msg : "Phone number must be between 10 and 10 characters"
            }
        }

    })
    declare phoneNumber : string

    @Column({
        type : DataType.STRING,
        allowNull : false,
        validate : {
            len:{
                args : [3,255],
                msg : "Address must be between 3 and 255 characters"
            }
        }
    })
    declare shippingAddress : string

    @Column({
        type : DataType.FLOAT,
        allowNull: false
    })
    declare totalAmount : number

    @Column({
        type : DataType.ENUM(OrderStatus.Cancelled,
            OrderStatus.Delivered,
            OrderStatus.Ontheway,
            OrderStatus.Pending,
            OrderStatus.Preparation),
            defaultValue: OrderStatus.Pending
    })
        declare orderStatus : string

    }

    export default Order




    //Always DO VALIDATION IN DATABASE IN MODEL
     // MAINTAIN "FAT MODEL THIN CONTROLLER"