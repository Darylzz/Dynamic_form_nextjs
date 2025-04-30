'use client';
import { useRouter, usePathname } from 'next/navigation';
import { Button } from 'primereact/button';

export default function LayoutComponent({ ...props }) {
  const { children } = props;
  const router = useRouter();
  const pathName = usePathname();

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
        <Button disabled={pathName === '/playground'} label='Playground' onClick={() => handleClickNavigate('playground')} />
        <Button disabled={pathName === '/login'} label='Login' onClick={() => handleClickNavigate('login')} />
      </div>
      <div className='p-3'>{children}</div>
    </>
  );
}
