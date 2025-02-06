import { ReactNode } from "react";

type LayoutProps = {
    children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
    return (
        <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
            <header style={{ background: "#0070f3", padding: "10px", color: "white", textAlign: "center" }}>
                <h1>Inventory Management</h1>
            </header>
            <main>{children}</main>
            <footer style={{ marginTop: "20px", textAlign: "center", fontSize: "12px" }}>
                <p>© 2025 Inventory System</p>
            </footer>
        </div>
    );
};

export default Layout;
