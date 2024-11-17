import styles from "@/styles/about.module.css";

export default function About() {
  return (
    <div className={styles.container}>
      <h1>About Us</h1>
      <p className={styles.desc}>
        Welcome to the official explorer for The New York Times Best Seller list
        explorer.{`\n`}We hope you enjoy your stay!
      </p>
    </div>
  );
}
