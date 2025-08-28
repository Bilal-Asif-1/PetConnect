import React from "react";
import "./PetCard.css";

export default function PetCard({ pet }) {
  return (
    <div className="pet-card">
      <div className="imgBox">
        <img
          src={pet.images && pet.images.length > 0 ? pet.images[0] : "https://placehold.co/300x300?text=No+Image"}
          alt={pet.name}
          className="pet-img"
        />
      </div>
      <div className="contentBox">
        <h3>{pet.name}</h3>
        <h2 className="price">
          {pet.price ? (
            <>
              {pet.price}
              <small>.00</small> $
            </>
          ) : (
            pet.type === "adoption" ? "Adoption" : "Contact"
          )}
        </h2>
        <div style={{ color: "#fff", fontSize: 13, marginBottom: 4 }}>
          Age: {pet.age} | Gender: {pet.gender}
        </div>
        {pet.vaccinationStatus && (
          <div style={{ color: "#fff", fontSize: 13, marginBottom: 4 }}>
            Vaccinated: {pet.vaccinationStatus}
          </div>
        )}
       
        <a href="#" className="buy">
          {pet.type === "adoption" ? "Adopt Now" : "Contact"}
        </a>
      </div>
    </div>
  );
}
