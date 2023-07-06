import React, { useState, useEffect, useCallback } from 'react';
import SeedMoneyApi from '../SeedMoneyApi';
import GrantList from './GrantList';

const Grants = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [grants, setGrants] = useState([]);

    const getGrants = useCallback(async() => {
        try {
            setIsLoading(true);
            let grantsPromise = SeedMoneyApi.getGrants();
            let grantsData = await grantsPromise;
            setGrants(grantsData);
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching grants:', error);
        }
    },[])

    useEffect(()=> {
        getGrants();
    }, [getGrants]);

    if (isLoading) {
        return <p> Loading &hellip; </p>;
    }

    return (
        <div className="Grants">
            <h1>Grants</h1>
            <GrantList grants={grants}/>
        </div>

    );
}


export default Grants;