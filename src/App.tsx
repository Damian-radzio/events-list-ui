import { Divider } from '@mui/material';
import { Footer } from 'components/Footer';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';

import { Navigation } from './components/Navigation';
import store from './store/index';
import { AddEventForm } from './views/AddEventForm';
import { EventDetails } from './views/EventDetails';
import { EventsList } from './views/EventsList';

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <Router>
        <div className="viewWrapper">
          <Navigation />
          <Divider />
          <div className="componentsWrapper">
            <Routes>
              <Route path="/" element={<Navigate to="/events" />} />
              <Route path="/events/*" element={<EventsList />} />
              <Route path="/events/:id" element={<EventDetails />} />
              <Route path="/add-event" element={<AddEventForm />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
