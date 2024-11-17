import Link from "next/link";
import styles from "@/styles/home.module.css";

export interface Category {
  list_name: string;
  list_name_encoded: string;
}

async function getCategoryList() {
  const response = await fetch(
    "https://books-api.nomadcoders.workers.dev/lists",
    { next: { revalidate: 3600 } }
  );
  const data = await response.json();

  return data.results;
}

export default async function Home() {
  const categoryList: Category[] = await getCategoryList();

  return (
    <div className={styles.container}>
      <span className={styles.title}>
        The New York Times Best Seller Explorer
      </span>
      <ul className={styles.list}>
        {categoryList.map((category) => (
          <li key={category.list_name} className={styles.category}>
            <Link href={`/list/${category.list_name_encoded}`}>
              {category.list_name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
