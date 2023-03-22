import { Box } from "@mui/material";
import { Grid } from "@mui/material";
import React from "react";
import { Tx } from "../utils/types";
import { observer } from "mobx-react-lite";
import exchange from "../utils/exchange";
import { calcExchange } from "../utils/calc";

type FormProps = {
    tx: Tx | null;
};

export const TxForm: React.FC<FormProps> = observer(({tx}) => {
    return (
        <Box sx={{ pt: "10px", overflow: "hidden", lineBreak: "anywhere" }}>
            { tx && 
                <Grid container spacing={2}>
                    <Grid item xs={4}>Hash:</Grid><Grid item xs={8}>{tx?.hash}</Grid>
                    <Grid item xs={4}>Received time:</Grid><Grid item xs={8}>{tx?.time}</Grid>
                    <Grid item xs={4}>Status:</Grid><Grid item xs={8}>{tx?.status}</Grid>
                    <Grid item xs={4}>Size:</Grid><Grid item xs={8}>{tx?.size}</Grid>
                    <Grid item xs={4}>Confirmations:</Grid><Grid item xs={8}>{tx?.confirmations}</Grid>
                    <Grid item xs={4}>Total input:</Grid>
                    <Grid item xs={8}>{calcExchange(tx?.total_input,exchange.value)}  {exchange.curr}</Grid>
                    <Grid item xs={4}>Total output:</Grid>
                    <Grid item xs={8}>{calcExchange(tx?.total_output,exchange.value)} {exchange.curr}</Grid>
                    <Grid item xs={4}>Total fees:</Grid>
                    <Grid item xs={8}>{calcExchange(tx?.fee,exchange.value)}  {exchange.curr}</Grid>
                </Grid>  
            }
        </Box>
    );
});