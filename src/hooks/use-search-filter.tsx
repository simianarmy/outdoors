import React from "react";

interface ListItem {
  node: {
    body: string,
    frontmatter: {
      title: string,
      tags: string
    }
  }
};

export default function useSearchFilter(initialList: ListItem[]) {
  const [items, setItems] = React.useState(initialList);
  const [filterText, setFilterText] = React.useState('');

  const filter = (fn, item: string): void => {
    const term = item.toLowerCase();
    let regex;

    try {
      regex = new RegExp(`\\w*${term}\\w*`, 'mi');
    } catch (e) {
      console.warn('illegal regex input', e);
      return;
    }

    const filteredItems = initialList.filter(fn(regex));
    setItems(filteredItems);
    setFilterText(item);
  };

  const textFilterFn = (regex: RegExp) => ({node: { body, frontmatter: { title }}}: ListItem) => regex.test(title) || regex.test(body);
  const filterByText = (item: string) => filter(textFilterFn, item);

  const tagFilterFn = (regex: RegExp) => ({node: { frontmatter: { tags }}}: ListItem) => regex.test(tags);
  const filterByTag = (item: string) => filter(tagFilterFn, item);

  return [items, filterText, filterByText, filterByTag];
}
