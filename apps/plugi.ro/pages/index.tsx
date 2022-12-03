import styles from './index.module.css';

export function Index({ categories }) {
  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./index.css file.
   */
  return (
    <div className={styles.page}>
      <div className="wrapper">
        <div className="container">
          <div id="welcome">
            <h1>
              <span> Hello there, </span>
              Welcome plugi.ro 👋
            </h1>
          </div>
          {categories.map((category) => (
            <p key={category.id}>{category.attributes.title}</p>
          ))}
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const myHeaders = new Headers();
  myHeaders.append('Authorization', `Bearer ${process.env.TOKEN}`);

  const requestOptions = {
    headers: myHeaders,
  };

  const res = await fetch(`${process.env.EDIN_API}/categories`, requestOptions);
  // // The return value is *not* serialized
  // // You can return Date, Map, Set, etc.

  // // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }

  //return res.json();
  const data = await res.json();
  return {
    props: {
      categories: data.data,
    }, // will be passed to the page component as props
  };
}

export default Index;
