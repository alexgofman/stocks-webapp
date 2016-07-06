import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { bindActionCreators } from 'redux';
import d3 from 'd3'


const color=d3.scale.category10();

class BallotList extends Component {
  constructor(props){
    super(props);
  }
  
  handleDelete(id,index){
    this.props.deleteStock(id,index,this.props.stocks);
  }

  renderList() {
    const stocks=this.props.stocks;
    const t=this;
    if(!stocks){return <tr><td>Error Loading Data...</td></tr>}

    return stocks.map((stock,i,a)=>{
  
      return(
        <tr key={i}>
          <td><strong style={{color:color(i)}}>{stock.symbol}</strong></td>
          
          <td onClick={ t.handleDelete.bind(this,stock.id,i)} className='remove'><strong>Remove</strong></td>
        </tr>
      ) 
    })
  }

  render() {
    
    return (
     <table className="table">
      <tbody>
        {this.renderList()}
       </tbody> 
      </table>
   )
  }
}

function mapStateToProps({stocks}) {
  return {stocks};
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(BallotList);