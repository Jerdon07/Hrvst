export default function ApprovedList({ farmers = [] }) {
    if (!Array.isArray(farmers)) farmers = [];

    return (
        <div>
            <h2>Approved Farmers</h2>

            {farmers.length === 0 ? (
                <p>No approved farmers found.</p>
            ) : (
                <ul>
                    {farmers.map((farmer) => (
                        <li key={farmer.id}>
                            {farmer.name} — {farmer.status}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
