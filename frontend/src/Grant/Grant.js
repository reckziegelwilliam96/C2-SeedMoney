import React, { useState, useEffect, useCallback } from 'react';
import SeedMoneyApi from '../SeedMoneyApi';
import GrantList from './GrantList';

const Grants = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [grants, setGrants] = useState([]);

    const getGrants = useCallback(async() => {
        setIsLoading(true);
        let grantsPromise = SeedMoneyApi.getGrants();
        let grantsData = await grantsPromise;
        setGrants(grantsData);
        setIsLoading(false);
    },[])

    useEffect(()=> {
        getGrants();
    }, [getGrants]);

    if (isLoading) {
        return <p> Loading &hellip; </p>;
    }

    return (
        <div className="Grants">
            <GrantList grants={grants}/>
        </div>

    );
}


export default Grants;