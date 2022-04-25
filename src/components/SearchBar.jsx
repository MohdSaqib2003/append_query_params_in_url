import React, { useState, useEffect } from 'react';
import { Input } from 'antd';

const { Search } = Input;

const SearchBar = () => {
    const url = new URL(window.location.href);
    let search_value_from_url = url.searchParams.get('search');
    if (!search_value_from_url) {
        search_value_from_url = '';
    }
    const [searchText, setSearchText] = useState(search_value_from_url);

    const onSearch = (e) => {
        console.log(e);
        setSearchText(e);
        //    console.log(e.target.value);
        //    setSearchText(e.target.value);
    }

    console.log('Outside: ', searchText);

    useEffect(() => {

        console.log('useEffect : ', searchText);

        if (searchText) {
            // const url = new URL(window.location.href);
            // above line is commented bcz it has declared globally
            url.searchParams.set('search', searchText);
            window.history.pushState({ path: url.href }, '', url.href);
            console.log('Inside if : ', searchText)
        } else {
            // const url = new URL(window.location.href);
            // above line is commented bcz it has declared globally            
            url.searchParams.delete('search');
            window.history.pushState({ path: url.href }, '', url.href);
        }

    }, [searchText]);

    // const remove = () => {
    //     const url = new URL(window.location.href);
    //     url.searchParams.delete('search');
    //     window.history.pushState({ path: url.href }, '', url.href);
    // }

    return (
        <div className='border m-4 p-4' style={{ margin: '10px' }}>
            {/* <button onClick={remove}> Clear </button> */}
            <Search allowClear placeholder="input search text" defaultValue={searchText} enterButton onSearch={onSearch} onEmptied={(e) => { console.log(e) }} />

        </div>
    );
}

export default SearchBar;
