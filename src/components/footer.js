import React from 'react';
import { Link } from 'gatsby';

const ListLink = (props) => (
  <li className="inline-block mr-4">
    <Link className="hover:underline mb-0" to={props.to}>
      {props.children}
    </Link>
  </li>
);

const Footer = () => (
  <div className="h-16 bg-slate-400 flex text-white justify-end items-center">
    <ul>
      <ListLink to="/about/">About</ListLink>
      <ListLink to="/contact/">Contact</ListLink>
    </ul>
  </div>
);

export default Footer;
