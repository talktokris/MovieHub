import _ from "lodash";

export function paginate(items, pageNumber, pageZize) {
  const startIndex = (pageNumber - 1) * pageZize;
  //console.log("Page Start Index: " + startIndex);
  return _(items).slice(startIndex).take(pageZize).value();

  // _.slice(items, startIndex)
  // _.take(pageSize)
}
