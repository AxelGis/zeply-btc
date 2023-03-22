export const getSubscription = (type:string) => {
    const session: string | null = sessionStorage.getItem(type);
    return session ? JSON.parse(session) : [];
}

export const setSubscription = (type:string, value: string, limit:number=0) => {
    let subscriptions: string[] = getSubscription(type);

    if(!subscriptions.includes(value)){
        if(limit !== 0){
            while(subscriptions.length > limit){
                subscriptions.unshift();
            }
        }
        subscriptions.push(value);
    } else if(limit === 0){
        subscriptions.splice(subscriptions.indexOf(value), 1);
    }
    sessionStorage.setItem(type, JSON.stringify(subscriptions));

    return subscriptions;
}