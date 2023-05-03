import {useState, useEffect, useContext} from "react";
import { LanguageContext } from "../App";



const EventTypeList = ({handleClick, selectedType}) =>{
    const[eventTypes, setEventTypes] = useState([]); // el array vacio es el valor por defecto del eventTypes
    const language =useContext(LanguageContext);


        useEffect( () => { // esta funcion se llama cuando hay un cambio del estado  y solo se ejecuta una vez al principio
            fetch ("https://api.euskadi.eus/culture/events/v1.0/eventType") // lalama d todos los tipos de eventos
            .then (reponse => reponse.json())
            .then (data => {
                setEventTypes(data); // aqui gabramos los datos que vienen del fetch.
            })
        },[]); // tiene q ser un array vacio para que no falle. El array al estar vacio solo se ejecuta una vez.


const allName ={
    "eu" : "Guztiak",
    "es" : "Todos"
};


        return (
            <div>
                <h4>Tipos de eventos</h4>
                <ul className="eventbutton">
                        <li className={selectedType=== 0 ? "selected btn" : "btn"} onClick={()=> handleClick(0)}>{allName[language]}</li>
                    {eventTypes.map (eventType => {    // montramos datos de id de name es dos idiomas en una lista 
                        const name ={
                            "eu" : eventType.nameEu,
                            "es" : eventType.nameEs
                        };
                    
                        return <li className={selectedType=== eventType.id ? "selected btn" : "btn"} key={eventType.id} onClick={()=> handleClick(eventType.id)}>
                            <img className="icons" src={`/img/${eventType.nameEs.toLowerCase()}.png`} alt={name[language]} />
                            {name[language]} {/* / {eventType.nameEu}  creamos un elememto de lista*/}
                        </li>
                    })}
                </ul>
            </div>
        )
}

export default EventTypeList;