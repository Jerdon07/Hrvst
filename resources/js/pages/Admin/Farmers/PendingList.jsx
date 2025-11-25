export default function PendingList({ farmers }) {
    return (
        <section>
            <h2 className="text-2xl font-bold mb-3">Pending Farmers</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {farmers.data.map(farmer => (
                    <div key={farmer.id} className="bg-yellow-50 p-4 shadow rounded-lg border">
                        <p className="font-bold">{farmer.user.name}</p>
                        <p className="text-sm text-gray-600">
                            {farmer.municipality?.name}, {farmer.barangay?.name}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}
