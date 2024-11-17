import Link from "next/link";
import Image from "next/image";
import styles from "@/styles/list.module.css";

export interface Book {
  rank: number;
  rank_last_week: number;
  publisher: string;
  title: string;
  author: string;
  weeks_on_list: number;
  amazon_product_url: string;
  book_image: string;
  description: string;
}

export interface BookList {
  name: string;
  books: Book[];
  display_name: string;
  list_name: string;
  list_name_encoded: string;
}

async function getBookList(name: string) {
  const response = await fetch(
    `https://books-api.nomadcoders.workers.dev/list?name=${name}`,
    { next: { revalidate: 3600 } }
  );
  const data = await response.json();

  return data.results;
}

export default async function Detail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const bookList: BookList = await getBookList(id);

  return (
    <div className={styles.container}>
      <span className={styles.title}> {`${bookList.display_name} Books`}</span>
      <div className={styles.list}>
        {bookList.books.map((book, index) => (
          <div key={index} className={styles.item}>
            <Image
              src={book.book_image}
              alt={book.title}
              width={200}
              height={300}
            />
            <h2>{book.title}</h2>
            <p>{book.author}</p>
            <Link href={book.amazon_product_url} target="_blank">
              Buy Now
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
