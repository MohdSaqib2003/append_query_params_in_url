import React, { useState, useEffect } from 'react';
import { Checkbox, Button } from 'antd';
import Animals from './Animals';

const neighborhoodOptions = [
    { label: 'Red Apple', value: 'apple' },
    { label: 'Nice Pear', value: 'pear' },
    { label: 'Good Orange', value: 'orange' },
    { label: 'Yellow Mango', value: 'mango' }
];


const Filter = () => {
    const [neighborhood, setNeighborhood] = useState([]);

    const addFilters = (arr) => {
        return arr.map((ele) => (
            <span key={ele} style={{ backgroundColor: 'blue', color: 'white', margin: '2px', padding: '1px', fontSize: '20px' }}>
                <span> {ele} </span> <button style={{ color: 'white', border: 'none', outline: 'none', backgroundColor: 'transparent' }} onClick={() => {
                    const removed = arr.filter((e) => e !== ele);
                    setNeighborhood(removed);
                }}> X </button>
            </span>

        ))
    }

    useEffect(() => {
        if (window.location.search) {
            const url = new URL(window.location.href);

                // this function get the value of 'neighborhood' params of url
            let extracted_string = url.searchParams.get('neighborhood');

            if (extracted_string) {
                //   this split() function converts the string contanated with + to an Array
                let extracted_array = extracted_string.split('+');

                // this block checks if url variable is present in existing options 
                const new_arr = extracted_array.filter(val => {
                    for (let i = 0; i < neighborhoodOptions.length; i++) {
                        if (neighborhoodOptions[i].value === val) {
                            return neighborhoodOptions[i].value === val;
                        }
                    }
                });

                // values of 'neighborhood' getted from url assigned to state
                setNeighborhood(new_arr);
            }
        }
    }, []);

    useEffect(() => {

        //this block converts array of state into string 
        const neighborhood_ele = neighborhood.join('+');

        // this block checks if state is empty then remove '&neighborhood=' from url
        if (neighborhood.length === 0) {
            const url = new URL(window.location.href);
            url.searchParams.delete('neighborhood');
            window.history.pushState({ path: url.href }, '', url.href);
        } else {

            // if array of state is not empty then add/append the neighborhood state into url
            const url = new URL(window.location.href);
            url.searchParams.set('neighborhood', neighborhood_ele);
            window.history.pushState({ path: url.href }, '', url.href);
        }

    }, [neighborhood]);


    return (
            <div style={{padding:'20px'}}>
            
            <header>
                <h1>Filters</h1>
            </header>

            <div style={{ border: '1px solid black', padding: '10px' }}>
                Filtered Show : <br /> <br />
                {addFilters(neighborhood)}

                { neighborhood.length ? <> <br /> <Button type="primary" danger onClick={() => { setNeighborhood([]) }} style={{borderRadius:'44px'}}> clear </Button> </> : null 
                }
       
            </div> <br />
            <div style={{border:'1px solid black'}}>
                <h1> Neighborhood </h1>
            <Checkbox.Group
                options={neighborhoodOptions}
                //   defaultValue={neighborhood}
                value={neighborhood}
                onChange={(chechedValues) => setNeighborhood(chechedValues)} />
            </div> <br />

            <Animals />
            
        </div>
    );
}

export default Filter;
















// import React, { useState, useEffect } from 'react';
// import { Checkbox } from 'antd';

// const animalOptions = [
//     { label: 'Black Dog', value: 'dog' },
//     { label: 'Small Cat', value: 'cat' },
//     { label: 'White Rabbit', value: 'rabbit' }
// ];


// const Animals = () => {
//     const [animals, setAnimals] = useState([]);
    
//     console.log(animals);


//     useEffect(() => {
//         if (window.location.search) {
//             const url = new URL(window.location.href);

//                 // this function get the value of 'neighborhood' params of url
//             let extracted_string = url.searchParams.get('animals');

//             if (extracted_string) {
//                 //   this split() function converts the string contanated with + to an Array
//                 let extracted_array = extracted_string.split('+');

//                 // this block checks if url variable is present in existing options 
//                 const new_arr = extracted_array.filter(val => {
//                     for (let i = 0; i < animalOptions.length; i++) {
//                         if (animalOptions[i].value === val) {
//                             return animalOptions[i].value === val;
//                         }
//                     }
//                 });

//                 // values of 'neighborhood' getted from url assigned to state
//                 setAnimals(new_arr);
//             }
//         }
//     }, []);

//     useEffect(() => {
//         //this block converts array of state into string 
//         const animals_string = animals.join('+');

//         // this block checks if state is empty then remove '&neighborhood=' from url
//         if (animals.length === 0) {
//             const url = new URL(window.location.href);
//             url.searchParams.delete('animals');
//             window.history.pushState({ path: url.href }, '', url.href);
//         } else {

//             // if array of state is not empty then add/append the neighborhood state into url
//             const url = new URL(window.location.href);
//             url.searchParams.set('animals', animals_string);
//             window.history.pushState({ path: url.href }, '', url.href);
//         }

//     }, [animals]);



//     return (
//         <div style={{border:'1px solid black'}}>
//                 <h1> Animals </h1>
//             <Checkbox.Group
//                 options={animalOptions}
//                 //   defaultValue={neighborhood}
//                 value={animals}
//                 onChange={(chechedValues) => setAnimals(chechedValues)} />
//         </div>
//     );
// }

// export default Animals;
