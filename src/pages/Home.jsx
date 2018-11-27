import React from 'react'
import Helmet from 'react-helmet'
import universal from 'react-universal-component'

export default function Home() {
  // Since it's highly probable to link an user to '/products', we prefetch the file
  universal(import('./Products')).preload()

  return (
    <main>
      <Helmet title='Home.jsx' />
      <h1>Home.js ohh YEAH!!! ma, haouse</h1>
    </main>
  )
}