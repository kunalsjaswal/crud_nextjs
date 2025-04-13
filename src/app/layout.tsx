import Navbar from "@/components/Navbar";
import styles from "./layout.module.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className={styles.container}>
          <header className={styles.header}>
            <Navbar/>
          </header>
          <section className={styles.content}>
            {children}
          </section>
        </div>
      </body>
    </html>
  );
}
