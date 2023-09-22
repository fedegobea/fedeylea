import React, { useRef, useState } from "react";
import {
  FaRegFolder,
  FaRegUserCircle,
  FaSearch,
} from "react-icons/fa/index.js";
import RSVPSearchListItem from "./components/RSVPSearchListItem";
import {db } from "../firebase/client";
import { collection, endAt, getDocs, orderBy, query, startAt, where } from "firebase/firestore";

export type SearchItem = {
  name: string;
};


const searchInFirebase = async (inputVal: string) => {

    const guestsRef = collection(db, "guests");

    // Create a query against the collection.
    const q = query(guestsRef, orderBy("name"), startAt(inputVal), endAt(inputVal + "\uf8ff"));
    const guests:SearchItem[] = []
    const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        guests.push(doc.data() as SearchItem);
    });
    console.log(guests);
    return guests;

};

const Search = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [searchResults, setSearchResults] = useState<SearchItem[]>([]);

  const onClickSearch = () => {
    const inputVal = inputRef.current!.value;
    
    searchInFirebase(inputVal).then(inputResult =>setSearchResults(inputResult));
    

    if (inputVal.length > 0) {
      const searchParams = new URLSearchParams(window.location.search);
      searchParams.set("q", inputVal);
      const newRelativePathQuery =
        window.location.pathname + "?" + searchParams.toString();
      history.pushState(null, "", newRelativePathQuery);
    } else {
      history.pushState(null, "", window.location.pathname);
    }
  }

  return (
    <section>

      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="col-span-full">
              <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">Busca tu nombre o apellido</label>
              <div className="mt-2 w-full">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                  <input type="text" ref={inputRef} name="name" id="name" autoComplete="name" className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 dark:text-white focus:ring-0 sm:text-sm sm:leading-6" placeholder="Federico " />
                </div>
              </div>
            </div>
            <div className="col-span-full">
              <button type="button" onClick={onClickSearch} className="btn btn-primary">Buscarme con mi nombre</button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col container  mt-10 mx-auto w-full items-center justify-center bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900 rounded border border-gray-400	">
        <ul className="flex flex-col divide-y w-full">
          {searchResults.map((result) => (<RSVPSearchListItem name={result.name} />))}
        </ul>
      </div>
    </section>
  );
};

export default Search;
