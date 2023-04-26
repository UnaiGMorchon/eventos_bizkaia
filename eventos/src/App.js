import logo from './logo.svg';
import './App.css';
import EventTypeList from './components/EventTypeList';
import EventList from './components/EventList';

function App() {
  return (
    <div className="App">
      <header>
        <h1>Eventos en Bizkaia</h1>
      </header>
    <main>
      <EventTypeList/>
      <EventList/>
    </main>
    </div>
  );
}

export default App;
