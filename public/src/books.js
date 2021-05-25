// returns the author object that has the matching ID
// 2 parameters: authors array and a single id
const findAuthorById = (authors, id) => {
  // loop through authors array to find a matching id
  return authors.find((author) => author.id === id);
};

// returns the book object that has the matching ID
// 2 parameters: book array and single id
const findBookById = (books, id) => {
  // loop through the books array to find a matching id
  return books.find((book) => book.id === id);
};

// returns an array with two arrays inside of it.
// All of the inputted books are present in either the first or second array
// 1 parameter: array of books
const partitionBooksByBorrowedStatus = (books) => {
  // create 2 empty arrays, one for books that have been loaned out, and are not yet returned
  let loanedBooks = [];
  // the second array is for books that have been returned
  let returnedBooks = [];
  // loop through every book.
  books.forEach((book) => {
    // create a variable to determine if the book is out or returned
    let checkedOutStatus = true;
    // loop through the borrowed property array
    book.borrows.forEach((borrow) => {
      if (!borrow.returned) {
        // if borrow.returned is false, change checkedOutStatus to false
        checkedOutStatus = false;
      }
    });
    // if checkedOutStatus is false, push to loanedBooks array
    // if checkedOutStatus is true, push to returnedBooks array
    checkedOutStatus ? returnedBooks.push(book) : loanedBooks.push(book);
  });
  // return a new created array, that contains the 2 created arrays
  return [loanedBooks, returnedBooks];
};

// return an array of all the transactions from the book's `borrows` key
// each transaction should include the related account information and the `returned` key
// 2 parameters: a book object, and an array of accounts
const getBorrowersForBook = (book, accounts) => {
  // create empty array for borrowers
  let borrowers = [];
  // access the book's borrowed array values
  const { borrows } = book;
  // loop through each item in borrowed array
  borrows.forEach((borrow) => {
    // create a variable that contains the returned value
    const { id, returned } = borrow;
    // find account that borrowed the book
    // create an object that contains the account information and the returned value
    const borrowedAccount = accounts.find((account) => account.id === id);
    borrowedAccount.returned = returned;
    // push to borrowers array
    borrowers.push(borrowedAccount);
  });
  //return borrowers array
  return borrowers.length > 10 ? borrowers.slice(0, 10) : borrowers;
};

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
