import React from 'react';

export default function ProductCard({ product, onAddToCart, onOpenDescription }) {
  const imageUrl = Array.isArray(product.images) && product.images.length > 0
    ? product.images[0]
    : "https://placehold.co/300x300?text=No+Image";

  return (
    <div
      className="bg-white rounded-lg shadow-md overflow-hidden transform transition-transform duration-300 hover:scale-105 flex flex-col h-full cursor-pointer"
      onClick={() => onOpenDescription(product)}
    >
      <div className="relative h-48 w-full overflow-hidden">
        <img
          src={imageUrl}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold text-dark mb-1">{product.name}</h3>
        <p className="text-primary text-xl font-bold mb-2">${product.price}</p>
        <div className="text-gray-600 text-sm mb-3">
          Available: {typeof product.stock === 'number' ? product.stock : 'N/A'}
        </div>
        <button
          className="mt-auto block w-full text-center bg-primary text-white py-2 px-4 rounded-md hover:bg-secondary transition duration-200"
          onClick={(e) => {
            e.stopPropagation(); // Prevent opening description when clicking add to cart
            onAddToCart(product);
          }}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
