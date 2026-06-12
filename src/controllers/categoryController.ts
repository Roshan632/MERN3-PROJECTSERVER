import Category from "../database/models/categoryModel"
 

class CategoryController {
      categoryData=[
        {
            categoryName:"Electronics"
        },
        {
            categoryName:"Clothing"
        },
        {
            categoryName:"Home & Kitchen"
        },
        {
            categoryName:"Foods"
        },
     ]
      async seedCategory():Promise<void>{
        const datas = await Category.findAll()
        if(datas.length > 0){
            await Category.bulkCreate(this.categoryData)
            console.log("Categories seeded successfully.")
            
        }else{
            console.log("Categories already exists.")
        }
        
     }
}

export default new CategoryController