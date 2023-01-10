import React from 'react'
import { Link } from 'react-router-dom';
import "./Link.scss"

interface link {
    linkTo  : string;
    children?: React.ReactElement | null | React.ReactElement[],
    type    : number
}

export const LinkButton = ({linkTo, children, type}:link) => {

  return (
    <Link 
      to={linkTo}
      className={`LinkButton${type}`}
    >
      {children}
    </Link>
  )
}
