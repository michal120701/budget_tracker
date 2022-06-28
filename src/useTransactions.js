import { useContext} from 'react'
import { ExpenseTrackerContext } from "./context/context"
import { incomeCategories, expenseCategories, resetCategories } from "./contents/catagories"

const useTransactions = (title) => {
    resetCategories();
    const {transactions} = useContext(ExpenseTrackerContext);
    const transactionsPerType = transactions.filter((t) => t.type === title);
    const total = transactionsPerType.reduce((acc, currVal) => acc+=currVal.amount, 0);
    const catagories = title === 'Income' ? incomeCategories : expenseCategories;

    console.log({transactionsPerType, total,catagories});

    transactionsPerType.forEach((t) => {
        const catagory = catagories.find((c) => c.type === t.catagory)

        if(catagory) catagory.amount +=t.amount;
    });

    const filterdCatagories = catagories.filter((c) => c.amount > 0);

    const chartData = {
        datasets: [{
            data: filterdCatagories.map((c) => c.amount ),
            backgroundColor: filterdCatagories.map((c) => c.color )
        }],
        labels: filterdCatagories.map((c) => c.type)
    }

    return({total, chartData});
}

export default useTransactions;