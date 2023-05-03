import '../css/EventModal.css'
import { useEffect, useState, useContext } from 'react';
import { LanguageContext } from '../App';

const EventModal = ({event,className,close}) => {
    const [currentClassname, setCurrentClassname] =useState(null);
    const language = useContext(LanguageContext); // el languaje context viene del app lo del langaugacontext

    useEffect (() => {
    setCurrentClassname(className);
},[className]);

const closeModal = (event) =>{
    event.stopPropagation(); // stop propagation 
    setCurrentClassname(null);
    close();
}

const name ={
    "eu" : event.nameEu,
    "es" : event.nameEs
};

const description ={
    "eu" : event.descriptionEu,
    "es" : event.descriptionEs
};
    
const municipality ={
    "eu" : event.municipalityEu,
    "es" : event.municipalityEs
};

const openingHours ={
    "eu" : event.openingHoursEu,
    "es" : event.openingHoursEs
};

const closeMessage ={
    "eu" : "Itxi",
    "es" : "Cerrar"
};



    return (
        <div>
            <section className={"modal-background " + currentClassname} onClick={(closeModal)}> </section>
            <article className={"modal " + currentClassname}>
                
                <h1>{name[language]}</h1>
                <section className="horizontal"> 
                    <article className="horizontal-container">
                        <p>{event.establishmentEs} - {municipality[language]}</p> {/* sustituimos por la variables de arriba */}
                        <p>{event.startDate.split("T")[0]}, {openingHours[language]}</p>
                        <p>{event.priceEs}</p>
                    </article> 
                    <article className="horizontal-container">
                        {event.images.length > 0 ?
                        <img className="image"src={event.images[0].imageUrl} alt={event.images[0].imageFileName}/>
                                        : <img className="noimage" src="./img/imgen default no image.jpeg" alt="imagen no disponible" />}
                    </article>
                </section>
                <div dangerouslySetInnerHTML={{__html: description[language]}}></div>
                <button onClick={closeModal}> {closeMessage[language]}</button>
            </article>
        </div>
    )
}

export default EventModal;