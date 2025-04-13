import { useState, useRef, useEffect } from "react";
import { NavbarEventOrganizer } from "../components/NavbarEventOrganizer";
import { NavbarStudentSSGEventOrganizer } from "../components/NavbarStudentSSGEventOrganizer";
import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaUsers,
  FaGraduationCap,
  FaPlus,
  FaTimes,
  FaSearchLocation,
  FaLocationArrow,
} from "react-icons/fa";

interface CreateEventProps {
  role: string;
}

declare global {
  interface Window {
    google: any;
  }
}

export const CreateEvent: React.FC<CreateEventProps> = ({ role }) => {
  // Form state
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [selectedSSGOfficers, setSelectedSSGOfficers] = useState<string[]>([]);
  const [selectedPrograms, setSelectedPrograms] = useState<string[]>([]);
  const [ssgDropdownOpen, setSSGDropdownOpen] = useState(false);
  const [programDropdownOpen, setProgramDropdownOpen] = useState(false);
  const [newOfficer, setNewOfficer] = useState("");
  const [newProgram, setNewProgram] = useState("");
  const [showAddOfficerInput, setShowAddOfficerInput] = useState(false);
  const [showAddProgramInput, setShowAddProgramInput] = useState(false);

  // Location picker state
  const [showMap, setShowMap] = useState(false);
  const [map, setMap] = useState<any>(null);
  const [marker, setMarker] = useState<any>(null);
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [nearbyPlaces, setNearbyPlaces] = useState<any[]>([]);
  const [showNearbyPlaces, setShowNearbyPlaces] = useState(false);

  const searchInputRef = useRef<HTMLInputElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);

  const ssgOfficers = ["Officer 1", "Officer 2", "Officer 3"];
  const programs = [
    "BS Computer Engineering",
    "BS Civil Engineering",
    "BS Electronics Engineering",
    "BS Electrical Engineering",
  ];
  useEffect(() => {
    const loadGoogleMaps = () => {
      if (!window.google) {
        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=${
          import.meta.env.VITE_GMAPS_KEY
        }&libraries=places&callback=initMap`;
        script.async = true;
        script.onload = () => {
          window.initMap = initializeMap;
          initializeMap();
        };
        script.onerror = () =>
          console.error("Google Maps script failed to load");
        document.head.appendChild(script);
      } else {
        initializeMap();
      }
    };

    loadGoogleMaps();

    return () => {
      if (marker) marker.setMap(null);
      delete window.initMap;
    };
  }, []);
  const initializeMap = () => {
    if (mapRef.current && !map) {
      const newMap = new window.google.maps.Map(mapRef.current, {
        center: { lat: 14.5995, lng: 120.9842 }, // Default to Manila
        zoom: 15,
      });
      setMap(newMap);

      // Add these listeners
      newMap.addListener("tilesloaded", () => {
        console.log("Map fully loaded");
      });

      // Add click listener to place marker
      newMap.addListener("click", (e: any) => {
        placeMarker(e.latLng, newMap);
        geocodePosition(e.latLng);
      });

      // Initialize search box
      if (searchInputRef.current) {
        const searchBox = new window.google.maps.places.SearchBox(
          searchInputRef.current
        );
        newMap.controls[window.google.maps.ControlPosition.TOP_LEFT].push(
          searchInputRef.current
        );

        searchBox.addListener("places_changed", () => {
          const places = searchBox.getPlaces();
          if (places && places.length > 0) {
            const place = places[0];
            if (!place.geometry) return;

            if (place.geometry.viewport) {
              newMap.fitBounds(place.geometry.viewport);
            } else {
              newMap.setCenter(place.geometry.location);
              newMap.setZoom(17);
            }

            placeMarker(place.geometry.location, newMap);
            setEventLocation(place.formatted_address || place.name || "");
          }
        });
      }
    }
  };

  const placeMarker = (location: any, map: any) => {
    if (marker) {
      marker.setMap(null);
    }

    const newMarker = new window.google.maps.Marker({
      position: location,
      map: map,
    });

    setMarker(newMarker);
    map.panTo(location);
  };

  const geocodePosition = (pos: any) => {
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ location: pos }, (results: any, status: any) => {
      if (status === "OK" && results[0]) {
        setEventLocation(results[0].formatted_address);
      }
    });
  };

  const toggleLocationPicker = () => {
    setShowMap(!showMap);
    setShowNearbyPlaces(false);
    if (!showMap && mapRef.current) {
      setTimeout(() => {
        if (map) {
          map.setCenter(userLocation || { lat: 14.5995, lng: 120.9842 });
          map.setZoom(15);
        }
      }, 100);
    }
  };

  const findNearbyPlaces = () => {
    if (!map || !userLocation) {
      console.error("Map or user location not available");
      return;
    }

    const service = new window.google.maps.places.PlacesService(map);

    const request = {
      location: userLocation,
      radius: 500, // Smaller radius (500m) for better results
      type: ["establishment", "point_of_interest"],
      rankBy: window.google.maps.places.RankBy.PROMINENCE,
    };

    service.nearbySearch(request, (results, status) => {
      if (
        status === window.google.maps.places.PlacesServiceStatus.OK &&
        results
      ) {
        setNearbyPlaces(results);
        setShowNearbyPlaces(true);
      } else {
        console.error("Nearby search failed:", status);
        setNearbyPlaces([]);
        setShowNearbyPlaces(true); // Still show the container with "No places found"
      }
    });
  };

  const getUserLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    // Show loading state
    setNearbyPlaces([]);
    setShowNearbyPlaces(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setUserLocation(pos);

        if (map) {
          map.setCenter(pos);
          placeMarker(pos, map);
          geocodePosition(pos);
          findNearbyPlaces(); // Call this after map is centered
        }
      },
      (error) => {
        console.error("Geolocation error:", error);
        alert(`Error getting location: ${error.message}`);
        setShowNearbyPlaces(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };
  const selectPlace = (place: any) => {
    if (place.geometry && place.geometry.location) {
      if (map) {
        map.setCenter(place.geometry.location);
        placeMarker(place.geometry.location, map);
      }
      setEventLocation(place.name || place.vicinity || "");
      setShowNearbyPlaces(false);
    }
  };

  const resetForm = () => {
    setEventName("");
    setEventDate("");
    setEventLocation("");
    setSelectedSSGOfficers([]);
    setSelectedPrograms([]);
    setSSGDropdownOpen(false);
    setProgramDropdownOpen(false);
    setNewOfficer("");
    setNewProgram("");
    setShowAddOfficerInput(false);
    setShowAddProgramInput(false);
    setShowMap(false);
    setShowNearbyPlaces(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      eventName,
      eventDate,
      eventLocation,
      selectedSSGOfficers,
      selectedPrograms,
    });
    alert("Event created successfully!");
    resetForm();
  };

  const toggleSelection = (
    item: string,
    selectedList: string[],
    setSelected: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    setSelected(
      selectedList.includes(item)
        ? selectedList.filter((selected) => selected !== item)
        : [...selectedList, item]
    );
  };

  const addNewOfficer = () => {
    if (newOfficer.trim() && !ssgOfficers.includes(newOfficer.trim())) {
      setSelectedSSGOfficers([...selectedSSGOfficers, newOfficer.trim()]);
      setNewOfficer("");
    }
    setShowAddOfficerInput(false);
  };

  const addNewProgram = () => {
    if (newProgram.trim() && !programs.includes(newProgram.trim())) {
      setSelectedPrograms([...selectedPrograms, newProgram.trim()]);
      setNewProgram("");
    }
    setShowAddProgramInput(false);
  };

  const removeOfficer = (officer: string) => {
    setSelectedSSGOfficers(
      selectedSSGOfficers.filter((item) => item !== officer)
    );
  };

  const removeProgram = (program: string) => {
    setSelectedPrograms(selectedPrograms.filter((item) => item !== program));
  };

  return (
    <div className="create-event-wrapper">
      {/* Navbar */}
      <div className="navbar-container">
        {role === "student-ssg-eventorganizer" ? (
          <NavbarStudentSSGEventOrganizer />
        ) : (
          <NavbarEventOrganizer />
        )}
      </div>

      <div className="create-event-container">
        <h2 className="form-title">Create New Event</h2>
        <p className="form-subtitle">
          Fill in the details below to create a new event
        </p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="input-label">
              <FaCalendarAlt className="input-icon" />
              Event Name
            </label>
            <input
              type="text"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              required
              placeholder="Enter Event Name"
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="input-label">
              <FaCalendarAlt className="input-icon" />
              Event Date
            </label>
            <input
              type="date"
              value={eventDate}
              onChange={(e) => setEventDate(e.target.value)}
              required
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="input-label">
              <FaMapMarkerAlt className="input-icon" />
              Location
            </label>
            <div className="location-input-group">
              <input
                type="text"
                value={eventLocation}
                onChange={(e) => setEventLocation(e.target.value)}
                required
                placeholder="Enter Location or click the map icon"
                className="form-input"
              />
              <div className="location-buttons">
                <button
                  type="button"
                  className="map-toggle-btn"
                  onClick={toggleLocationPicker}
                  title="Open map picker"
                >
                  <FaSearchLocation />
                </button>
                <button
                  type="button"
                  className="near-me-btn"
                  onClick={getUserLocation}
                  title="Find places near me"
                >
                  <FaLocationArrow />
                </button>
              </div>
            </div>

            {showMap && (
              <div className="map-picker-container">
                <input
                  type="text"
                  ref={searchInputRef}
                  placeholder="Search for a location"
                  className="map-search-input"
                />
                <div ref={mapRef} className="map-container"></div>
                <div className="map-controls">
                  <button
                    type="button"
                    className="btn btn-near-me"
                    onClick={getUserLocation}
                  >
                    <FaLocationArrow /> Find Near Me
                  </button>
                  <button
                    type="button"
                    className="btn btn-confirm-location"
                    onClick={toggleLocationPicker}
                  >
                    Confirm Location
                  </button>
                </div>
              </div>
            )}

            {showNearbyPlaces && (
              <div className="nearby-places-container">
                <h4>Nearby Places</h4>
                {nearbyPlaces.length > 0 ? (
                  <ul className="nearby-places-list">
                    {nearbyPlaces.map((place) => (
                      <li
                        key={place.place_id}
                        onClick={() => selectPlace(place)}
                        className="nearby-place-item"
                      >
                        <strong>{place.name}</strong>
                        {place.vicinity && <div>{place.vicinity}</div>}
                        {place.rating && (
                          <div className="place-rating">
                            Rating: {place.rating} (
                            {place.user_ratings_total || 0} reviews)
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="no-places-found">
                    No nearby places found. Try a larger area.
                  </div>
                )}
                <button
                  className="btn btn-close-nearby"
                  onClick={() => setShowNearbyPlaces(false)}
                >
                  Close
                </button>
              </div>
            )}
          </div>

          {/* Assign SSG Officers Dropdown */}
          <div className="form-group dropdown-wrapper">
            <label className="input-label">
              <FaUsers className="input-icon" />
              Assign SSG Officers
            </label>
            <div className="dropdown">
              <button
                type="button"
                className="dropdown-btn"
                onClick={() => setSSGDropdownOpen(!ssgDropdownOpen)}
              >
                {selectedSSGOfficers.length > 0 ? (
                  <div className="selected-items">
                    {selectedSSGOfficers.map((officer) => (
                      <span key={officer} className="selected-badge">
                        {officer}
                        <button
                          type="button"
                          className="remove-badge"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeOfficer(officer);
                          }}
                        >
                          <FaTimes size={10} />
                        </button>
                      </span>
                    ))}
                  </div>
                ) : (
                  <span>Select Officers</span>
                )}
                <span className="dropdown-icon">
                  {ssgDropdownOpen ? "▲" : "▼"}
                </span>
              </button>
              {ssgDropdownOpen && (
                <div className="dropdown-content">
                  {ssgOfficers.map((officer) => (
                    <label key={officer} className="dropdown-item radio-style">
                      <input
                        type="checkbox"
                        checked={selectedSSGOfficers.includes(officer)}
                        onChange={() =>
                          toggleSelection(
                            officer,
                            selectedSSGOfficers,
                            setSelectedSSGOfficers
                          )
                        }
                        className="radio-input"
                      />
                      <span className="radio-custom"></span>
                      <span className="dropdown-text">{officer}</span>
                    </label>
                  ))}
                  {showAddOfficerInput ? (
                    <div className="add-new-item">
                      <input
                        type="text"
                        value={newOfficer}
                        onChange={(e) => setNewOfficer(e.target.value)}
                        placeholder="Enter new officer name"
                        className="add-new-input"
                        autoFocus
                      />
                      <div className="add-new-buttons">
                        <button
                          type="button"
                          className="add-new-btn confirm"
                          onClick={addNewOfficer}
                        >
                          Add
                        </button>
                        <button
                          type="button"
                          className="add-new-btn cancel"
                          onClick={() => setShowAddOfficerInput(false)}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      type="button"
                      className="add-new-btn"
                      onClick={() => setShowAddOfficerInput(true)}
                    >
                      <FaPlus size={12} /> Add New Officer
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Select Programs Dropdown */}
          <div className="form-group dropdown-wrapper">
            <label className="input-label">
              <FaGraduationCap className="input-icon" />
              Select Programs
            </label>
            <div className="dropdown">
              <button
                type="button"
                className="dropdown-btn"
                onClick={() => setProgramDropdownOpen(!programDropdownOpen)}
              >
                {selectedPrograms.length > 0 ? (
                  <div className="selected-items">
                    {selectedPrograms.map((program) => (
                      <span key={program} className="selected-badge">
                        {program}
                        <button
                          type="button"
                          className="remove-badge"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeProgram(program);
                          }}
                        >
                          <FaTimes size={10} />
                        </button>
                      </span>
                    ))}
                  </div>
                ) : (
                  <span>Select Programs</span>
                )}
                <span className="dropdown-icon">
                  {programDropdownOpen ? "▲" : "▼"}
                </span>
              </button>
              {programDropdownOpen && (
                <div className="dropdown-content">
                  {programs.map((program) => (
                    <label key={program} className="dropdown-item radio-style">
                      <input
                        type="checkbox"
                        checked={selectedPrograms.includes(program)}
                        onChange={() =>
                          toggleSelection(
                            program,
                            selectedPrograms,
                            setSelectedPrograms
                          )
                        }
                        className="radio-input"
                      />
                      <span className="radio-custom"></span>
                      <span className="dropdown-text">{program}</span>
                    </label>
                  ))}
                  {showAddProgramInput ? (
                    <div className="add-new-item">
                      <input
                        type="text"
                        value={newProgram}
                        onChange={(e) => setNewProgram(e.target.value)}
                        placeholder="Enter new program name"
                        className="add-new-input"
                        autoFocus
                      />
                      <div className="add-new-buttons">
                        <button
                          type="button"
                          className="add-new-btn confirm"
                          onClick={addNewProgram}
                        >
                          Add
                        </button>
                        <button
                          type="button"
                          className="add-new-btn cancel"
                          onClick={() => setShowAddProgramInput(false)}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      type="button"
                      className="add-new-btn"
                      onClick={() => setShowAddProgramInput(true)}
                    >
                      <FaPlus size={12} /> Add New Program
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="button-group">
            <button type="button" className="btn btn-reset" onClick={resetForm}>
              Reset
            </button>
            <button type="submit" className="btn btn-submit">
              Create Event
            </button>
          </div>
        </form>
      </div>

      <style>{`
        .create-event-wrapper {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
          background-color: #f5f7fa;
        }

        .navbar-container {
          width: 100%;
          margin: 0;
          padding: 0;
        }

        .create-event-container {
          background: #ffffff;
          padding: 1.5rem;
          border-radius: 0.5rem;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
          width: 90%;
          max-width: 600px;
          margin: 1rem auto;
        }

        .form-title {
          color: #343a40;
          font-weight: 600;
          margin-bottom: 0.5rem;
          text-align: center;
          font-size: 1.5rem;
        }

        .form-subtitle {
          color: #6c757d;
          text-align: center;
          margin-bottom: 1.5rem;
          font-size: 0.9rem;
        }

        .form-group {
          margin-bottom: 1.25rem;
        }

        .input-label {
          display: flex;
          align-items: center;
          font-weight: 500;
          margin-bottom: 0.5rem;
          color: #495057;
          font-size: 0.9rem;
        }

        .input-icon {
          margin-right: 0.5rem;
          color: #6c757d;
          font-size: 0.9rem;
        }

        .form-input {
          padding: 0.75rem 1rem;
          border: 1px solid #ced4da;
          border-radius: 0.5rem;
          width: 100%;
          font-size: 0.9rem;
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
        }

        .form-input:focus {
          border-color: #007bff;
          outline: none;
          box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
        }

        .location-input-group {
          position: relative;
          display: flex;
        }

        .location-buttons {
          position: absolute;
          right: 10px;
          top: 50%;
          transform: translateY(-50%);
          display: flex;
          gap: 5px;
        }

        .map-toggle-btn, .near-me-btn {
          background: none;
          border: none;
          color: #6c757d;
          cursor: pointer;
          font-size: 1.2rem;
          padding: 0.5rem;
        }

        .map-picker-container {
          margin-top: 1rem;
          border: 1px solid #ced4da;
          border-radius: 0.5rem;
          overflow: hidden;
        }

        .map-search-input {
          width: 100%;
          padding: 0.75rem 1rem;
          border: none;
          border-bottom: 1px solid #ced4da;
          font-size: 0.9rem;
        }

        .map-container {
          height: 300px;
          width: 100%;
        }

        .map-controls {
          display: flex;
          gap: 10px;
          padding: 10px;
          background: #f8f9fa;
        }

        .btn-near-me {
          background-color: #17a2b8;
          color: white;
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 5px;
        }

        .btn-confirm-location {
          width: 100%;
          padding: 0.75rem;
          background-color: #28a745;
          color: white;
          border: none;
          cursor: pointer;
        }

        .nearby-places-container {
          margin-top: 1rem;
          border: 1px solid #ced4da;
          border-radius: 0.5rem;
          padding: 1rem;
          background: white;
        }

        .nearby-places-list {
          list-style: none;
          padding: 0;
          margin: 1rem 0;
          max-height: 200px;
          overflow-y: auto;
        }

        .nearby-place-item {
          padding: 0.75rem;
          border-bottom: 1px solid #eee;
          cursor: pointer;
        }

        .nearby-place-item:hover {
          background-color: #f8f9fa;
        }

        .btn-close-nearby {
          width: 100%;
          background-color: #6c757d;
          color: white;
        }

        /* Dropdown styles */
        .dropdown-wrapper {
          position: relative;
        }

        .dropdown-btn {
          width: 100%;
          padding: 0.75rem 1rem;
          border: 1px solid #ced4da;
          border-radius: 0.5rem;
          background-color: #ffffff;
          cursor: pointer;
          text-align: left;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.9rem;
          color: #495057;
          transition: border-color 0.3s ease;
          min-height: 45px;
        }

        .dropdown-btn:hover {
          border-color: #adb5bd;
        }

        .dropdown-icon {
          font-size: 0.8rem;
          color: #6c757d;
        }

        .dropdown-content {
          position: absolute;
          width: 100%;
          background: #ffffff;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
          border-radius: 0.5rem;
          margin-top: 0.5rem;
          max-height: 250px;
          overflow-y: auto;
          z-index: 100;
          border: 1px solid #e9ecef;
        }

        /* Radio-style checkbox */
        .dropdown-item.radio-style {
          position: relative;
          padding: 0.5rem 1rem 0.5rem 2.5rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          min-height: 24px;
          transition: background-color 0.2s;
        }

        .dropdown-item.radio-style:hover {
          background-color: #f8f9fa;
        }

        .radio-input {
          position: absolute;
          opacity: 0;
          cursor: pointer;
        }

        .radio-custom {
          position: absolute;
          left: 1rem;
          height: 16px;
          width: 16px;
          background-color: #fff;
          border: 2px solid #ddd;
          border-radius: 50%;
        }

        .radio-input:checked ~ .radio-custom {
          background-color: #162f65;
          border-color: #162f65;
        }

        .radio-custom:after {
          content: "";
          position: absolute;
          display: none;
        }

        .radio-input:checked ~ .radio-custom:after {
          display: block;
        }

        .radio-custom:after {
          left: 4px;
          top: 4px;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: white;
        }

        .dropdown-text {
          font-size: 0.9rem;
          color: #495057;
        }

        /* Selected items display */
        .selected-items {
          display: flex;
          flex-wrap: wrap;
          gap: 5px;
          align-items: center;
        }

        .selected-badge {
          background-color: #162f65;
          color: white;
          padding: 4px 8px;
          border-radius: 15px;
          font-size: 12px;
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .remove-badge {
          background: none;
          border: none;
          color: white;
          cursor: pointer;
          display: flex;
          align-items: center;
          padding: 0;
        }

        .remove-badge:hover {
          opacity: 0.8;
        }

        /* Add new item styles */
        .add-new-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 5px;
          width: 100%;
          padding: 0.5rem;
          background-color: transparent;
          border: none;
          color: #162f65;
          font-size: 0.8rem;
          cursor: pointer;
          transition: background-color 0.2s;
          border-top: 1px solid #e9ecef;
        }

        .add-new-btn:hover {
          background-color: #f8f9fa;
        }

        .add-new-item {
          padding: 0.75rem;
          border-top: 1px solid #e9ecef;
        }

        .add-new-input {
          width: 100%;
          padding: 0.5rem;
          border: 1px solid #ced4da;
          border-radius: 4px;
          margin-bottom: 0.5rem;
          font-size: 0.9rem;
        }

        .add-new-buttons {
          display: flex;
          gap: 0.5rem;
        }

        .add-new-buttons button {
          flex: 1;
          padding: 0.4rem;
          border: none;
          border-radius: 4px;
          font-size: 0.8rem;
          cursor: pointer;
        }

        .add-new-buttons .confirm {
          background-color: #28a745;
          color: white;
        }

        .add-new-buttons .confirm:hover {
          background-color: #218838;
        }

        .add-new-buttons .cancel {
          background-color: #dc3545;
          color: white;
        }

        .add-new-buttons .cancel:hover {
          background-color: #c82333;
        }

        /* Button group styles */
        .button-group {
          display: flex;
          justify-content: space-between;
          margin-top: 2rem;
          gap: 1rem;
        }

        .btn {
          padding: 0.75rem 1.5rem;
          border: none;
          border-radius: 0.5rem;
          cursor: pointer;
          font-weight: 500;
          font-size: 0.9rem;
          transition: all 0.3s ease;
          flex: 1;
          text-align: center;
        }

        .btn-reset {
          background-color: #6c757d;
          color: white;
        }

        .btn-reset:hover {
          background-color: #5a6268;
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        .btn-submit {
          background-color: #28a745;
          color: white;
        }

        .btn-submit:hover {
          background-color: #218838;
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
          .create-event-container {
            margin: 1rem auto;
            padding: 1.25rem;
            width: 95%;
          }

          .form-title {
            font-size: 1.3rem;
          }

          .button-group {
            flex-direction: column;
          }

          .btn {
            width: 100%;
          }

          .dropdown-content {
            max-height: 200px;
          }

          .map-container {
            height: 250px;
          }

          .map-controls {
            flex-direction: column;
          }
        }

        @media (min-width: 992px) {
          .create-event-wrapper {
            margin-left: 5rem;
          }
        }

        @media (max-width: 480px) {
          .form-input, .dropdown-btn {
            padding: 0.65rem 0.9rem;
          }

          .selected-badge {
            font-size: 11px;
            padding: 3px 6px;
          }

          .button-group {
            margin-top: 1.5rem;
          }

          .map-container {
            height: 200px;
          }
        }
      `}</style>
    </div>
  );
};

export default CreateEvent;
