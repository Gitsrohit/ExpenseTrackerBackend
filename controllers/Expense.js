const ExpenseSchema = require("../models/ExpenseModel")

exports.addExpense=async(req,res)=>{ 
    const {title,amount,description,category,date} = req.body
    const Expense = ExpenseSchema({
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
        await Expense.save()
        res.status(200).json({message:'Expense added'})
        
    } catch (error) {
        res.status(500).json({message:'Server error'})
    }
    console.log(Expense)
}

exports.getExpense = async(req,res)=>{
    try {
        const Expenses = await ExpenseSchema.find().sort({createdAt:-1})
        res.status(200).json(Expenses)
    } catch (error) {
        res.status(500).json({message: 'Server error'})
    }
}

exports.deleteExpense = async(req,res)=>{
  const {id} = req.params;
  ExpenseSchema.findByIdAndDelete(id)
  .then((expense)=>{
    res.status(200).json({message:'Expense Deleted'})
  })
  .catch((err)=>{
    res.status(500).json({message:'Server Error'})
  })
}
