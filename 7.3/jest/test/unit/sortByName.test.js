const sorting = require("../../app");

describe("Books names test", () => {
  it("1", () => {
    let books = ["Властелин Колец", "Гарри Поттер", "Питер Пэн"];
    let expected = ["Властелин Колец", "Гарри Поттер", "Питер Пэн"];
    expect(sorting.sortByName(books)).toEqual(expected);
  });
  it("2", () => {
    let books = [
      "Властелин Колец",
      "Гарри Поттер",
      "Властелин Колец",
      "Гарри Поттер",
    ];
    let expected = [
      "Волшебник изумрудного города",
      "Питер Пэн",
      "Властелин Колец",
      "Гарри Поттер",
    ];
    expect(sorting.sortByName(books)).not.toEqual(expected);
  });
  it("3", () => {
    let books = ["UFC12"];
    let expected = ["UFC2"];
    expect(sorting.sortByName(books)).toEqual(expected);
  });
});
