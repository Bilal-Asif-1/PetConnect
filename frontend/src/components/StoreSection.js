import React, { useEffect, useState } from 'react';
import './ProductCard.css';

const animalIcons = {
  Dogs: '🐶',
  Cats: '🐱',
  Birds: '🐦',
  Fish: '🐟',
  'Small Pets': '🐹',
  Reptiles: '🦎',
};

const productImages = {
  Dogs: [
    'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&w=200',
    'https://images.pexels.com/photos/4587997/pexels-photo-4587997.jpeg?auto=compress&w=200',
    'https://images.pexels.com/photos/52570/puppy-dog-pet-collar-52570.jpeg?auto=compress&w=200',
    'https://images.pexels.com/photos/1805164/pexels-photo-1805164.jpeg?auto=compress&w=200',
  ],
  Cats: [
    'https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&w=200',
    'https://images.pexels.com/photos/320014/pexels-photo-320014.jpeg?auto=compress&w=200',
    'https://images.pexels.com/photos/1170986/pexels-photo-1170986.jpeg?auto=compress&w=200',
    'https://images.pexels.com/photos/416160/pexels-photo-416160.jpeg?auto=compress&w=200',
  ],
  Birds: [
    'https://images.pexels.com/photos/45911/peacock-bird-plumage-color-45911.jpeg?auto=compress&w=200',
    'https://images.pexels.com/photos/45910/peacock-bird-plumage-color-45910.jpeg?auto=compress&w=200',
    'https://images.pexels.com/photos/325044/pexels-photo-325044.jpeg?auto=compress&w=200',
    'https://images.pexels.com/photos/45912/peacock-bird-plumage-color-45912.jpeg?auto=compress&w=200',
  ],
  Fish: [
    'https://images.pexels.com/photos/128756/pexels-photo-128756.jpeg?auto=compress&w=200',
    'https://images.pexels.com/photos/128756/pexels-photo-128756.jpeg?auto=compress&w=200',
    'https://images.pexels.com/photos/161931/fish-tank-aquarium-161931.jpeg?auto=compress&w=200',
    'https://images.pexels.com/photos/128756/pexels-photo-128756.jpeg?auto=compress&w=200',
  ],
  'Small Pets': [
    'https://images.pexels.com/photos/326012/pexels-photo-326012.jpeg?auto=compress&w=200',
    'https://images.pexels.com/photos/326012/pexels-photo-326012.jpeg?auto=compress&w=200',
    'https://images.pexels.com/photos/326012/pexels-photo-326012.jpeg?auto=compress&w=200',
    'https://images.pexels.com/photos/326012/pexels-photo-326012.jpeg?auto=compress&w=200',
  ],
  Reptiles: [
    'https://images.pexels.com/photos/162140/lizard-reptile-animal-nature-162140.jpeg?auto=compress&w=200',
    'https://images.pexels.com/photos/162140/lizard-reptile-animal-nature-162140.jpeg?auto=compress&w=200',
    'https://images.pexels.com/photos/162140/lizard-reptile-animal-nature-162140.jpeg?auto=compress&w=200',
    'https://images.pexels.com/photos/162140/lizard-reptile-animal-nature-162140.jpeg?auto=compress&w=200',
  ],
};

const storeData = {
  categories: [
    {
      name: 'Dogs',
      products: [
        { type: 'Food', items: ['Dry Dog Food', 'Wet Dog Food', 'Puppy Food', 'Grain-Free Food'] },
        { type: 'Toys', items: ['Chew Toys', 'Fetch Balls', 'Plush Toys', 'Interactive Toys'] },
        { type: 'Grooming', items: ['Shampoos', 'Brushes', 'Nail Clippers', 'Dental Care'] },
        { type: 'Habitats', items: ['Dog Beds', 'Crates', 'Kennels', 'Travel Carriers'] },
        { type: 'Health Supplies', items: ['Flea & Tick', 'Supplements', 'First Aid', 'Medications'] },
      ],
    },
    {
      name: 'Cats',
      products: [
        { type: 'Food', items: ['Dry Cat Food', 'Wet Cat Food', 'Kitten Food', 'Special Diets'] },
        { type: 'Toys', items: ['Catnip Toys', 'Wand Toys', 'Balls', 'Interactive Toys'] },
        { type: 'Grooming', items: ['Brushes', 'Shampoos', 'Nail Clippers', 'Litter Deodorizers'] },
        { type: 'Habitats', items: ['Cat Trees', 'Beds', 'Carriers', 'Litter Boxes'] },
        { type: 'Health Supplies', items: ['Flea & Tick', 'Supplements', 'First Aid', 'Medications'] },
      ],
    },
    {
      name: 'Birds',
      products: [
        { type: 'Food', items: ['Seed Mixes', 'Pellets', 'Treats', 'Supplements'] },
        { type: 'Toys', items: ['Swings', 'Ladders', 'Chew Toys', 'Mirrors'] },
        { type: 'Grooming', items: ['Bath Sprays', 'Nail Trimmers', 'Perches'] },
        { type: 'Habitats', items: ['Cages', 'Perches', 'Nests', 'Cage Liners'] },
        { type: 'Health Supplies', items: ['Vitamins', 'First Aid', 'Medications'] },
      ],
    },
    {
      name: 'Fish',
      products: [
        { type: 'Food', items: ['Flakes', 'Pellets', 'Frozen Food', 'Algae Wafers'] },
        { type: 'Toys', items: ['Decorations', 'Bubblers', 'Interactive Ornaments'] },
        { type: 'Grooming', items: ['Water Conditioners', 'Tank Cleaners', 'Nets'] },
        { type: 'Habitats', items: ['Aquariums', 'Filters', 'Heaters', 'Gravel'] },
        { type: 'Health Supplies', items: ['Water Treatments', 'Medications', 'Test Kits'] },
      ],
    },
    {
      name: 'Small Pets',
      products: [
        { type: 'Food', items: ['Pellets', 'Hay', 'Treats', 'Mixes'] },
        { type: 'Toys', items: ['Chew Toys', 'Exercise Wheels', 'Tunnels'] },
        { type: 'Grooming', items: ['Brushes', 'Shampoos', 'Nail Clippers'] },
        { type: 'Habitats', items: ['Cages', 'Bedding', 'Hideouts', 'Carriers'] },
        { type: 'Health Supplies', items: ['Supplements', 'First Aid', 'Medications'] },
      ],
    },
    {
      name: 'Reptiles',
      products: [
        { type: 'Food', items: ['Live Food', 'Pellets', 'Supplements', 'Treats'] },
        { type: 'Toys', items: ['Climbing Branches', 'Hides', 'Interactive Decor'] },
        { type: 'Grooming', items: ['Misting Bottles', 'Shedding Aids', 'Sanitizers'] },
        { type: 'Habitats', items: ['Terrariums', 'Heating Lamps', 'Substrate', 'Decor'] },
        { type: 'Health Supplies', items: ['Calcium', 'Vitamins', 'Medications'] },
      ],
    },
  ],
};

function getRandomPrice() {
  return (Math.random() * 30 + 5).toFixed(2);
}

const StoreSection = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [descCard, setDescCard] = useState(null); // holds product for description overlay
  const [cartOpen, setCartOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [selectedSubcategory, setSelectedSubcategory] = useState('');

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError('');
      try {
        const res = await fetch('/api/products');
        if (!res.ok) throw new Error('Failed to load products');
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        setError(err.message || 'Failed to load products');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const [selectedCategory, setSelectedCategory] = useState(null);
  const categories = Array.from(new Set(products.map(p => p.category)));
  // Get subcategories for selected category
  const subcategories = selectedCategory
    ? Array.from(new Set(products.filter(p => p.category === selectedCategory && p.subcategory).map(p => p.subcategory)))
    : [];

  const handleAddToCart = (p) => {
    setCart(prev => {
      const idx = prev.findIndex(i => i.productId === p._id);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = { ...copy[idx], quantity: copy[idx].quantity + 1 };
        return copy;
      }
      return [...prev, { productId: p._id, name: p.name, price: p.price, quantity: 1 }];
    });
    alert('Item added to cart');
  };

  const handleRemoveFromCart = (productId) => {
    setCart(prev => prev.filter(i => i.productId !== productId));
  };

  const handleChangeQuantity = (productId, delta) => {
    setCart(prev => prev.map(i =>
      i.productId === productId
        ? { ...i, quantity: Math.max(1, i.quantity + delta) }
        : i
    ));
  };

  const handleCheckout = async () => {
    if (cart.length === 0) {
      alert('Your cart is empty.');
      return;
    }
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ items: cart.map(c => ({ productId: c.productId, quantity: c.quantity })) })
      });
      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || 'Checkout failed');
      }
      setCart([]);
      alert('Order placed!');
      setCartOpen(false);
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) return <div className="p-10 text-center">Loading products...</div>;
  if (error) return <div className="p-10 text-center text-red-600">{error}</div>;

  return (
    <div className="max-w-7xl mx-auto py-10 px-4">
      <h1 className="text-4xl font-extrabold text-yellow-800 mb-8 text-center">Pet Store</h1>
      {/* Search Bar */}
      <div className="flex justify-center mb-8">
        <div className="relative w-full max-w-xl">
          <input
            type="text"
            className="w-full py-3 pl-12 pr-4 rounded-xl border border-yellow-300 shadow focus:outline-none focus:ring-2 focus:ring-yellow-400 text-lg bg-white placeholder-gray-400 transition"
            placeholder="Search for products..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ fontFamily: 'inherit' }}
          />
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-yellow-500 text-2xl pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z" />
            </svg>
          </span>
        </div>
      </div>

      {/* Cart Icon Button */}
      <button
        className="fixed top-8 right-8 z-50 flex items-center justify-center w-12 h-12 rounded-full bg-yellow-700 text-white shadow-lg hover:bg-yellow-800 transition text-2xl"
        style={{ boxShadow: '0 4px 24px 0 rgba(161,98,6,0.12)' }}
        onClick={() => setCartOpen(true)}
        aria-label="Open cart"
      >
        <span className="relative">
          🛒
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-white text-yellow-700 rounded-full px-2 py-0.5 text-xs font-bold border border-yellow-700">
              {cart.reduce((sum, i) => sum + i.quantity, 0)}
            </span>
          )}
        </span>
      </button>

      {/* Category Cards - Minimalistic & Professional */}
      <div className="flex flex-wrap justify-center gap-4 mb-10">
        {categories.map((name) => (
          <button
            key={name}
            className={`group flex items-center gap-3 px-5 py-3 rounded-xl border transition-all duration-150 shadow-sm font-semibold text-lg focus:outline-none 
              ${selectedCategory === name ? 'bg-yellow-100 border-yellow-400 text-yellow-900 shadow-md scale-105' : 'bg-white border-yellow-200 text-gray-800 hover:bg-yellow-50 hover:border-yellow-300 hover:shadow-md hover:scale-105'}`}
            style={{ minWidth: 180 }}
            onClick={() => setSelectedCategory(name)}
          >
            <span className="text-2xl">
              {animalIcons[name] || '🐾'}
            </span>
            <span className="tracking-tight group-hover:underline group-hover:decoration-yellow-400 group-hover:decoration-2 transition-all">{name}</span>
          </button>
        ))}
      </div>

      {/* Product Cards for Selected Category */}
      {selectedCategory && (
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-3xl font-bold text-yellow-800">{selectedCategory} Products</h2>
          </div>

          {/* Subcategory Filter */}
          {subcategories.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6 justify-center">
              <button
                className={`px-4 py-1 rounded-full border text-sm font-semibold transition-all ${selectedSubcategory === '' ? 'bg-yellow-700 text-white border-yellow-700' : 'bg-white text-yellow-900 border-yellow-200 hover:bg-yellow-100'}`}
                onClick={() => setSelectedSubcategory('')}
              >
                All
              </button>
              {subcategories.map(sub => (
                <button
                  key={sub}
                  className={`px-4 py-1 rounded-full border text-sm font-semibold transition-all ${selectedSubcategory === sub ? 'bg-yellow-700 text-white border-yellow-700' : 'bg-white text-yellow-900 border-yellow-200 hover:bg-yellow-100'}`}
                  onClick={() => setSelectedSubcategory(sub)}
                >
                  {sub}
                </button>
              ))}
            </div>
          )}

          <div className="product-card-container">
            {products
              .filter(p => p.category === selectedCategory)
              .filter(p => !selectedSubcategory || p.subcategory === selectedSubcategory)
              .filter(p =>
                search.trim() === '' ||
                p.name.toLowerCase().includes(search.toLowerCase()) ||
                (p.description && p.description.toLowerCase().includes(search.toLowerCase()))
              )
              .map((p) => {
                let imageUrl = '';
                if (Array.isArray(p.images) && p.images.length > 0) {
                  imageUrl = p.images[0];
                }
                return (
                  <div key={p._id} className="product-card" data-brand={p.brand || p.category} onClick={e => {
                    // Only open desc card if not clicking the button
                    if (e.target.tagName !== 'BUTTON') setDescCard(p);
                  }} style={{ cursor: 'pointer', position: 'relative' }}>
                    <div className="imgBx">
                      {imageUrl ? (
                        <img src={imageUrl} alt={p.name} />
                      ) : (
                        <span role="img" aria-label="product" style={{fontSize: '5rem', color: '#fff'}}>🛍️</span>
                      )}
                    </div>
                    <div className="contentBx">
                      <h2>{p.name}</h2>
                      <div className="price">${p.price}</div>
                      <div className="stock-info text-xs mt-1" style={{ color: '#fff', textShadow: '0 1px 4px #000' }}>
                        {typeof p.stock === 'number' ? `Available: ${p.stock}` : 'Stock info unavailable'}
                      </div>
                      <button className="buy-btn" style={{ marginTop: '0.5rem', marginBottom: 0 }} onClick={e => { e.stopPropagation(); handleAddToCart(p); }}>
                        Add to Cart
                      </button>
                    </div>
                  </div>
                );
      {/* Description Overlay Card */}
      {descCard && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'rgba(0,0,0,0.3)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
          onClick={() => setDescCard(null)}
        >
          <div style={{
            background: 'rgba(255,255,255,0.92)',
            borderRadius: '1.2rem',
            boxShadow: '0 8px 32px 0 rgba(161,98,6,0.18)',
            padding: '2.5rem 2.5rem 2rem 2.5rem',
            minWidth: 320,
            maxWidth: 420,
            minHeight: 180,
            maxHeight: '70vh',
            overflowY: 'auto',
            position: 'relative',
            opacity: 0.97,
          }} onClick={e => e.stopPropagation()}>
            <button style={{
              position: 'absolute',
              top: 10,
              right: 18,
              fontSize: 24,
              background: 'none',
              border: 'none',
              color: '#a16206',
              cursor: 'pointer',
              fontWeight: 700,
            }} onClick={() => setDescCard(null)} title="Close">×</button>
            <h2 style={{ color: '#a16206', fontWeight: 700, fontSize: 26, marginBottom: 10 }}>{descCard.name}</h2>
            <div style={{ color: '#222', fontSize: 16, marginBottom: 10 }}>
              {descCard.description || 'No description available.'}
            </div>
            <div style={{ color: '#555', fontSize: 15, marginBottom: 6 }}>
              <b>Price:</b> ${descCard.price}
            </div>
            <div style={{ color: '#555', fontSize: 15 }}>
              <b>Available:</b> {typeof descCard.stock === 'number' ? descCard.stock : 'N/A'}
            </div>
          </div>
        </div>
      )}
              })}
          </div>
        </div>
      )}

      {/* Cart Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-96 max-w-full bg-white shadow-2xl z-50 transform transition-transform duration-300 ${cartOpen ? 'translate-x-0' : 'translate-x-full'}`}
        style={{ boxShadow: '0 8px 32px 0 rgba(161,98,6,0.18)' }}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-yellow-200">
          <h3 className="text-2xl font-bold text-yellow-800">Your Cart</h3>
          <button className="text-2xl text-yellow-700 hover:text-yellow-900" onClick={() => setCartOpen(false)} title="Close Cart">×</button>
        </div>
        <div className="p-6 flex-1 flex flex-col">
          {cart.length === 0 ? (
            <div className="text-gray-500 text-center mt-10">Your cart is empty.</div>
          ) : (
            <>
              <ul className="mb-4 max-h-72 overflow-y-auto divide-y divide-yellow-100">
                {cart.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3 py-3">
                    <div className="w-10 h-10 rounded border bg-yellow-50 flex items-center justify-center text-xl">🛒</div>
                    <div className="flex-1">
                      <div className="font-semibold text-yellow-900">{item.name}</div>
                      <div className="flex items-center gap-2 mt-1">
                        <button
                          className="px-2 py-0.5 rounded bg-yellow-200 text-yellow-900 font-bold text-base hover:bg-yellow-300"
                          onClick={() => handleChangeQuantity(item.productId, -1)}
                          disabled={item.quantity <= 1}
                          title="Decrease quantity"
                        >-</button>
                        <span className="text-yellow-900 font-semibold">{item.quantity}</span>
                        <button
                          className="px-2 py-0.5 rounded bg-yellow-200 text-yellow-900 font-bold text-base hover:bg-yellow-300"
                          onClick={() => handleChangeQuantity(item.productId, 1)}
                          title="Increase quantity"
                        >+</button>
                        <button
                          className="ml-2 px-2 py-0.5 rounded bg-red-200 text-red-700 font-bold text-xs hover:bg-red-300"
                          onClick={() => handleRemoveFromCart(item.productId)}
                          title="Remove from cart"
                        >Remove</button>
                      </div>
                    </div>
                    <div className="font-bold text-green-700">${item.price}</div>
                  </li>
                ))}
              </ul>
              <div className="font-bold text-yellow-900 mb-4 text-lg">Total: ${cart.reduce((sum, i) => sum + i.price * i.quantity, 0).toFixed(2)}</div>
              <button className="animal-btn w-full" onClick={handleCheckout}>Checkout</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default StoreSection;
