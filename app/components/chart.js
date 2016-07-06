import React, { Component } from 'react';
import { LineChart } from 'react-d3';
import { connect } from 'react-redux';
import d3 from 'd3';

class Chart extends Component {
  render() {
    if (!this.props.stocks || !this.props.stocks.length || !this.props.stocks[0].data) {
      return <div><h4>Nothing to see here</h4></div>
    }
    const colors = d3.scale.category10();
    const stocks = this.props.stocks;
    const lineData = stocks.map((v) => {
      return {
        name: v.symbol,
        values: v.data.map((d) => {
          return {
            y: d['Adj Close'],
            x: d.Date
          }
        }),
        strokeWidth: 4
      }
    })
    
    return ( <div>
      <LineChart
        legend={true}
        data={lineData}
        width={1000}
        height={400}
        colors={colors}
        viewBoxObject={{x:0,y:0,width:800,height:400}}
        xAccessor={(d) => { return new Date(d.x)}}
        yAccessor={(d) => { return Number(d.y)}}
        xAxisTickInterval={{unit: 'days', interval: 4}}
        gridHorizontal={true}/>
      </div>
    )
  }
}

function mapStateToProps({stocks}) {
  console.log(stocks);
  return {stocks}
}

export default connect(mapStateToProps)(Chart);