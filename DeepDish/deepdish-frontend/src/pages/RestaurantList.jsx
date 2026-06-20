const restaurants = [{ id: 1, name: "Pizza Hut", rating: 4.5 }, { id: 2, name: "Burger King", rating: 4.2 }];

export default function RestaurantList() {
  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Popular Restaurants</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {restaurants.map(r => (
          <div key={r.id} className="bg-neutral-900 p-6 rounded-xl border border-neutral-800">
            <h3 className="text-xl font-bold">{r.name}</h3>
            <p className="text-orange-500">Rating: {r.rating} ⭐</p>
            <button className="mt-4 bg-neutral-800 px-4 py-2 rounded-lg">View Menu</button>
          </div>
        ))}
      </div>
    </div>
  );
}