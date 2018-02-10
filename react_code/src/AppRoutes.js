import React, { Component } from 'react';
import {Row, Col} from 'react-flexbox-grid';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Board from './components/Board';
import List from './components/List';
import Task from './components/Task';

/* import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
 */

class AppRoutes extends Component {

render() {
  return (
    <MuiThemeProvider>
    <Router>
    <Row around='xs'>
      <Col xs={12} md={11}>
        <Route exact path="/" component={Board} />
        <Route exact path="/list" component={List} />
        <Route exact path="/task" component={Task} />
      </Col>
    </Row>
  </Router>
  </MuiThemeProvider>
  )
}
}
export default AppRoutes