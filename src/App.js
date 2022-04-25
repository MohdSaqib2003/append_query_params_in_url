import React from 'react';
import { Row, Col } from 'antd';
import Filter from './components/Filter';
import Paginations from './components/Paginations';
import SearchBar from './components/SearchBar';
import Sort from './components/Sort';
import Range from './components/Range';
import 'antd/dist/antd.css';

const App = () => {

  return (
    <div>
      <div style={{ padding: '20px', textAlign: 'center', backgroundColor: '#97b9f0' }}>
        <h1> Header </h1>
      </div> <br />
      <div style={{padding:'20px'}}>
        <SearchBar /> 
        <Sort />
        <Range />
        <Row>
          <Col span={18} push={6} style={{ border: "1px solid black" }}>
            <Paginations />
          </Col>
          <Col span={6} pull={18} style={{ border: "1px solid black" }}>
            <Filter />
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default App;
