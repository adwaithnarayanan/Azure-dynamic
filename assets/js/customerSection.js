class Customers {
  _data;

  render(data) {
    this._data = data;

    console.log(this._data);
  }
}

export default new Customers();
