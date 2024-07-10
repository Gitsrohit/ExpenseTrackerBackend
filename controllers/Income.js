const IncomeSchema = require("../models/IncomeModel")

exports.addIncome=async(req,res)=>{ 
    const {title,amount,description,category,date} = req.body
    const Income = IncomeSchema({
        title,
        amount,
        description,
        category,
        date
    })
    try {
        if(!title || !category || !description || !date){
            return res.status(400).json({message:'All field are required!'})
        }
        if(amount<=0 || !amount==='number'){
            return res.status(400).json({message:'amount must be a positive!'})
        }
        await Income.save()
        res.status(200).json({message:'Income added'})
        
    } catch (error) {
        res.status(500).json({message:'Server error'})
    }
    console.log(Income)
}

exports.getTransaction = async (req,res)=>{

    const {category , date , tyoe } = req.query;
    const queryObject={};
    if(category){
        queryObject.category={$regex : category , $options: "i"};
    }

    console.log(queryObject);
    const myData = await IncomeSchema.find(queryObject);
    res.status(200).json(myData); 
}

exports.getIncomes = async(req,res)=>{
    try {
        const Incomes = await IncomeSchema.find().sort({createdAt:-1})
        res.status(200).json(Incomes)
    } catch (error) {
        res.status(500).json({message: 'Server error'})
    }
}

exports.deleteIncome = async(req,res)=>{
  const {id} = req.params;
  IncomeSchema.findByIdAndDelete(id)
  .then((income)=>{
    res.status(200).json({message:'Income Deleted'})
  })
  .catch((err)=>{
    res.status(500).json({message:'Server Error'})
  })
}
