export class Paging {
  constructor(page, size, unit) {
    this.page = page;
    this.size = size;
    this.pageTmp = page;
    this.currentSize = size;
    this.num = page;
    this.cur = this.getCurrent();
    this.total = page;
    this.unit = unit || "";
  }

  calCurrentSize() {
    var res = this.size;
    if (this.page < 1 || this.page > this.num) {
      res = 0;
    } else if (this.page === this.num) {
      res = this.total % this.size;
    } else {
      res = this.size;
    }
    this.currentSize = res;
    return res;
  }

  calNum(total) {
    this.num = parseInt(total / this.size + (total % this.size ? 1 : 0)) || 1;
    this.total = total;
    this.calCurrentSize();
    return this.num;
  }

  getCurrent() {
    this.cur = (parseInt(this.page) - 1) * this.size;
    return this.cur;
  }

  firstPage() {
    this.page = 1;
    this.cur = this.getCurrent();
    return this.cur;
  }

  lastPage() {
    this.page = this.num;
    this.cur = this.getCurrent();
    return this.cur;
  }

  nextPage() {
    if (this.num === -1)
      this.num = this.page;
    this.page = Math.min(parseInt(this.page) + 1, this.num);
    this.cur = this.getCurrent();
    return this.cur;
  }

  prevPage() {
    this.page = Math.max(parseInt(this.page) - 1, 1);
    this.cur = this.getCurrent();
    return this.cur;
  }

  setPage(page) {
    page = ~~page;
    var res = false;
    if (page === 1 || (page <= this.num && page > 0)) {
      res = true;
      this.page = page;
      this.cur = this.getCurrent();
    }
    return res;
  }

  isFirst() {
    return this.page == 1;
  }

  isLast() {
    return this.page == this.num;
  }
}
