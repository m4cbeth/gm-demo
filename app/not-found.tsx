export default function NotFound() {
    return (
        <div
            style={{
                minHeight: "100vh",
                margin: 0,
                display: "flex",
                flexDirection: "column",
                background: "#fafafa",
                color: "#222",
                fontFamily: "ui-sans-serif, system-ui, sans-serif",
            }}
        >
            <main
                style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "2rem",
                    textAlign: "center",
                }}
            >
                <h1 style={{ fontSize: "4rem", fontWeight: 700, color: "#2563eb" }}>
                    404
                </h1>
                <h2
                    style={{
                        fontSize: "1.5rem",
                        fontWeight: 600,
                        marginBottom: "0.5rem",
                    }}
                >
                    {`This page is outside of the scope of this demo.`}
                </h2>
                <a
                    href="/"
                    style={{
                        display: "inline-block",
                        padding: "0.75rem 1.5rem",
                        background: "#2563eb",
                        color: "#fff",
                        borderRadius: "0.5rem",
                        fontWeight: 600,
                        textDecoration: "none",
                        boxShadow: "0 2px 8px rgba(37,99,235,0.09)",
                        transition: "background 0.15s",
                    }}
                >
                    Go back home
                </a>
            </main>
        </div>
    );
}
