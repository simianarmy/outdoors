import React from "react";
import { Link } from 'gatsby';

interface NavProps {
  thruhikes: {
    node: {
      uid: string,
      data: {
        nav_title: string
      }
    }
  }[];
  onFilter(s: string): void;
};

const FilterTags = ['washington', 'california', 'alpine', 'climb'];

export default function Nav({onFilter, thruhikes}: NavProps) {
  return (
    <>
      <h1 className="text-xl">Thru-Hikes</h1>
      <nav className="mt-4 flex flex-row sm:flex-col">
        {thruhikes.map(({ node }) => (
          <div
            className="mr-4 text-sm sm:m-0 sm:text-base"
            key={node.uid}
          >
            <Link
              className="text-blue-600 hover:underline"
              to={`/${node.uid}`}
            >
              {node.data.nav_title}
            </Link>
          </div>
        ))}
      </nav>
      <div className="hidden sm:block">
        <h1 className="mt-8 text-xl">Filters</h1>
        <nav className="mt-4 flex flex-row sm:flex-col">
          <ul>
            {FilterTags.map(tag => (
              <li key={`${tag}`} className="mb-1">
                <button className="text-sm hover:underline" onClick={() => onFilter(tag)}>
                  {tag}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
}
