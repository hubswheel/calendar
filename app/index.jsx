import { Router, Route, Link, hashHistory } from 'react-router'
import IMACalendar from './components/IMACalendar.jsx';
import IMAAdmin from './components/IMAAdmin.jsx';
import 'bootstrap/dist/css/bootstrap.css'

ReactDOM.render((
  <Router history={hashHistory}>
    <Route path="/" component={IMACalendar} />
    <Route path="/admin" component={IMAAdmin} />
  </Router>
), document.getElementById('app'));
