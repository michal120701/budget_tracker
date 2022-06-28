import React, {useState, useContext} from 'react'
import { TextField,Typography, Grid, Button, FormControl, InputLabel,Select,MenuItem } from '@material-ui/core'
import { ExpenseTrackerContext } from '../../../context/context'
import { v4 as uuidv4 } from 'uuid';

import CustomizedSnackBar from '../../../SnackBar/SnackBar';
import { incomeCategories, expenseCategories } from '../../../contents/catagories';
import formatDate from '../../../utils/formatDate';
import useStyles from './styles'


const initialState = {
    amount:'',
    catagory:'',
    type:"Income",
    date: formatDate(new Date())
}

const Form = () => {
    const classes = useStyles();
    const [formData, setFormData] = useState(initialState);
    const {addTransaction} = useContext(ExpenseTrackerContext);
    const [open, setOpen] = useState(false);

    const createTransaction = () => {
        const transaction = {...formData, amount: Number(formData.amount), id: uuidv4()};
        setOpen(true);
        addTransaction(transaction);
        setFormData(initialState);
    }

    const selectedCatgaories = formData.type === 'Income' ? incomeCategories : expenseCategories;

    return (
        <Grid container spacing = {2} >
            <CustomizedSnackBar open = {open} setOpen = {setOpen}/>
                <Grid item xs ={6} >
                   <FormControl fullWidth>
                       <InputLabel>type</InputLabel>
                       <Select value={formData.type} onChange={(e)=> setFormData({...formData,type: e.target.value})}>
                           <MenuItem value="Income">Income</MenuItem>
                           <MenuItem value="Expense">Expense</MenuItem>
                       </Select>
                   </FormControl>
                </Grid>
                <Grid item xs ={6}>
                    <FormControl fullWidth>
                        <InputLabel>catagory</InputLabel>
                        <Select value={formData.catagory} onChange={(e)=> setFormData({...formData,catagory: e.target.value})}>
                            {selectedCatgaories.map((c) =>  <MenuItem key={c.type} value={c.type}>{c.type}</MenuItem>)}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs ={6}>
                    <TextField type="number" label="Amount" fullWidth value={formData.amount} onChange={(e) => setFormData({...formData,amount:e.target.value})}/>
                </Grid>
                <Grid item xs ={6}>
                    <TextField type="date" label="Date" fullWidth value={formData.date} onChange={(e) => setFormData({...formData,date: formatDate(e.target.value)})}/>
                </Grid>
                <Button className={classes.button} variant="outlined" color="primary" fullWidth onClick={createTransaction}>create</Button>
        </Grid>
    )
}

export default Form
