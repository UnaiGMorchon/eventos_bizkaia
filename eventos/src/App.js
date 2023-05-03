//import logo from './logo.svg';
import './App.css';
import EventTypeList from './components/EventTypeList';
import EventList from './components/EventList';
import { useState, createContext, useRef} from "react";

export const LanguageContext = createContext(); // se crea y se exporta 

function App() {

  const [eventType, setEventType] = useState(0);
  const [language, setLanguage] = useState("eu");

const title ={
    "eu" : "Ekitaldiak Bizkaian",
    "es" : "Eventos en Bizkaia"
}
const refTo = useRef(null);
  
  return (
    <LanguageContext.Provider value={language}> {/* le pasamos el valor de language*/}
        <div className="App">
          <header ref={refTo}>

            <section>
              <button className={language === "eu" ? "language selected" : "language" } onClick={() => setLanguage("eu")} > eu </button> {/* dos formas de hacerlo dos botones hacen lo mismo*/}
              
              <button className= {"language" + language === "es" ? "selected" : "" } onClick={() => setLanguage("es")} > es </button>  {/* dos formas de hacerlo dos botones hacen lo mismo*/}
            </section>
            
            <h1>{title[language]}</h1>
          </header>
          <main>
            <EventTypeList handleClick={setEventType} selectedType={eventType}/>
            <EventList eventType={eventType} refTo={refTo}/>
          </main>
        </div>
    </LanguageContext.Provider>
  
  );
}

export default App;
