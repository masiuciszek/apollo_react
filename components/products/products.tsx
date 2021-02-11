import React from "react"
import products from "@data/products.json"
import { Shoe } from "@utils/types"
import styled from "@emotion/styled"
import ProductItem from "./product-item"
import { above } from "@utils/media-query"

const ProductsGrid = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));

  grid-gap: 20px;
  padding: 1rem;
  @media ${above.tabletL} {
    li:nth-of-type(1) {
      grid-column: 1/3;

      .body {
        display: flex;
        flex-direction: column;
        align-items: center;
      }
    }
  }
`
export const Products = (): JSX.Element => {
  const shoesData = products as Array<Shoe>

  return (
    <ProductsGrid>
      {shoesData.map(shoe => (
        <ProductItem key={shoe.id} shoe={shoe} />
      ))}
    </ProductsGrid>
  )
}
