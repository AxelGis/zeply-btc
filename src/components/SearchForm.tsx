import React, { useEffect, useState } from "react";
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { Alert, Collapse, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { AddressForm } from "./AddressForm";
import { TxForm } from "./TxForm";
import { Address, Tx } from "../utils/types";
import { GetAddressInfo, GetTxInfo } from "../utils/btcscan";
import { getSubscription, setSubscription } from "../utils/session";

type SearchFormProps = {
    type: string;
};

export const SearchForm: React.FC<SearchFormProps> = ({type}) => {
    const [address, setAddress] = useState<Address | null>(null);
    const [tx, setTx] = useState<Tx | null>(null);
    const [hash, setHash] = useState<string>("");
    const [subscribed,setSubscribed] = useState<boolean>(false);
    const [cache,setCache] = useState<string[]>([]);
    const [open,setOpen] = useState<boolean>(false);
    const [alertContent,setAlertContent] = useState<string>("");

    const searchHash = async () => {
        if(type === "Address"){
            const data:Address | null = await GetAddressInfo(hash);
            setAddress(data);
            if(data === null) showError();
        } else {
            const data:Tx | null = await GetTxInfo(hash);
            setTx(data);
            if(data === null) showError();
        }

        const topCache:string[] = setSubscription(`${type}_cache`, hash, 5);
        setCache(topCache);

        const subscriptions:string[] = getSubscription(type);
        setSubscribed(subscriptions.includes(hash));
    }

    const updateSubscription = () => {
        const subscriptions:string[] = setSubscription(type, hash);
        setSubscribed(subscriptions.includes(hash));
    }

    const showError = () => {
        setOpen(true);
        setAlertContent("Cannot find data");
    }

    useEffect(() => {
        const topCache:string[] = getSubscription(`${type}_cache`);
        setCache(topCache);
    }, [type]);

    return (
        <Grid item xs={12} sm={6}>
            <Grid container spacing={0}>
                <Grid item xs={11}>
                    <Autocomplete
                        id={type}
                        freeSolo
                        options={cache}
                        onKeyDown={(event) => {
                            if (event.key === 'Enter') {
                                searchHash();
                            }
                        }}
                        onChange={(e,value)=>{ setHash(value||"") }}
                        renderInput={(params) => 
                            <TextField {...params} label={type} onChange={e=>{ setHash(e.target.value) }}/>}
                    />
                </Grid>
                <Grid item xs={1}>
                    <IconButton color="primary" 
                        aria-label="Search"
                        onClick={searchHash}
                    >
                        <SearchIcon />
                    </IconButton>
                </Grid>
            </Grid>
            <Collapse in={open}>
                <Alert severity='warning'
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
                    {alertContent}
                </Alert>
            </Collapse>
            { (address || tx) && 
            <Button 
                onClick={()=>{updateSubscription()}} 
                fullWidth 
                variant="contained" 
                sx={{ mt: 1, mb: 1 }}
                color={subscribed ? "warning" : "success"}
            >
                {subscribed ? "Unsubscribe" : "Subscribe"}
            </Button>
            }
            {type === "Address" ? <AddressForm address={address} /> : <TxForm tx={tx}/>}
        </Grid> 
    );
};