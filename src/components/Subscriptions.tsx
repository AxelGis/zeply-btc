import { Alert, Collapse, Grid, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import React, { useEffect, useState } from "react";
import { GetAddressInfo, GetTxInfo } from "../utils/btcscan";
import { getSubscription, setSubscription } from "../utils/session";
import { Address, Tx } from "../utils/types";

interface GenericObject {
    [key: string]: any,
 }

export const Subscriptions: React.FC = () => {
    const [open,setOpen] = useState<boolean>(false);
    const [alertContent,setAlertContent] = useState<string[]>([]);
    const [cacheSubAddr, setCacheSubAddr] = useState<Address[]>([]);
    const [cacheSubTx, setCacheSubTx] = useState<Tx[]>([]);
    let timer:NodeJS.Timeout;

    const updateSubscriptions = () => {
        ['Address','Transaction'].map(async (type:string)=>{
            const cache:any[] = [];
            const subscriptions: string[] = getSubscription(type);
            for(let i=0; i<subscriptions.length;i++){
                if(type === 'Address'){
                    const data = await GetAddressInfo(subscriptions[i]);
                    if(data){
                        cache.push(data);
                        checkUpdate(type,data);
                    }
                } else {
                    const data = await GetTxInfo(subscriptions[i]);
                    if(data){
                        cache.push(data);
                        checkUpdate(type,data);
                    }
                }
            }
            type === 'Address' ? setCacheSubAddr(cache as Address[]) : setCacheSubTx(cache as Tx[]);
        });
        timer = setTimeout(updateSubscriptions, 10000);
    }

    const checkUpdate = (type:string, data:GenericObject) => {
        let old:GenericObject | undefined; 
        if(type === 'Address'){
            old = cacheSubAddr.find(x => x.address === (data as Address).address);
        } else {
            old = cacheSubTx.find(x => x.hash === (data as Tx).hash);
        }
        if(old){
            let alert:string[] = [];
            for(let key in data){
                if(old[key] && (typeof old[key] === "string" || typeof old[key] ===  "number") && old[key] !== data[key]){
                    alert.push("Hash update: " + (type === 'Address' ? data['address'] : data['hash']));
                    alert.push(`${key}: ${data[key]}`);
                }
            }
            setAlertContent(alert);
            setOpen(alert.length !== 0);
        }
    }

    useEffect(() => {
        updateSubscriptions();
        return () => {
            clearTimeout(timer);
        };
    }, []);

    return (
        <div>
            <Collapse in={open}>
                <Alert severity='info'
                    action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => {
                                setOpen(false);
                            }}
                        >
                            <CloseIcon fontSize="inherit" />
                        </IconButton>
                    }
                    sx={{ mb: 2, overflow: "hidden", lineBreak: "anywhere" }}
                >
                    {alertContent.map(alert=><p>{alert}</p>)}
                </Alert>
            </Collapse>
            <h2>Subscriptions:</h2>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <h3>Address:</h3>
                    {
                        cacheSubAddr.map(el=>
                            <Grid container spacing={2} sx={{ pt: "10px", overflow: "hidden", lineBreak: "anywhere" }}>
                                <Grid item xs={10}>{el.address}</Grid>
                                <Grid item xs={2}>
                                <IconButton 
                                    onClick={()=>{
                                        setSubscription('Address',el.address);
                                        updateSubscriptions();
                                    }} 
                                >
                                    <CloseIcon fontSize="inherit" />
                                </IconButton>
                                </Grid>
                            </Grid>
                    )}
                </Grid>
                <Grid item xs={6}>
                    <h3>Transaction:</h3>
                    {
                        cacheSubTx.map(el=>
                            <Grid container spacing={2} sx={{ pt: "10px", overflow: "hidden", lineBreak: "anywhere" }}>
                                <Grid item xs={10}>{el.hash}</Grid>
                                <Grid item xs={2}>
                                <IconButton 
                                    onClick={()=>{
                                        setSubscription('Transaction',el.hash);
                                        updateSubscriptions();
                                    }} 
                                >
                                    <CloseIcon fontSize="inherit" />
                                </IconButton>
                                </Grid>
                            </Grid>
                    )}
                </Grid>
            </Grid>
        </div>
    );
};