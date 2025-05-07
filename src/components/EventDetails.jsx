import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const EventDetail = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);

  const fetchEvent = async () => {
    try {
        const res = await fetch(`https://meetbackend-swart.vercel.app/event/${eventId}`);
        const data = await res.json();
        setEvent(data);
        console.log(event)
    } catch (error) {
        console.error("Error fetching event:", error);
    }
 };
 fetchEvent()
  return (
    <div>
      <Navbar/>
      {event ? (
        <div className="container my-5 bg-white p-4 rounded shadow-sm">
          <div className="row">
            {/* left Column  */}
            <div className="col-md-8">
                <h2>{event.eventName}</h2>
                <p><strong>Hosted By:</strong> <span class="fw-bold">{event.host}</span></p>
                <img src="https://placehold.co/800x300?text=Hello+World" alt="Event" class="event-image mb-3" />
                <h5><strong>Details:</strong></h5>
                <p>{event.eventDetail}</p>
                <h5><strong>Additional Information:</strong></h5>
                <p><strong>Dress Code:</strong> {event.dressCode}</p>
                <p><strong>Age Restrictions:</strong> {event.ageRestriction} and above</p>
                <h5><strong>Event Tags:</strong></h5>
                {event.eventTags.map((tags)=>(
                     <span class="tag btn btn-danger m-2">{tags}</span>
                ))}
            </div>
            {/* Right Column  */}
            <div className="col-md-4">
                <div className="bg-light p-3 mb-3 rounded">
                    <p><i className="bi bi-calendar-event"></i><strong>{event.eventDateStart}</strong> to</p>
                    <p>{event.eventDateEnd}</p>
                    <p><i class="bi bi-geo-alt"></i> {event.eventVenue}</p>
                    <p><strong>₹{event.ticketPrice}</strong></p>
                </div>

                <h5><strong>Speakers: </strong></h5>
                <div className="d-flex gap-2 mb-3">
                    {
                        event.speakers.map((speak)=>(
                            <div className="speaker-card flex-fill">
                                <img src="https://placehold.co/100" class="rounded-circle mb-2" />
                                <p className="mb-0"><strong>{speak.name}</strong></p>
                                <p className="text-muted">{speak.title}</p>
                            </div>
                        ))
                    }
                    
                </div>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading event details...</p>
      )}
      <Footer/>
    </div>
  );
};

export default EventDetail;
