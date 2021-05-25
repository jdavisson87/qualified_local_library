// returns the account object that has the matching ID.
const findAccountById = (accounts, id) => {
  // return accounts.find(account=> account.id === id);

  return accounts.filter((account) => account.id === id)[0];
};

// returns a sorted array of objects. The objects are sorted alphabetically by last name
const sortAccountsByLastName = (accounts) => {
  return accounts.sort((account1, account2) =>
    account1.name.last < account2.name.last ? -1 : 1
  );
};

// 2 parameters: account object, books array
// returns a _number_ that represents the number of times the account's ID appears
// in any book's `borrow` array
const getTotalNumberOfBorrows = ({ id }, books) => {
  // variable for number of times account id appears
  let appearances = 0;

  // loop through the books array to look at each book
  books.forEach(({ borrows }) => {
    // loop through the borrows array to see if the account id shows up
    borrows.forEach((borrow) => {
      // Check if the borrow id and the account id match
      // and increment appearance variable when id is found
      if (borrow.id === id) {
        appearances++;
      }
    });
  });
  // return appearance variable
  return appearances;
};

// returns an array of books and authors that represents all books _currently
// checked out_ by the given account
// 3 parameters: account object, books array, authors array
const getBooksPossessedByAccount = ({ id }, books, authors) => {
  // create array for books currently checked out
  let checkedOut = [];
  // loop through the books array
  books.forEach((book) => {
    // loop through borrows array and see if any id's match the account
    book.borrows.forEach((borrow) => {
      // check to see if the book has been returned and if account id's match
      if (borrow.returned === false && borrow.id === id) {
        let { authorId } = book;
        // loop through authors to find the author of the book that was checked out
        const bookAuthor = authors.find((author) => author.id === authorId);
        // create a new object and spread the book and author into it
        let borrowedBook = { ...book };
        borrowedBook.author = bookAuthor;
        // push into the checked out books array
        checkedOut.push(borrowedBook);
      }
    });
  });

  //return checked out array
  return checkedOut;
};

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
