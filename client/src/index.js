import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import UserStore from './store/UserStore';
import ScheduleViewStore from './store/ScheduleViewStore';
import DayOfWeekStore from './store/DayOfWeekStore';

export const Context = createContext(null)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Context.Provider value={{
    user: new UserStore(),
    view: new ScheduleViewStore(),
    day: new DayOfWeekStore()
  }}>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </Context.Provider>
);

