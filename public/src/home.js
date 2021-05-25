// returns a number that represents the number of book objects inside of the array
// 1 parameter: books array
const getTotalBooksCount = (books = []) => books.length;

//returns a number that represents the number of account objects inside of the array.
// 1 parameter: accounts array
const getTotalAccountsCount = (accounts = []) => accounts.length;

// returns a number that represents the number of books
// that are currently checked out of the library
// 1 parameter: books array
const getBooksBorrowedCount = (books) => {
  // create variable for books that are currently checked out
  let checkedOut = 0;
  // loop through each book
  books.forEach(({ borrows }) => {
    // go through all the borrowed values. If one of the returned values is false,
    // increment checkedOut variable
    borrows.forEach((borrow) => {
      if (!borrow.returned) checkedOut++;
    });
  });
  // return checkedOut variable
  return checkedOut;
};

// HELPER FUNCTION for the next 3 functions
// formats object into a top 5 sorted array
const formatCountArray = (countedObject) => {
  let result = [];
  // create an array and match the key and value pairs as {name: genre, count: number}

  let titleList = Object.keys(countedObject);

  // titleList.forEach((title) => {
  //   let formattedPairs = {};
  //   formattedPairs.name = title;
  //   formattedPairs.count = countedObject[title];
  //   result.push(formattedPairs);
  // });

  result = titleList.map((title) => {
    let formattedPairs = {};
    formattedPairs.name = title;
    formattedPairs.count = countedObject[title];
    return formattedPairs;
  });

  // sort array by count
  result.sort((formatA, formatB) => formatB.count - formatA.count);
  // if the array's length is over 5, only return 5 objects within the array. if 5 or under,
  // return array
  return result.length > 5 ? result.slice(0, 5) : result;
};

// returns an array containing five objects or fewer that represents the
// most common occurring genres, ordered from most common to least
// 1 parameter: books array
const getMostCommonGenres = (books) => {
  // create an empty object that will store genres and count
  let genreAndCount = {};
  // loop through the books array.  If the genre object does not have the book genre in it,
  books.forEach((book) => {
    // create new key with a value of 1
    // If genre object does have the book genre as a key, increment value by 1
    genreAndCount[book.genre]
      ? genreAndCount[book.genre]++
      : (genreAndCount[book.genre] = 1);
  });
  return formatCountArray(genreAndCount);
};

// returns an array containing five objects or fewer that represents the most popular books in the library
//1 parameter: books array
const getMostPopularBooks = (books) => {
  // create an empty object that will store popular books and count
  let popularityAndCount = {};
  books.forEach((book) => {
    popularityAndCount[book.title] = book.borrows.length;
  });
  return formatCountArray(popularityAndCount);
};

// returns an array containing five objects or fewer that represents the most popular authors whose books
// have been checked out the most
// 2 parameters: books array and authors array
const getMostPopularAuthors = (books, authors) => {
  // create empty object that will store authors and checked out books
  let popularAuthor = {};
  // loop through books and find the author
  books.forEach((book) => {
    // create a variable for how many times the book has been checked out

    //const checkedOut = book.borrows.length;

    const checkedOut = book.borrows.reduce((prev) => prev + 1, 0);

    // create variable for the author
    const authorProfile = authors.find((author) => book.authorId === author.id);
    const authorName = `${authorProfile.name.first} ${authorProfile.name.last}`;
    // figure out if popularAuthor object contains an author name key. if so, add to the count.  if not, create
    // an author name key
    popularAuthor[authorName]
      ? (popularAuthor[authorName] += checkedOut)
      : (popularAuthor[authorName] = checkedOut);
  });

  //return formatCountArray and pass in the popularAuthor object
  return formatCountArray(popularAuthor);
};

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
