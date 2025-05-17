import { useEffect, useState } from "react"
import useFetch from "../useFetch"
import Footer from "./Footer"
import Navbar from "./Navbar"
import { NavLink } from "react-router-dom"

const Home =()=>{
    const { data, loading, error } = useFetch(`https://meetbackend-swart.vercel.app/events`)
    const [selectedType, setSelectedType] = useState("All");
    const [searchvalue,setSearch] = useState('')
    const [filteredData, setFilteredData] = useState(null)

    const handleChange =(e)=>{
        const {value} = e.target
        setSelectedType(value)
    }
    // let featuredata = selectedType == 'All' ? data : data.filter((d)=> d.eventType == selectedType)

    // console.log(featuredata)
    console.log(data)
    const newfunct = async(e)=>{
        e.preventDefault();
        try {
            const res = await fetch(`https://meetbackend-swart.vercel.app/eventName/${searchvalue}`);
            const val = await res.json();
            setFilteredData([val]);
        } catch (error) {
            console.log("Error While fetching event by name", error);
        }
    }
    useEffect(() => {
        // Reset filteredData when search is cleared
        if (searchvalue === "") {
            setFilteredData(null);
        }
    }, [searchvalue]);

    const filteredEvents = filteredData
        ? filteredData
        : selectedType === 'All'
            ? data
            : data?.filter((d) => d.eventType === selectedType);

    return (
        <div>
            <nav className="navbar navbar-light bg-light px-3">
                <div className="container-fluid">
                    {/* <div className="col-md-6"> */}
                        
                    <a className="navbar-brand text-danger" href="#">Meetup</a>
                        
                    <form className="d-flex">
                        <input className="form-control me-2" type="search" onChange={(e)=> setSearch(e.target.value)} placeholder="Search..." aria-label="Search"/>
                        <button className="btn btn-outline-primary" onClick={newfunct} type="submit">Search</button>
                    </form>
                </div>
            </nav>
            <div className="container m-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2 className="fw-bold">Meetup Events</h2>

                    {/* <select className="form-select w-auto" value={selectedType} onChange={handleTypeChange}>
                        <option value="All">Select Event Type</option>
                        <option value="Online">Online</option>
                        <option value="Offline">Offline</option>
                    </select> */}
                    <select  className="form-select w-auto" value={selectedType} onChange={handleChange}>
                        <option value="Online">Online</option>
                        <option value="Offline">Offline</option>
                        <option value="All" >Both</option>
                    </select>
                </div>
                <div className="row g-4">
                {  
                    filteredEvents?.map((event)=>(
                        <div className="col-md-4">
                            <div className="card border border-dark rounded">
                                <img src={`https://placehold.co/600x400?text=${event.eventName}`} className="card-img-top" alt="Event Image"/>
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