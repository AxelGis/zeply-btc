import { FormControl, InputAdornment, InputLabel, OutlinedInput,  } from "@mui/material";
import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import exchange from "../utils/exchange";

type CurrProps = {

};

export const Currencies: React.FC<CurrProps> = observer(() => {
    let timer:NodeJS.Timeout;

    const updateTicker = () => {
        exchange.getTicker();
        timer = setTimeout(updateTicker, 10000);
    }

    useEffect(() => {
        updateTicker();
        return () => {
            clearTimeout(timer);
        };
    }, []);

    return (
        <div>
            {(exchange.curr !== "BTC") && 
                <FormControl fullWidth sx={{ m: 1 }}>
                    <InputLabel htmlFor="currValue">BTC/{exchange.curr}</InputLabel>
                    <OutlinedInput
                        id="currValue"
                        startAdornment={<InputAdornment position="start">$</InputAdornment>}
                        label={`BTC/${exchange.curr}`}
                        value={exchange.value}
                        readOnly
                    />
                </FormControl>
            }
        </div>
    );
});