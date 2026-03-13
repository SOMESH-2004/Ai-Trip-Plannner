import Header from '@/_components/Header';
import React from 'react'

function Provider( {
 children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='pt-12'>
      <Header />
      {children}
    </div>
  )
}

export default Provider
