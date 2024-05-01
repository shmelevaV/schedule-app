import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import UserStore from './store/UserStore';
import ScheduleViewStore from './store/ScheduleViewStore';
import DayOfWeekStore from './store/DayOfWeekStore';
import NumberOfWeekStore from './store/NumberOfWeekStore';
import NumberOfAudStore from './store/NumburOfAudStore';
import StartDateStore from './store/StartDateStore';

export const Context = createContext(null)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Context.Provider value={{
    user: new UserStore(),
    view: new ScheduleViewStore(),
    day: new DayOfWeekStore(),
    week: new NumberOfWeekStore(),
    aud: new NumberOfAudStore(),
    startDate: new StartDateStore(),
  }}>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </Context.Provider>
);

