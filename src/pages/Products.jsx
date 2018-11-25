import React from 'react'
import Helmet from 'react-helmet'

import { productsTitle } from '../css/Products'

export default function Products() {
  return (
    <main>
      <Helmet title='Products.jsx' />  
      <h1 className={productsTitle}>
        Hello I'm Tonatiuh!!!
      </h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste rem illum quibusdam ea, consequatur omnis neque praesentium harum unde obcaecati asperiores ratione eligendi, libero aperiam reiciendis perferendis ut, amet quo?
      </p>
    </main>
  )
}