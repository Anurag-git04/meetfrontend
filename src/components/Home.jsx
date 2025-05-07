import { useState } from "react"
import useFetch from "../useFetch"
import Footer from "./Footer"
import Navbar from "./Navbar"
import { NavLink } from "react-router-dom"

const Home =()=>{
    const { data, loading, error } = useFetch(`https://meetbackend-swart.vercel.app/events`)
    const [selectedType, setSelectedType] = useState("All");

    const handleChange =(e)=>{
        const {value} = e.target
        setSelectedType(value)
    }
    const featuredata = selectedType == 'All' ? data : data.filter((d)=> d.eventType == selectedType)
    console.log(featuredata)
    console.log(data)
    return (
        <div>
            <Navbar/>
            <div className="container m-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2 className="fw-bold">Meetup Events</h2>

                    {/* <select className="form-select w-auto" value={selectedType} onChange={handleTypeChange}>
                        <option value="All">Select Event Type</option>
                        <option value="Online">Online</option>
                        <option value="Offline">Offline</option>
                    </select> */}
                    <select  className="form-select w-auto" value={selectedType} onChange={handleChange}>
                        <option value="All">Select Event Type</option>
                        <option value="Online">Online</option>
                        <option value="Offline">Offline</option>
                    </select>
                </div>
                <div className="row g-4">
                {  
                    featuredata?.map((event)=>(
                        <div className="col-md-4">
                            <div className="card border border-dark rounded">
                                <img src={`https://placehold.co/600x400?text=${event.eventName}`} class="card-img-top" alt="Event Image"/>
                                <div className="card-body">
                                    <p className="card-text">{event.eventDateStart}</p>
                                    <h5 className="card-title">{event.eventName} <span className="light">({event.eventType})</span></h5>
                                    <NavLink to={`/events/${event._id}`} className="btn btn-danger">view Details</NavLink>
                                </div>
                            </div>
                        </div>
                    ))
                }
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default Home