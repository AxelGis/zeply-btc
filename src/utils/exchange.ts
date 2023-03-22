import { makeAutoObservable, action, observable, runInAction } from "mobx";
import { GetTicker } from "./btcscan";

class Exchange {
    @observable curr: string = "BTC";
    @observable value: number = 1;

    constructor() {
        makeAutoObservable(this);
    }

    @action setTicker(_curr:string){
        this.curr = _curr;
        this.getTicker();
    }

    @action async getTicker() {
        let value:number = 1;

        if(this.curr !== "BTC"){
            const ticker = await GetTicker(this.curr);
            value = ticker;
        }

        runInAction(() => {
            this.value = value;
        });
    }
}

const exchange = new Exchange();

export default exchange;