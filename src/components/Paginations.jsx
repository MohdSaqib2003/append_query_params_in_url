import React, { useState, useEffect } from 'react';
import { Pagination } from 'antd';
import { fetchData } from '../redux/actions';
import { connect } from 'react-redux';
import Card from './Card';


const Paginations = (props) => {
    const [pageNum, setPageNum] = useState(1);

    const onChange = (e) => {        
        setPageNum(e);
    }

    useEffect(() => {
        
        const url = new URL(window.location.href);
        // this function gets the value of 'page' query 
        const pgNo = url.searchParams.get('page');
        
        // if value of 'pgNo' null then set 1 to 'pageNum' state
        if (!pgNo) {
            setPageNum(1);
        } else {
            setPageNum(pgNo);       // else set the value from url
        }
        url.searchParams.set('page', pageNum);
        
        console.log(pgNo);        
        window.history.pushState({ path: url.href }, '', url.href);
        
        props.fetchData(pageNum);
        
    }, []);

    useEffect(() => {
        console.log(pageNum);

        if (pageNum !== 0) {
            const url = new URL(window.location.href);
            url.searchParams.set('page', pageNum);
            window.history.pushState({ path: url.href }, '', url.href);
        }
        props.fetchData(pageNum)
    }, [pageNum]);
    return (
        <>
            <div style={{ display: 'flex', flexFlow: 'column wrap', flexDirection: 'row', justifyContent: 'space-between' }}>
                {props.collection.map((data) => (
                    <Card key={data._id} data={data} />
                ))}
            </div> <br /> <br />
            <div style={{ textAlign: 'center' }}>
                <Pagination defaultCurrent={pageNum} total={50} onChange={onChange} />
            </div> <br /> <br />
        </>
    );
}

const mapStateToProps = (state)=>{
    return {
        collection: state.collection_data
    }
}

export default connect(mapStateToProps, { fetchData })(Paginations);
