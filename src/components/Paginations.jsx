import React, { useState, useEffect } from 'react';
import { Pagination } from 'antd';
import { fetchData } from '../redux/actions';
import { connect } from 'react-redux';
import Card from './Card';


const Paginations = (props) => {
    

    const url = new URL(window.location.href);
    // this function gets the value of 'page' query 
    let pgNo = url.searchParams.get('page');
    if(!pgNo){
        pgNo = 1;   // if pgNo == NULL , then initialize with 1
    }
    const [pageNum, setPageNum] = useState(pgNo);       // Initialize the state with the value of URL

    const onChange = (e) => {        
        setPageNum(e);
    }

    useEffect(() => {        

        url.searchParams.set('page', pageNum);
        
        // console.log(pgNo);        
        window.history.pushState({ path: url.href }, '', url.href);
        
        props.fetchData(pageNum);
        
    }, []);

    useEffect(() => {
        // console.log(pageNum);

        if (pageNum !== 0) {
            const url = new URL(window.location.href);
            url.searchParams.set('page', pageNum);
            window.history.pushState({ path: url.href }, '', url.href);
        }
        props.fetchData(pageNum);


    }, [pageNum]);

    return (
        <>
            <div style={{ display: 'flex', flexFlow: 'column wrap', flexDirection: 'row', justifyContent: 'space-between' }}>
                {props.collection.map((data) => (
                    <Card key={data._id} data={data} />
                ))}
            </div> <br /> <br />
            <div style={{ textAlign: 'center' }}>
                
                {/* <Pagination defaultCurrent={pageNum} total={50} onChange={onChange} /> */}

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
