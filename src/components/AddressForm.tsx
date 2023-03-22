import { Box } from "@mui/material";
import { Grid } from "@mui/material";
import React from "react";
import { Address } from "../utils/types";
import { observer } from "mobx-react-lite";
import exchange from "../utils/exchange";
import { calcExchange } from "../utils/calc";

type FormProps = {
    address: Address | null;
};

export const AddressForm: React.FC<FormProps> = observer(({address}) => {
    return (
        <Box sx={{ pt: "10px", overflow: "hidden", lineBreak: "anywhere" }}>
            {address &&
                <Grid container spacing={2}>
                    <Grid item xs={4}>Address:</Grid><Grid item xs={8}>{address?.address}</Grid>
                    <Grid item xs={4}>Balance:</Grid>
                    <Grid item xs={8}>{calcExchange(address?.final_balance,exchange.value)}  {exchange.curr}</Grid>
                    <Grid item xs={4}>Received:</Grid>
                    <Grid item xs={8}>{calcExchange(address?.total_received,exchange.value)}  {exchange.curr}</Grid>
                    <Grid item xs={4}>Spent:</Grid>
                    <Grid item xs={8}>{calcExchange(address?.total_sent,exchange.value)}  {exchange.curr}</Grid>
                    <Grid item xs={4}>Confirmed:</Grid><Grid item xs={8}>{address?.n_tx}</Grid>
                    <Grid item xs={4}>Unspent:</Grid><Grid item xs={8}>{address?.n_unredeemed}</Grid>
                </Grid>
            }
        </Box>
    );
});