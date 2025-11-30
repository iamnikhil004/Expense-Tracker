export class Heap {
  constructor(compare) {
    this.arr = [];
    this.compare = compare || ((a, b) => a - b); // max-heap by default
  }
  size() { return this.arr.length; }
  peek() { return this.arr[0]; }
  push(val) {
    this.arr.push(val);
    this._siftUp(this.arr.length - 1);
  }
  pop() {
    if (!this.arr.length) return null;
    const top = this.arr[0];
    const last = this.arr.pop();
    if (this.arr.length) {
      this.arr[0] = last;
      this._siftDown(0);
    }
    return top;
  }
  _siftUp(i) {
    const a = this.arr, c = this.compare;
    while (i > 0) {
      const p = Math.floor((i - 1) / 2);
      if (c(a[i], a[p]) <= 0) break;
      [a[i], a[p]] = [a[p], a[i]];
      i = p;
    }
  }
  _siftDown(i) {
    const a = this.arr, c = this.compare;
    while (true) {
      let l = 2 * i + 1, r = 2 * i + 2, largest = i;
      if (l < a.length && c(a[l], a[largest]) > 0) largest = l;
      if (r < a.length && c(a[r], a[largest]) > 0) largest = r;
      if (largest === i) break;
      [a[i], a[largest]] = [a[largest], a[i]];
      i = largest;
    }
  }
}
