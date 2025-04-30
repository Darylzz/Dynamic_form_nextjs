'use client';
import { useRouter } from 'next/navigation';
import { Button } from 'primereact/button';

export default function Home() {
  const router = useRouter();

  return (
    <>
      <div className='p-3'>Home</div>
    </>
  );
}
