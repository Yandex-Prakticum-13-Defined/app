// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TCompareFn = (a: any, b: any) => number;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function defaultCompareFn(a: any, b: any): -1 | 0 | 1 {
  if (a < b) {
    return -1;
  }

  if (a > b) {
    return 1;
  }

  return 0;
}

function quickSort<T>(arr: T[], compareFn: TCompareFn = defaultCompareFn): T[] {
  function recursiveSort(start: number, end: number) {
    if (end <= start) {
      return;
    }

    const pivotValue = arr[end];
    let pivotIndex = start;

    for (let i = start; i < end; i++) {
      const comparisonResult = compareFn(arr[i], pivotValue);

      if (comparisonResult < 0) {
        if (pivotIndex !== i) {
          swap(arr, i, pivotIndex);
        }

        pivotIndex++;
      }
    }

    arr[end] = arr[pivotIndex];
    arr[pivotIndex] = pivotValue;

    recursiveSort(start, pivotIndex - 1);
    recursiveSort(pivotIndex + 1, end);
  }

  recursiveSort(0, arr.length - 1);

  return arr;
}

function swap<T>(arr: T[], i: number, pivotIndex: number) {
  const temp = arr[pivotIndex];
  arr[pivotIndex] = arr[i];
  arr[i] = temp;
}

export default quickSort;
