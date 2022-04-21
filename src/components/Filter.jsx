import React, { useState, useEffect } from 'react';
import { Checkbox, Button } from 'antd';

const fruitsOptions = [
    { label: 'Red Apple', value: 'apple' },
    { label: 'Nice Pear', value: 'pear' },
    { label: 'Good Orange', value: 'orange' },
    { label: 'Yellow Mango', value: 'mango' }
];

const animalsOptions = [
    { label: 'Black Dog', value: 'dog' },
    { label: 'Small Cat', value: 'cat' },
    { label: 'White Rabbit', value: 'rabbit' }
];


const Filter = () => {
    const [fruits, setFruits] = useState([]);
    const [animals, setAnimals] = useState([]);

    const addFilters = (arr, setElement) => {
        return arr.map((ele) => (
            <span key={ele} style={{ backgroundColor: 'blue', color: 'white', margin: '2px', padding: '1px', fontSize: '20px' }}>
                <span> {ele} </span> <button style={{ color: '#ffb69c', border: 'none', outline: 'none', backgroundColor: 'transparent' }} onClick={() => {
                    const removed = arr.filter((e) => e !== ele);
                    setElement(removed);
                }}> X </button>
            </span>

        ))
    }

    useEffect(() => {
        if (window.location.search) {
            const url = new URL(window.location.href);

            /* This block for fruits array */

            // this function get the value of 'fruits' params of url
            let extracted_fruits_string = url.searchParams.get('fruits');

            if (extracted_fruits_string) {
                //   this split() function converts the string contanated with + to an Array
                let extracted_fruits_array = extracted_fruits_string.split('+');

                // this block checks if url variable is present in existing options 
                const new_fruits_arr = extracted_fruits_array.filter(val => {
                    for (let i = 0; i < fruitsOptions.length; i++) {
                        if (fruitsOptions[i].value === val) {
                            return fruitsOptions[i].value === val;
                        }
                    }
                });

                // values of 'fruits' getted from url assigned to state
                setFruits(new_fruits_arr);
            }




            /* This block for fruits array */

            // this function get the value of 'fruits' params of url
            let extracted_animals_string = url.searchParams.get('animals');

            if (extracted_animals_string) {
                //   this split() function converts the string contanated with + to an Array
                let extracted_animals_array = extracted_animals_string.split('+');

                // this block checks if url variable is present in existing options 
                const new_animals_arr = extracted_animals_array.filter(val => {
                    for (let i = 0; i < animalsOptions.length; i++) {
                        if (animalsOptions[i].value === val) {
                            return animalsOptions[i].value === val;
                        }
                    }
                });

                // values of 'fruits' getted from url assigned to state
                setAnimals(new_animals_arr);
            }

        }

    }, []);



    // This useEffect invoke when fruits state updates
    useEffect(() => {

        //this block converts array of state into string 
        const fruits_ele = fruits.join('+');

        // this block checks if state is empty then remove '&fruits=' from url
        if (fruits.length === 0) {
            const url = new URL(window.location.href);
            url.searchParams.delete('fruits');
            window.history.pushState({ path: url.href }, '', url.href);
        } else {

            // if array of state is not empty then add/append the fruits state into url
            const url = new URL(window.location.href);
            url.searchParams.set('fruits', fruits_ele);
            window.history.pushState({ path: url.href }, '', url.href);
        }



    }, [fruits]);



    // This useEffect invoke when animals state updates
    useEffect(() => {
        //this block converts array of state into string 
        const animals_str = animals.join('+');

        // this block checks if state is empty then remove '&fruits=' from url
        if (animals.length === 0) {
            const url = new URL(window.location.href);
            url.searchParams.delete('animals');
            window.history.pushState({ path: url.href }, '', url.href);
        } else {

            // if array of state is not empty then add/append the animals state into url
            const url = new URL(window.location.href);
            url.searchParams.set('animals', animals_str);
            window.history.pushState({ path: url.href }, '', url.href);
        }

    }, [animals]);


    return (
        <div style={{ padding: '20px' }}>

            <header>
                <h1>Filters</h1>
            </header>

            { fruits.length || animals.length ? 
                <>
                    <div style={{ border: '1px solid black', padding: '10px' }}>
                        <h3> Filtered items  : </h3>
                        {addFilters(fruits, setFruits)}
                        {addFilters(animals, setAnimals)}

                        <br /> <Button type="primary" danger onClick={() => { setFruits([]); setAnimals([]) }} style={{ borderRadius: '44px' }}> clear </Button> 

                    </div> <br /> 
                </> : null
            }
            <div style={{ border: '1px solid black' }}>
                <h2> Fruits </h2>
                <Checkbox.Group
                    options={fruitsOptions}
                    //   defaultValue={fruits}
                    value={fruits}
                    onChange={(chechedValues) => setFruits(chechedValues)} />
            </div> <br />

            <div style={{ border: '1px solid black' }}>
                <h2> Animals </h2>
                <Checkbox.Group
                    options={animalsOptions}
                    //   defaultValue={fruits}
                    value={animals}
                    onChange={(chechedValues) => setAnimals(chechedValues)} />
            </div>

        </div>
    );
}

export default Filter;








