//import logo from './logo.svg';
import './App.css';
import EventTypeList from './components/EventTypeList';
import EventList from './components/EventList';
import { useState, createContext} from "react";

export const LanguageContext = createContext(); // se crea y se exporta 

function App() {

  const [eventType, setEventType] = useState(0);
  const [language, setLanguage] = useState("eu");
  
  return (
    <LanguageContext.Provider value={language}> {/* le pasamos el valor de language*/}
        <div className="App">
          <header>

            <section>
              <button className={language === "eu" ? "language selected" : "language" } onClick={() => setLanguage("eu")} > eu </button> {/* dos formas de hacerlo dos botones hacen lo mismo*/}
              
              <button className= {"language" + language === "es" ? "selected" : "" } onClick={() => setLanguage("es")} > es </button>  {/* dos formas de hacerlo dos botones hacen lo mismo*/}
            </section>
            
            <h1>Eventos en Bizkaia</h1>
          </header>
          <main>
            <EventTypeList handleClick={setEventType} selectedType={eventType}/>
            <EventList eventType={eventType}/>
          </main>
        </div>
    </LanguageContext.Provider>
  
  );
}

export default App;
