import { useState,useEffect,useRef } from "react";
import '../css/EventList.css';
import EventModal from "./EventModal";



const EventList = ({eventType}) => {
    const [events, setEvents] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [searchWord, setSearchWord] = useState("");
    const titleRef = useRef(null);

    useEffect (() => {
        setEvents([]);
        setPage(1);
    },[eventType]);


    useEffect (() => {
       /*  const search = searchWord.length < 3? "" :`&description=${searchWord}`;
        const type =eventType !== 0 ? `&type=${eventType}` : "";
        fetch(`https://api.euskadi.eus/culture/events/v1.0/events/upcoming?_elements=20&_page=${page}&provinceNoraCode=48${type}${search}`)
        .then( response => response.json()) */
        getData() // sustituimos lo verde por getdata
        .then (data =>{
            setEvents([...events,...data.items]); // los ""..."" es para q salgan los arrays seguidos sino los sustituirias
            setTotalPages(data.totalPages);
        });
    },[page]);


    useEffect (() => {
        /*  const search = searchWord.length < 3? "" :`&description=${searchWord}`;
        const type =eventType !== 0 ? `&type=${eventType}` : "";
        fetch(`https://api.euskadi.eus/culture/events/v1.0/events/upcoming?_elements=20&_page=${page}&provinceNoraCode=48${type}${search}`)
        .then( response => response.json()) */
        getData() // sustituimos lo verde por getdata
        .then (data =>{
            setEvents(data.items); 
            setTotalPages(data.totalPages);
        });
    },[eventType]);

    useEffect (() => {
        if(searchWord.length < 3 && searchWord !== "") {
            return;
        }
        getData()
        .then (data =>{
            setEvents(data.items); 
            setTotalPages(data.totalPages);
        });
    },[searchWord]);


const getData = ()=>{
    const type = eventType !== 0 ? `&type=${eventType}` : "";
    const search = searchWord.length < 3 && searchWord.length > 0 ? "" :`&description=${searchWord}`;
    return new Promise ( (resolve,reject)=> {
        fetch(`https://api.euskadi.eus/culture/events/v1.0/events/upcoming?_elements=20&_page=${page}&provinceNoraCode=48${type}${search}`)
        .then( response => response.json())
        .then(data =>{
            resolve(data);
        })
        .catch( error =>{
            reject(error);
        });
    });
}


const nextPage = () => {
    if(page < totalPages) {
        setPage(page +1);
    }
}


/* const previousPage = () => {
    if(page > 1) {
        setPage(page - 1);
    }

} */


const goToTop = () =>{
    titleRef.current.scrollIntoView({behavior: 'smooth'});
    console.log(titleRef.current.textContent);
}



    return (
        <section className="event-list">
            <h2 ref={titleRef}>Eventos</h2>
                <input type="text" value={searchWord} onChange={(e)=>setSearchWord(e.target.value)}/>
            <h3>página {page}/{totalPages}</h3>

            {/*  {page >1 && <button onClick={previousPage}>Anterior</button>}
            {page < totalPages && <button onClick={nextPage}>Siguiente</button>} */}
        
            <ul>
                {events.map( event =>( // montramos datos de id de name es dos idiomas en una lista 
                        <li className="imagecard" key={event.id} onClick={()=>setSelectedEvent(event.id)}>
                            {event.images.length > 0 ?
                            <img className="shadow" src={event.images[0].imageUrl} alt={event.images[0].imageFileName}/>
                            : <img className="noimage" src="./img/imgen default no image.jpeg" alt="imagen no disponible" />}
                            <h3>{event.nameEs} {/* / {event.nameEu} */}</h3>
                            <p className="place" >{event.establishmentEs} - {event.municipalityEu}</p>
                            <p>{event.startDate.split("T")[0]}, {event.openingHoursEs}</p>
                            <p>{event.priceEs}</p>
                            <EventModal event={event} className={selectedEvent === event.id ? "show" : ""} close={()=>setSelectedEvent(null)}/>
                        </li>
                ))}
            </ul>
            {page < totalPages &&<button onClick={nextPage}>Mostrar más</button>} 
            <button onClick={goToTop}>Ir arriba</button>
        </section>
    )
}
export default EventList;

 
