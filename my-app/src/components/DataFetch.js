import React, { useState, useEffect } from 'react';
import axios from 'axios';

function DataFetch() {
    const [world, setWorld] = useState([]);
    const [search, setSearch] = useState('');
    const [fiteredCountries, setFiteredCountries] = useState([]);

    useEffect(() => {
        axios.get('https://restcountries.eu/rest/v2/all')
            .then(res => {
                console.log(res);
                setWorld(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }, []);


    useEffect(() => {
        setFiteredCountries(
            world.filter(country => {
                return country.name.toLowerCase().includes(search.toLowerCase())
            })
        )
    }, [search, world])
    return (
        <div className="container">
            <input type="text"
                placeholder="search"
                onChange={e => setSearch(e.target.value)}
            />
            {search}
            <ul>
                {fiteredCountries.map(country => (
                    <li key={country.alpha2Code}>
                        {country.name}
                    </li>
                )
                )}
            </ul>
        </div>
    )
}

export default DataFetch;