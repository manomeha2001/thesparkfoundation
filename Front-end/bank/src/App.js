import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import CustDetails from './components/custdetails';
import Customers from './components/customers';
import Home from './components/home';
import Transactions from './components/transactions';

function App() {
  return (
    <div>
      <Router>
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route exact path="/customers">
                <Customers />
              </Route>
              <Route exact path="/customers/:accno">
                <CustDetails />
              </Route>
              <Route exact path="/transactions">
                <Transactions />
              </Route>
            </Switch>
      </Router>
    </div>
     
  );
}

export default App;
