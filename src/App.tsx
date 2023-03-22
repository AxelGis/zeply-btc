import React, { useState } from 'react';
import './App.css';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import { SearchForm } from './components/SearchForm';
import { Currencies } from './components/Currencies';
import exchange from "./utils/exchange";
import { observer } from "mobx-react-lite";
import { Subscriptions } from './components/Subscriptions';

const App = observer(() => {
  return (
    <Container component="main" maxWidth="lg" sx={{ pt: "10px" }}>
      <Stack direction="row" spacing={2}>
        <Select 
            id="currencies"
            value={exchange.curr} 
            label="Currency" 
            sx={{ mt: 1, mb: 1 }} 
            onChange={(e: SelectChangeEvent<string>)=>{
              exchange.setTicker(e.target.value);
            }}
        >
          <MenuItem key='BTC' value='BTC'>BTC</MenuItem>
          <MenuItem key='USD' value='USD'>USD</MenuItem>
          <MenuItem key='EUR' value='EUR'>EUR</MenuItem>
        </Select>
        <Currencies />
      </Stack>
      <Grid container spacing={2}>
        <SearchForm type='Address'/>
        <SearchForm type='Transaction'/>
      </Grid>
      <Subscriptions/>
    </Container>
  );
});

export default App;
