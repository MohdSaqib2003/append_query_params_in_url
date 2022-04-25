import React, { useState, useEffect } from 'react';
import { Input, Button, Select } from 'antd';

const Range = () => {
    const url = new URL(window.location.href);            
    let range_from_url = JSON.parse(url.searchParams.get('range'));
    
    if(!range_from_url){
        range_from_url = ['', ''];

    }

    const [min, setMin] = useState(range_from_url[0]);
    const [max, setMax] = useState(range_from_url[1]);
    console.log(min);
    console.log(max);
    
    const onClick = ()=>{
        if(Number(min) !== 0 && Number(max) !== 0){
            const range = JSON.stringify([min, max]);
            console.log([min, max]);
            console.log(range);

            const url = new URL(window.location.href);            
            url.searchParams.set('range',range);
            window.history.pushState({ path: url.href }, '', url.href);
        } else{
            const url = new URL(window.location.href);            
            url.searchParams.delete('range');
            window.history.pushState({ path: url.href }, '', url.href);
        }
    }

    return (
        <div>
                <Input.Group compact>
                    <Input defaultValue={min} style={{ width: 70, margin: '5px' }} placeholder="Min" onChange={(e)=>setMin(e.target.value)}/>

                    <span style={{ marginTop: '10px' }}> to </span>

                    <Input defaultValue={max}
                        className="site-input-right"
                        style={{ width: 70, margin: '5px' }}
                        placeholder="Max"
                        onChange={(e)=>setMax(e.target.value)} />
                    <Button type="primary" shape="circle" style={{ margin: '5px' }} onClick={onClick}>
                        Go
                    </Button>
                </Input.Group>
            
        </div>
    );
}

export default Range;
