import mapboxgl from "mapbox-gl";
import React, { useEffect, useRef, useState } from "react";
import "./styles/MapView.css";

interface ModalInfoViajeProps {
  ride: {
    destino: string;
  };
}

const TOKEN =
  "sk.eyJ1IjoiamFub2NhcnZhamFsIiwiYSI6ImNtNDdycTBnbjA0bzQycXB3MzlpbDAweGYifQ.amIGeDuEgg8EkFTx23jkOA";

const MapView: React.FC<ModalInfoViajeProps> = ({ ride }) => {
  const mapDiv = useRef<HTMLDivElement>(null);
  const [cords, setCords] = useState<[number, number] | null>(null);

  useEffect(() => {
    async function getRideCords() {
      try {
        const endpoint = `(
          ride.destino
        )}.json?access_token=${TOKEN}`;
        const response = await fetch(endpoint);
        const data = await response.json();

        if (data?.features && data.features.length > 0) {
          setCords(data.features[0].center);
        } else {
          console.error("No se encontraron coordenadas para el destino.");
        }
      } catch (error) {
        console.error("Error al obtener las coordenadas:", error);
      }
    }

    getRideCords();
  }, [ride.destino]);

  useEffect(() => {
    if (!mapDiv.current || !cords) return;

    // Inicializar el mapa
    const map = new mapboxgl.Map({
      container: mapDiv.current,
      style: "mapbox://styles/mapbox/streets-v11", // Estilo del mapa
      center: cords || [-73.07009428373095, -36.80761796776942], // Coordenadas por defecto o las obtenidas
      zoom: 12, // Nivel de zoom inicial
    });

    // Añadir un marcador en las coordenadas obtenidas
    new mapboxgl.Marker().setLngLat(cords).addTo(map);

    // Limpiar el mapa al desmontar el componente
    return () => map.remove();
  }, [cords]);

  return (
    <div
      className="mapview"
      ref={mapDiv}
      style={{
        width: "100%",
        height: "40rem",
      }}
    />
  );
};

export default MapView;
