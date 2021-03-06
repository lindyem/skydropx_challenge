import {Fragment} from "react"
import ShowsList from "./components/ShowList/index.jsx";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";


function App() {
  return (
    <Fragment>
      <header>
        <h3 className="title">TV Show Database! </h3>
      </header>
      <main>
        <Router>
          <Switch>
            <Route path="/show/:id" children={<ShowsList />} />
            <Route path="/" children={<ShowsList />}/>
          </Switch>
        </Router>
      </main>
    </Fragment>
  );
}

export default App;
