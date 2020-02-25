import React from 'react';
import Header from './Header';
import TicketList from './TicketList';
import NewTicketControl from './NewTicketControl';
import Error404 from './Error404';
import { Switch, Route, withRouter } from 'react-router-dom';
import Moment from 'moment';
import Admin from './Admin';
import { v4 } from 'uuid';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedTicket: null
    };
    this.handleChangingSelectedTicket = this.handleChangingSelectedTicket.bind(this);
  }

  componentDidMount() {
    this.waitTimeUpdateTimer = setInterval(() =>
    this.updateTicketElapsedWaitTime(),
    60000
  );
}

componentWillUnmount(){
  clearInterval(this.waitTimeUpdateTimer);
}

updateTicketElapsedWaitTime() {
  // Might be this.state.masterTicketList ------------vvvvvvvvvvvv
  // var newMasterTicketList = Object.assign({}, this.props.masterTicketList);
  // Object.keys(newMasterTicketList).forEach(ticketId => {
  //   newMasterTicketList[ticketId].formattedWaitTime = (newMasterTicketList[ticketId].timeOpen).fromNow(true);
  // });
  // this.setState({masterTicketList: newMasterTicketList});
}

handleChangingSelectedTicket(ticketId){
  this.setState({selectedTicket: ticketId});
}

render(){
  return (
    <div>
    <Header/>
      <Switch>
        <Route exact path='/' render={()=><TicketList ticketList={this.props.masterTicketList} />} />
        <Route path='/newticket' render={()=><NewTicketControl />} />
        <Route path='/admin' render={(props)=><Admin ticketList={this.props.masterTicketList} currentRouterPath={props.location.pathname}
        onTicketSelection={this.handleChangingSelectedTicket}
        selectedTicket={this.state.selectedTicket}/>} />
        <Route component={Error404} />
      </Switch>
      </div>
    );
  }
}

App.propTypes = {
  masterTicketList: PropTypes.object
}

const mapStateToProps = state => {
  return  {
    masterTicketList: state
  }
}

export default withRouter(connect(mapStateToProps)(App));
