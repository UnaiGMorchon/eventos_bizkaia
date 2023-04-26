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
            <h5>página {page}/{totalPages}</h5>
            {page >1 && <button onClick={previousPage}>Anterior</button>}
            {page < totalPages && <button onClick={nextPage}>Siguiente</button>}
            <ul>
                {events.map( event =>( // montramos datos de id de name es dos idiomas en una lista 
                        <li class="imagecard" key={event.id}>
                            {event.images.length > 0 ?
                            <img class="shadow" src={event.images[0].imageUrl} alt={event.images[0].imageFileName}/>
                            : <img class="noimage" src="./img/imgen default no image.jpeg" alt="imagen no disponible" />}
                            <h3>{event.nameEs} {/* / {event.nameEu} */}</h3>
                            <p class="place" >{event.establishmentEs} - {event.municipalityEu}</p>
                            <p>{event.startDate.split("T")[0]}, {event.openingHoursEs}</p>
                            <p>{event.priceEs}</p>
                        </li>
                ))}
            </ul>
        </section>
    )
}
export default EventList;