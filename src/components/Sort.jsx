import React,{ useState, useEffect } from 'react';
import { Input,Select } from 'antd';

const { Option } = Select;

const Sort = () => {
    const url = new URL(window.location.href);
    let sort_from_url =  url.searchParams.get('sort');
    if(!sort_from_url){
        sort_from_url = 'default';
    }
    const [ sortText, setSortText ] = useState(sort_from_url);
    const onChange = (e)=>{
        setSortText(e);
    }

    useEffect(() => {
        const url = new URL(window.location.href);
        url.searchParams.set('sort', sortText);
        window.history.pushState({ path: url.href }, '', url.href);
        
        if(sortText === 'default'){
            const url = new URL(window.location.href);
            url.searchParams.delete('sort');
            window.history.pushState({ path: url.href }, '', url.href);
        }

    },[sortText]);

    return (
        <div style={{textAlign:'right',margin:'10px'}}>
            <Input.Group compact className="">
                <span style={{marginTop:'5px'}}>Sort : </span>
                  <Select defaultValue={sortText} onChange={onChange}>
                    <Option value="default"> Default </Option>
                    <Option value="price_low_to_high">Price Low-to-High</Option>
                    <Option value="price_high_to_low">Price High-to-Low</Option>
                    <Option value="rating">Rating</Option>
                </Select>
            </Input.Group>
        </div>
    );
}

export default Sort;
