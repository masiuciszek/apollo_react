import React from "react"
import { Shoe } from "@utils/types"
import Image from "next/image"
import styled from "@emotion/styled"
import { css, cx } from "@emotion/css"
import Link from "next/link"
import { Button } from "@components/styles/button"
interface ProductItemProps {
  shoe: Shoe
}

const StyledProductItem = styled.li`
  box-shadow: var(--sh-l);
  border-radius: var(--border-radius-m);
  border: 2px solid var(--stroke);

  img {
    transition: var(--transition-s);
    opacity: 0.9;
    z-index: 2;
    &:hover {
      transform: scale(1.1);
      opacity: 1;
    }
  }
`

const bodyStyles = css`
  padding: 1rem;
  h4 {
    position: relative;
    display: inline-block;
    &::before {
      content: "";
      top: -1px;
      left: 0;
      height: 0.4rem;
      background-color: var(--highlight);
      width: 100%;
      position: absolute;
      transform: skewX(10deg) skewY(2deg);
    }
    &::after {
      content: "";
      bottom: -3px;
      left: 0;
      height: 0.4rem;
      background-color: var(--highlight);
      width: 100%;
      position: absolute;
      transform: skewX(10deg) skewY(2deg);
    }
  }
  p {
    font-size: 1.5em;
  }
`

const ProductItem: React.FC<ProductItemProps> = ({ shoe }): JSX.Element => {
  return (
    <StyledProductItem>
      <Link href="/">
        <a>
          <Image
            className="foo"
            src={shoe.image}
            alt={`${shoe.title}-shoe`}
            width={1000}
            height={1000}
          />
        </a>
      </Link>
      <div className={cx(bodyStyles, "body")}>
        <h4>{shoe.title}</h4>
        <p>{shoe.price}$</p>
        <p>{shoe.description}</p>
        <Button type="button">add to cart</Button>
      </div>
    </StyledProductItem>
  )
}
export default ProductItem
