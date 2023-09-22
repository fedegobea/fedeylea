import 'react'
import { useEffect, useReducer, useRef, useState } from 'react'

export default function GuestNumber({maxGuests, guests}) {
    const [currentGuests, setCurrentGuests] = useState(guests || maxGuests)
    const inputRef = useRef(null)
    const handleSetGuests = (e)=>{
        const val = parseInt(e.target.value) 
        if (val < 0) {
            return setCurrentGuests(0)
        }
        if (val > maxGuests) {
            return setCurrentGuests(maxGuests)
        }
        setCurrentGuests(val)
    }
    useEffect(()=>{
        const changeGuests = new CustomEvent("onChangeGuests", {
            bubbles: true,
            detail: { guests: currentGuests },
          });
          inputRef.current.dispatchEvent(changeGuests);
    },[currentGuests])
    return <h4>Cupos <input ref={inputRef} className='[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none appearance-none border rounded w-11 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' value={currentGuests} type="number" onChange={handleSetGuests}/> / {maxGuests}</h4>
}