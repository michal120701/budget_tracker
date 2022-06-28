import React, {useContext} from "react";
import { Card,CardHeader, CardContent, Typography, Divider, Grid } from "@material-ui/core";
import {ExpenseTrackerContext} from '../../context/context'


import useStyles from './styles';
import Form from "./Form/Form";
import List from "./List/List";
const Main = () => {
    const classes = useStyles();
    const {balance} = useContext(ExpenseTrackerContext);
    return (
       <Card className={classes.root} >
           <CardHeader title="Expense Tracker"/>
           <CardContent>
                <Typography align="center" variant="h5">total balance ${balance}</Typography>
                <Divider/>
                <Form/>
            </CardContent>
            <CardContent className={classes.cartContent}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <List/>
                    </Grid>
                </Grid>
            </CardContent>
       </Card>
    )
}

export default Main
