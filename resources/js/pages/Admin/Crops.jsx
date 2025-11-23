import { router } from "@inertiajs/react";

export default function FarmersApproval({ farmers }) {
    const approveAll = () => {
        router.post(`/admin/farmers/approve-all`);
    };

    const approve = (id) => {
        router.post(`/admin/farmers/${id}/approve`);
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Pending Farmers</h1>

            <button
                onClick={approveAll}
                className="bg-green-700 text-white px-4 py-2 rounded mb-4"
            > Approve All
            </button>

            <table className="w-full text-left border">
                <thead>
                    <tr className="border-b">
                        <th className="p-2">ID</th>
                        <th className="p-2">Name</th>
                        <th className="p-2">Email</th>
                        <th className="p-2">Action</th>
                    </tr>
                </thead>

                <tbody>
                    {farmers.map((farmer) => (
                        <tr key={farmer.id} className="border-b">
                            <td className="p-2">{farmer.id}</td>
                            <td className="p-2">{farmer.name}.</td>
                            <td className="p-2">{farmer.email}.</td>

                            <td className="p-2">
                                <button
                                    onClick={() => approve(farmer.id)}
                                    className="bg-blue-700 text-white px-3 py-1 rounded"
                                > Approve
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}