import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { EventsList } from './views/EventsList';
import { EventDetails } from './views/EventDetails';
import { AddEventForm } from './views/AddEventForm';
import store from './store/index';
import { Navigation } from './components/Navigation';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="viewWrapper">
          <div className="navbarWrapper">
            <Navigation />
          </div>
          <div className="componentsWrapper">
            <Routes>
              <Route path="/events" element={<EventsList />} />
              <Route path="/events/:id" element={<EventDetails />} />
              <Route path="/add-event" element={<AddEventForm />} />
            </Routes>
          </div>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
