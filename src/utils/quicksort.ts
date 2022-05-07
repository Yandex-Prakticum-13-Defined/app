export type TCompareFn<T extends string | number> = (a: T, b: T) => number;

export function defaultCompareFn<T extends string | number>(a: T, b: T): -1 | 0 | 1 {
  if (a < b) {
    return -1;
  }

  if (a > b) {
    return 1;
  }

  return 0;
}

function quickSort<T>(arr: T[], compareFn: TCompareFn<string | number> = defaultCompareFn): T[] {
  function recursiveSort(start: number, end: number) {
    if (end <= start) {
      return;
    }

    const pivotValue = arr[end];
    let pivotIndex = start;

    for (let i = start; i < end; i++) {
      const comparisonResult = compareFn(
        arr[i] as unknown as string | number,
        pivotValue as unknown as string | number
      );

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
