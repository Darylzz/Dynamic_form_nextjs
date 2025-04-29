'use client';
import { useRouter } from 'next/navigation';
import { Button } from 'primereact/button';

export default function Home() {
  const router = useRouter();

  const handleClickNavigate = (key: string) => {
    if (key === 'playground') {
      router.push('/playground');
    } else {
      router.push('login');
    }
  };
  return (
    <>
      <div className='flex gap-3 p-3'>
        <Button label='Playground' onClick={() => handleClickNavigate('playground')} />
        <Button label='Login' onClick={() => handleClickNavigate('login')} />
      </div>
    </>
  );
}
