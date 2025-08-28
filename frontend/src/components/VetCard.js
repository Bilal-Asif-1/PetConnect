import React from "react";
import "./PetCard.css";

export default function VetCard({ vet, onBook }) {
  const name = vet.user?.name || vet.name || "Veterinarian";
  const profileImage = vet.profileImage || "https://randomuser.me/api/portraits/men/32.jpg";
  const location = vet.location || "—";
  const ratingValue = vet.rating || vet.averageRating || vet.reviews?.avg || null;
  const ratingCount = vet.reviewsCount || (Array.isArray(vet.reviews) ? vet.reviews.length : null);

  return (
    <div className="pet-card">
      <div className="imgBox">
        <img
          src={profileImage}
          alt={name}
          className="pet-img"
          style={{
            height: 100,
            width: 100,
            borderRadius: '50%',
            objectFit: 'cover',
            border: '4px solid #ffce00'
          }}
        />
      </div>
      <div className="contentBox">
        <h3>{name}</h3>
        <div style={{ color: '#fff', fontSize: 13, marginBottom: 6 }}>Location: {location}</div>
        <div style={{ color: '#fff', fontSize: 13, marginBottom: 6 }}>
          {ratingValue ? (
            <>
              Reviews: {"★".repeat(Math.round(ratingValue))}
              {"☆".repeat(Math.max(0, 5 - Math.round(ratingValue)))}
              {ratingCount != null && <span> ({ratingCount})</span>}
            </>
          ) : (
            <>Reviews: Not rated yet</>
          )}
        </div>
        {onBook ? (
          <button type="button" className="buy" onClick={() => onBook(vet)}>
            Book Appointment
          </button>
        ) : (
          <a href="#" className="buy">Contact</a>
        )}
      </div>
    </div>
  );
}


