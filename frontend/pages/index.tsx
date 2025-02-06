import { useEffect, useState } from 'react';

export default function Home() {
    const [inventory, setInventory] = useState([]);  // ✅ Default as empty array
    const [error, setError] = useState("");

    useEffect(() => {
        fetch('http://localhost:8005/inventory')
            .then(response => response.json())
            .then(data => {
                console.log("🔍 Fetched Inventory Data:", data);  // ✅ Debugging log

                // ✅ Extract the inventory array
                if (data.inventory && Array.isArray(data.inventory)) {
                    setInventory(data.inventory);
                } else {
                    console.error("❌ Expected an array but got:", data);
                    setInventory([]);  // Fallback to empty array
                }
            })
            .catch(error => {
                console.error("🚨 Fetch error:", error);
                setError("Failed to load inventory.");
            });
    }, []);

    if (error) return <p style={{ color: "red" }}>❌ {error}</p>;

    return (
        <div>
            <h1>📦 Inventory List</h1>
            {inventory.length === 0 ? (
                <p style={{ color: "red", fontWeight: "bold" }}>⚠️ No inventory data available.</p>
            ) : (
                <ul>
                    {inventory.map((item) => (
                        <li key={item.id}>{item.name} - {item.quantity}</li>
                    ))}
                </ul>
            )}
        </div>
    );
}
