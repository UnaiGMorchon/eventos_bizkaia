//import logo from './logo.svg';
import './App.css';
import EventTypeList from './components/EventTypeList';
import EventList from './components/EventList';
import { useState } from "react";


function App() {
  const [eventType, setEventType] = useState(0);
  return (
    <div className="App">
      <header>
        <h1>Eventos en Bizkaia</h1>
      </header>
    <main>
      <EventTypeList handleClick={setEventType} selectedType={eventType}/>
      <EventList eventType={eventType}/>
    </main>
    </div>
  );
}

export default App;
