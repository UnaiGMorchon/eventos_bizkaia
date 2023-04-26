import { useState,useEffect } from "react";
import '../css/EventList.css';

const EventList = () => {
    const [events, setEvents] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect (() => {
        fetch(`https://api.euskadi.eus/culture/events/v1.0/events/upcoming?_elements=20&_page=${page}&provinceNoraCode=48&type=1
        `)
        .then( response => response.json())
        .then (data =>{
            setEvents(data.items);
            setTotalPages(data.totalPages);
        });
    },[page]);


const nextPage = () => {
    if(page < totalPages) {
        setPage(page +1);
    }
}
const previousPage = () => {
    if(page > 1) {
        setPage(page - 1);
    }

}


    return (
        <section className="event-list">
            <h2>Eventos</h2>
            <h3>página {page}/{totalPages}</h3>
            {page >1 && <button onClick={previousPage}>Anterior</button>}
            {page < totalPages && <button onClick={nextPage}>Siguiente</button>}
            <ul>
                {events.map( event =>( // montramos datos de id de name es dos idiomas en una lista 
                        <li key={event.id}>
                            <h3>{event.nameEs} / {event.nameEu}</h3>
                            <p>{event.municipalityEu}</p>
                            <p>{event.startDate.split("T")[0]}</p>
                            <p>{event.openingHoursES}</p>
                           {event.images.length > 0 ? <img src={event.images[0].imageUrl} alt={event.images[0].imageFileName}/> : null}
                        </li>
                ))}
            </ul>
        </section>
    )
}
export default EventList;