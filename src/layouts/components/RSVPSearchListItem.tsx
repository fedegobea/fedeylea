import React from 'react';

type RSVPSearchListItemProps = {
    name: string;

}

export default ({name}:RSVPSearchListItemProps) => (
    <a href={`/rsvp/${name}`} >
    <li className="flex flex-row ">
      <div className="select-none cursor-pointer flex flex-1 items-center p-4">
       
        <div className="flex-1 pl-1">
          <div className="font-medium dark:text-white">{name}</div>
          {/* <div className="text-gray-600 dark:text-gray-200 text-sm">Developer</div> */}
        </div>
        <div className="flex flex-row justify-center">
          {/* <div className="text-gray-600 dark:text-gray-200 text-xs">6:00 AM</div> */}
          <button className="w-10 text-right flex justify-end">
            <svg width="20" fill="currentColor" height="20" className="hover:text-gray-800 dark:hover:text-white dark:text-gray-200 text-gray-500" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
              <path d="M1363 877l-742 742q-19 19-45 19t-45-19l-166-166q-19-19-19-45t19-45l531-531-531-531q-19-19-19-45t19-45l166-166q19-19 45-19t45 19l742 742q19 19 19 45t-19 45z"></path>
            </svg>
          </button>
        </div>
      </div>
    </li>
    </a>
  

)