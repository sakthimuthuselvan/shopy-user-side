import React, { useRef, useEffect, useState } from 'react';

const MapComponent = () => {
  const mapRef = useRef(null);
  const searchBoxRef = useRef(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [map, setMap] = useState(null);

  useEffect(() => {
    const loadMap = () => {
      const loadedMap = new window.google.maps.Map(mapRef.current, {
        center: { lat: 12.975971, lng: 80.22120919999998 },
        zoom: 15,
      });

      setMap(loadedMap);

      const searchBox = new window.google.maps.places.SearchBox(searchBoxRef.current);

      searchBox.addListener('places_changed', () => {
        const places = searchBox.getPlaces();
        if (places.length === 0) return;

        const bounds = new window.google.maps.LatLngBounds();
        places.forEach((place) => {
          if (!place.geometry) return;
          if (place.geometry.viewport) {
            bounds.union(place.geometry.viewport);
          } else {
            bounds.extend(place.geometry.location);
          }
        });
        loadedMap.fitBounds(bounds);
      });

      loadedMap.addListener('click', (event) => {
        placeMarker(event.latLng);
      });
    };

    if (!window.google) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBGY3oJOjxoF5VwsbCL8zLKQxqwGV6eC6A&libraries=places`;
      script.onload = loadMap;
      document.head.appendChild(script);
    } else {
      loadMap();
    }

    return () => {
      // Cleanup code if needed
    };
  }, []);

  const placeMarker = (position) => {
    if (map) {
      if (selectedLocation) {
        selectedLocation.setMap(null);
      }

      const marker = new window.google.maps.Marker({
        position: position,
        map: map,
      });

      setSelectedLocation(marker);
    }
  };

  return (
    <div>
      <input
        ref={searchBoxRef}
        type="text"
        placeholder="Enter a location"
        style={{ width: '300px', padding: '10px' }}
      />
      <div
        ref={mapRef}
        style={{ width: '600px', height: '400px', marginTop: '20px', border: '1px solid #ccc' }}
      />
    </div>
  );
};

export default MapComponent;
