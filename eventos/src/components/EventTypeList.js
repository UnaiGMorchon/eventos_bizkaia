import {useState, useEffect} from "react";


const EventTypeList = () =>{
    const[eventTypes, setEventTypes] = useState([]); // el array vacio es el valor por defecto del eventTypes

        useEffect( () => { // esta funcion se llama cuando hay un cambio del estado  y solo se ejecuta una vez al principio
            fetch ("https://api.euskadi.eus/culture/events/v1.0/eventType") // lalama d todos los tipos de eventos
            .then (reponse => reponse.json())
            .then (data => {
                setEventTypes(data); // aqui gabramos los datos que vienen del fetch.
            })
        },[]); // tiene q ser un array vacio para que no falle. El array al estar vacio solo se ejecuta una vez.

        return (
            <div>
                <h2>Tipos de eventos</h2>
                <ul>
                    {eventTypes.map (eventType => ( // montramos datos de id de name es dos idiomas en una lista 
                        <li key={eventType.id}>
                            <img class="icons" src={`/img/${eventType.nameEs.toLowerCase()}.png`} alt={eventType.nameEs} />
                            {eventType.nameEs} / {eventType.nameEu} {/* creamos un elememto de lista*/}
                        </li>
                    ))}
                </ul>
            </div>
        )
}

export default EventTypeList;