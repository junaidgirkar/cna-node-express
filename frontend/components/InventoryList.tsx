type InventoryItem = {
    id: number;
    name: string;
    quantity: number;
    date: string;
};

type InventoryListProps = {
    inventory: InventoryItem[];
};

const InventoryList = ({ inventory }: InventoryListProps) => {
    return (
        <ul>
            {inventory.map((item) => (
                <li key={item.id}>
                    <strong>{item.name}</strong> - Quantity: {item.quantity} (Added on {new Date(item.date).toLocaleDateString()})
                </li>
            ))}
        </ul>
    );
};

export default InventoryList;
