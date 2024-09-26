import { v4 as uuidv4 } from "uuid";
import { readFromJsonFile, writeToJsonFile } from "../dal/access.js"
import bcrypt from "bcrypt"

import { Book, User } from "../models/types.js";
import {

  writeUsersToJsonFile,
} from "../dal/access.js";


export const createBeeper = async (userName: string,password: string): Promise<string> => {
  const users: User[] = await readFromJsonFile();
  const existingUser = users.find((u) => u.userName === userName);

  if (existingUser) {
    throw new Error("Username already exists.");
  }

  const hashedPassword = bcrypt.hashSync(password, 10);

  const newUserId: string = uuidv4();
  
  const newUser: User = {
    id: newUserId ,
    userName,
    password: hashedPassword,
    books: [],
  };

  await writeToJsonFile(newUser);
  return newUserId;
};



export const getBeepers = async (userId: string): Promise<Book[] | undefined> => {
  const users: User[] = await readFromJsonFile();
  const user = users.find((u) => u.id === userId);
  const books: Book[] | undefined = user?.books;

  if (!user) {
    throw new Error("Username already exists.");
  }
  if (books) {
    return books;
  }
};

export const getDetailsByID = async (
  userId: string,
  bookId: string,
  updatedData: string
): Promise<Book> => {
  const users: User[] = await readFromJsonFile();
  const userFind: User | undefined = users.find((u) => u.id === userId);

  if (!userFind) {
    throw new Error("Invalid username or password.");
  }
  const books: Book[] = userFind.books;
  const bookFind: Book | undefined = books.find((b) => b.id === bookId);

  if (!bookFind) {
    throw new Error("Invalid username or password.");
  }

  const updateBook: Book = {
    id: bookFind.id,
    title: updatedData,
    author: bookFind.author,
  };
  const index = books.findIndex((i) => i.id === bookFind.id);
  books[index] = updateBook;

  await writeUsersToJsonFile(users);
  return updateBook;
};

export const updateTheStatusOfBeeper = async (
  userId: string,
  bookId: string
): Promise<void> => {
  const users: User[] = await readFromJsonFile();
  const userFind: User | undefined = users.find((u) => u.id === userId);

  if (!userFind) {
    throw new Error("Invalid username or password.");
  }
  const books: Book[] = userFind.books;
  const bookFind: Book | undefined = books.find((b) => b.id === bookId);

  if (!bookFind) {
    throw new Error("Invalid username or password.");
  }

  const index = books.findIndex((i) => i.id === bookFind.id);
  books.splice(index, 1);

  await writeUsersToJsonFile(users);
};

export const deleteBeeperByID = async (bookName: string, userId: string): Promise<Book> => {
  const users: User[] = await readFromJsonFile();
  const userFind = users.find((u) => u.id === userId);

  if (!userFind) {
    throw new Error("Invalid username or password.");
  }
  const books: Book[] = userFind.books;

  const authorAPI: string = "API";

  const bookId: string = uuidv4();

  const newBook: Book = {
    id: bookId,
    title: bookName,
    author: authorAPI,
  };
  books.push(newBook);

  await writeUsersToJsonFile(users);
  return newBook;
};
export const getAllBeepersByStatus = async (bookName: string, userId: string): Promise<Book> => {
  const users: User[] = await readFromJsonFile();
  const userFind = users.find((u) => u.id === userId);

  if (!userFind) {
    throw new Error("Invalid username or password.");
  }
  const books: Book[] = userFind.books;

  const authorAPI: string = "API";

  const bookId: string = uuidv4();

  const newBook: Book = {
    id: bookId,
    title: bookName,
    author: authorAPI,
  };
  books.push(newBook);

  await writeUsersToJsonFile(users);
  return newBook;
};
