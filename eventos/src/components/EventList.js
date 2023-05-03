import { useState,useEffect, useRef, useContext } from "react";
import '../css/EventList.css';
import EventModal from "./EventModal";
import { LanguageContext } from "../App";



const EventList = ({eventType,refTo}) => {
    const [events, setEvents] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [searchWord, setSearchWord] = useState("");
    const language =useContext(LanguageContext);


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
    },[page]); // de que depende el array y es cuando cambia cuando es page.


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
    refTo.current.scrollIntoView({behavior: 'smooth'});
    console.log(refTo.current.textContent);
}


const showMore ={
    "eu" : "Gehiago ikusi",
    "es" : "Ver más"

}


const goUp ={
    "eu" : "gora joan",
    "es" : "ir arriba"

}

const eventTitle ={
    "eu" : "Ekitaldiak",
    "es" : "eventos"

}



    return (
        <section className="event-list">
            <h2 ref={refTo}>{eventTitle[language]}</h2>
                <input type="text" value={searchWord} onChange={(e)=>setSearchWord(e.target.value)}/>
            <h3>página {page}/{totalPages}</h3>

            {/*  {page >1 && <button onClick={previousPage}>Anterior</button>}
            {page < totalPages && <button onClick={nextPage}>Siguiente</button>} */}
        
            <ul>
                {events.map( event =>{      // montramos datos de id de name es dos idiomas en una lista 
                           const translation ={
                                name:{
                                    eu: event.nameEu,
                                    es: event.nameEs
                                },
                                description: {
                                    eu: event.descriptionEu,
                                    es: event.descriptionEs
                                },
                                    
                                municipality:{
                                    eu : event.municipalityEu,
                                    es : event.municipalityEs
                                },
                                
                                openingHours : {
                                    eu : event.openingHoursEu,
                                    es : event.openingHoursEs
                                },
                                price: {
                                    eu: event.priceEu,
                                    es: event.priceEs
                                },

                                establishment:{
                                    eu: event.establishmentEu,
                                    es: event.establishmentEs

                                }
                           };
                    
                       return <li className="imagecard" key={event.id} onClick={()=>setSelectedEvent(event.id)}>
                            {event.images.length > 0 ?
                            <img className="shadow" src={event.images[0].imageUrl} alt={event.images[0].imageFileName}/>
                            : <img className="noimage" src="./img/imgen default no image.jpeg" alt="imagen no disponible" />}
                            <h3>{translation.name[language]}</h3>
                            <p className="place" >{translation.establishment[language]} - {translation.municipality[language]}</p>
                            <p>{event.startDate.split("T")[0]}, {translation.openingHours[language]}</p>
                            <p>{translation.price[language]}</p>
                            <EventModal event={event} className={selectedEvent === event.id ? "show" : ""} close={()=>setSelectedEvent(null)}/>
                        </li>
                })}
            </ul>
            {page < totalPages &&<button onClick={nextPage}>{showMore[language]}</button>} 
            <button onClick={goToTop}>{goUp[language]}</button>
        </section>
    )
}
export default EventList;

 
