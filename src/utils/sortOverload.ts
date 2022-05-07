import quickSort, { defaultCompareFn, TCompareFn } from './quicksort';

export function sortOverload() {
  // eslint-disable-next-line no-extend-native
  Array.prototype.sort = function sortClone<T>(compareFn: TCompareFn = defaultCompareFn): T[] {
    return quickSort(this, compareFn);
  };
}
