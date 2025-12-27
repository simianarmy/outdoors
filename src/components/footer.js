import React from 'react';
import { Link } from 'gatsby';
import pacakgeInfo from '../../package.json';

const ListLink = (props) => (
  <li className="inline-block mr-4">
    <Link className="hover:underline mb-0" to={props.to}>
      {props.children}
    </Link>
  </li>
);

const Footer = () => (
  <div className="h-16 bg-slate-400 flex justify-between w-full text-white items-center">
    <div className="ml-4 mr-4">
      <span className="text-sm">&copy; Simian Labs v{pacakgeInfo.version}</span>
    </div>
    <div className="justify-self-end">
      <ul>
        <ListLink to="/about/">About</ListLink>
        <ListLink to="/contact/">Contact</ListLink>
      </ul>
    </div>
  </div>
);

export default Footer;
