import { useRouter } from 'next/router';
import React, { useState } from 'react'
import styles from './styles.module.css'
import Link from 'next/link';


const photo = ({ data }) => {

  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter();
  console.log(router.query);
  console.log(data);

  if(isLoading) return <p id={styles.loading}>Loading...</p>

  return (
    <div className={styles.section}>
      <div className={styles.back}>
        <Link href={"/"}>
          <button type='button' onClick={() => {
            setIsLoading(true)
          }}>Main Page</button>
        </Link>
      </div> <br />
      <div className={styles.main}>
        <p>ID Number: {data?.id}</p> <br />
        <p>Album ID : {data?.albumId}</p> <br />
        <img src={data?.url} /> <br />
        <p>Description: {data?.title}</p>
      </div>
    </div>
  )
}

export default photo;

export const getServerSideProps = async (context) => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/photos/${context.params.id}`);
  const photoData = await res.json();

  return {
    props: {
      data: photoData
    }
  }
}