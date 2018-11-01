import React, { Component } from 'react';
import './App.css';
import { Table } from 'antd';

class App extends Component {
  
  state = {
    data: [],
    filteredInfo: null,
    sortedInfo: null,
  }

  

  componentDidMount() {
    this.getData();
  }
  
  getData = _ => {
    fetch('https://ece4970-221013.appspot.com/')
      .then(response => response.json())
      .then(response => this.setState({ data: response.data }))
      .catch(err => console.error(err))
  }

  handleChange = (pagination, filters, sorter) => {
    this.setState({
      sortedInfo: sorter,
    });
  }

  render() {
    let { sortedInfo, data } = this.state;
    sortedInfo = sortedInfo || {};

    const PowerOrder = ['ON', 'OFF']

    const columns = [{
      title: 'id',
      dataIndex: 'id',
      key: 'id',
      sorter: (a, b) => a.id - b.id,
      sortOrder: sortedInfo.columnKey === 'id' && sortedInfo.order,
    }, {
      title: 'RTU_id',
      dataIndex: 'RTU_id',
      key: 'RTU_id',
      sorter: (a, b) => a.RTU_id - b.RTU_id,
      sortOrder: sortedInfo.columnKey === 'RTU_id' && sortedInfo.order,
    }, {
      title: 'Event_Type',
      dataIndex: 'Event_Type',
      key: 'Event_Type',
    }, {
      title: 'Power',
      dataIndex: 'Power',
      key: 'Power',
      sorter: (a, b) => PowerOrder.indexOf(a.Power) - PowerOrder.indexOf(b.Power),
      sortOrder: sortedInfo.columnKey === 'Power' && sortedInfo.order,
    }, {
      title: 'Event_Date',
      dataIndex: 'Event_Date',
      key: 'Event_Date',
      sorter: (a, b) => {
        const aDate = new Date(a.Event_Date);
        const bDate = new Date(b.Event_Date);
    return aDate>bDate ? -1 : aDate<bDate ? 1 : 0;
      },
      sortOrder: sortedInfo.columnKey === 'Event_Date' && sortedInfo.order,
    }, {
      title: 'ADC_Value',
      dataIndex: 'ADC_Value',
      key: 'ADC_Value',
    }];
    return (
      <div>
        <Table columns={columns} dataSource={data} onChange={this.handleChange} />
      </div>
    );
  }
}

export default App;
