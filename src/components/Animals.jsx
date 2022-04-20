import React, { useState, useEffect } from 'react';
import { Checkbox } from 'antd';

const animalOptions = [
    { label: 'Black Dog', value: 'dog' },
    { label: 'Small Cat', value: 'cat' },
    { label: 'White Rabbit', value: 'rabbit' }
];


const Animals = () => {
    const [animals, setAnimals] = useState([]);
    
    console.log(animals);


    useEffect(() => {
        if (window.location.search) {
            const url = new URL(window.location.href);

                // this function get the value of 'neighborhood' params of url
            let extracted_string = url.searchParams.get('animals');

            if (extracted_string) {
                //   this split() function converts the string contanated with + to an Array
                let extracted_array = extracted_string.split('+');

                // this block checks if url variable is present in existing options 
                const new_arr = extracted_array.filter(val => {
                    for (let i = 0; i < animalOptions.length; i++) {
                        if (animalOptions[i].value === val) {
                            return animalOptions[i].value === val;
                        }
                    }
                });

                // values of 'neighborhood' getted from url assigned to state
                setAnimals(new_arr);
            }
        }
    }, []);

    useEffect(() => {
        //this block converts array of state into string 
        const animals_string = animals.join('+');

        // this block checks if state is empty then remove '&neighborhood=' from url
        if (animals.length === 0) {
            const url = new URL(window.location.href);
            url.searchParams.delete('animals');
            window.history.pushState({ path: url.href }, '', url.href);
        } else {

            // if array of state is not empty then add/append the neighborhood state into url
            const url = new URL(window.location.href);
            url.searchParams.set('animals', animals_string);
            window.history.pushState({ path: url.href }, '', url.href);
        }

    }, [animals]);



    return (
        <div style={{border:'1px solid black'}}>
                <h1> Animals </h1>
            <Checkbox.Group
                options={animalOptions}
                //   defaultValue={neighborhood}
                value={animals}
                onChange={(chechedValues) => setAnimals(chechedValues)} />
        </div>
    );
}

export default Animals;
