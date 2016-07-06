import React, {Component} from 'react';
import * as actions from '../actions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import StockLabel from './stock_label';
import Chart from './chart';
import _ from 'lodash';
require('../style/style.scss');

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { term: ''};
    this.onInputChange = this.onInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }
  
  onInputChange(e) {
    this.setState({term:e.target.value});
  }
  
  componentWillMount() {
    this.props.fetchStocks();
  }
  
  onFormSubmit(e) {
    e.preventDefault();
    const term = _.toUpper(this.state.term);
    if(_.some(this.props.stocks, {symbol:term})) {
      return alert('Duplicate Search. Duplicate Search');
    }
    
    this.props.addStock(term, this.props.stocks);
    this.setState({term:''});
  }
  
  render() {
    return (
      <div>
        <nav className='nav'>
          <form className='input-group' onSubmit={this.onFormSubmit}>
            <input
              placeholder="Search stocks by symbol here..."
              className="form-control"
              value={this.state.term}
              onChange={this.onInputChange} />
            <span className="input-group-btn">
              <input type="submit" className="btn btn-secondary"/>
            </span>
          </form>
        </nav>
        <div className='container'>
          <Chart/>
          <StockLabel/>
        </div>
      </div>
    );
  }
}

function mapStateToProps({stocks}) {
  return {stocks};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);