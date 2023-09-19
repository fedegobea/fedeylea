import 'react'
import { useState } from 'react'

export default function GuestNumber({maxGuests, guests}) {
    const [currentGuests, setCurrentGuests] = useState(guests)
    const handleSetGuests = (e)=>{
        const val = parseInt(e.target.value) 
        if (val > maxGuests) {
            return setCurrentGuests(maxGuests)
        }
        setCurrentGuests(val)
    }
    return <h4>Cupos <input className='[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none appearance-none border rounded w-14 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' value={currentGuests} type="number" onChange={handleSetGuests}/> / {maxGuests}</h4>
}