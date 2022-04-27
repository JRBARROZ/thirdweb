import React from 'react'
import Intro from './Intro'
interface ILayoutProps {
  children: React.ReactNode
}
export default function Layout({ children } : ILayoutProps) {
  return (
    <>
      <Intro />
      <main>{children}</main>
    </>
  )
}