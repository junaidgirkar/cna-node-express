import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import InventoryList from "../components/InventoryList";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8005/inventory";

type InventoryItem = {
    id: number;
    name: string;
    quantity: number;
    date: string;
};

const IndexPage = () => {
    const [inventory, setInventory] = useState<InventoryItem[]>([]);
    const [error, setError] = useState("");
    const [debugLog, setDebugLog] = useState("🔍 Fetching inventory...\n");

    useEffect(() => {
        console.log("🚀 Fetching inventory data from:", API_URL);
        setDebugLog(prev => prev + `🚀 Fetching inventory data from: ${API_URL}\n`);

        fetch(API_URL)
            .then((response) => response.json())
            .then((data) => {
                console.log("✅ API Response:", data);
                setDebugLog(prev => prev + `✅ API Response: ${JSON.stringify(data, null, 2)}\n`);

                if (!data.inventory || data.inventory.length === 0) {
                    console.warn("⚠️ API returned an empty inventory array!");
                    setDebugLog(prev => prev + `⚠️ API returned an empty inventory array!\n`);
                }

                setInventory(data.inventory);
            })
            .catch((err) => {
                console.error("❌ Fetch error:", err);
                setDebugLog(prev => prev + `❌ Fetch error: ${err.message}\n`);
                setError(err.message);
            });
    }, []);

    return (
        <Layout>
            <div className="page">
                <h1>📦 Inventory</h1>
                {error && <p style={{ color: "red", fontWeight: "bold" }}>⚠️ Error: {error}</p>}
                <main>
                    {inventory.length > 0 ? <InventoryList inventory={inventory} /> : (
                        <p style={{ color: "red", fontWeight: "bold" }}>⚠️ No inventory data available.</p>
                    )}
                </main>
                <div style={{ background: "#ddd", padding: "10px", marginTop: "20px", fontSize: "14px" }}>
                    <h2>🛠 Debug Logs</h2>
                    <pre>{debugLog}</pre>
                </div>
            </div>
        </Layout>
    );
};

export default IndexPage;
