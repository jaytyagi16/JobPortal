import React, { useEffect, useState } from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'

const filterData = [
    {
        filterType: "Location",
        array: ["Delhi NCR", "Bangaluru", "Hyderabad", "Pune", "Mumbai"]
    },
    {
        filterType: "Industry",
        array: ["Frontend Developer", "Backend Developer", "Fullstack Developer"]
    },
    {
        filterType: "Salary",
        array: ["0-40k", "41-1 lakh", "1 lakh - 5 lakh"]
    },
]

const FilterCard = () => {

    const [selectedValue, setSelectedValue] = useState('');
    const dispatch = useDispatch();

    const changeHandler = (value) => {
        setSelectedValue(value);
    }

    // If selectedValue changes, update the search query in the store
    useEffect(() => {
        dispatch(setSearchedQuery(selectedValue));
    }, [selectedValue]);

  return (
    <div className='w-full p-3'>
        <h1 className='font-bold text-lg'>Filter Jobs</h1>
        <hr className='mt-3'/>
        <RadioGroup value={selectedValue} onValueChange={changeHandler}>
            {/* Add a "Show All" option to reset the filter */}
            <div className='flex items-center space-x-2 my-2'>
                <RadioGroupItem
                    value=""  // This is the reset value
                    id="reset"
                />
                <Label htmlFor="reset">Show All</Label>  
            </div>

            {
                filterData.map((data, index) => (
                    <div key={index}>
                        <h1 className='font-bold text-lg'>{data.filterType}</h1>
                        {
                            data.array.map((item, idx) => {
                                const itemId = `id${index}-${idx}`;

                                return (
                                    <div key={itemId} className='flex items-center space-x-2 my-2'>
                                        <RadioGroupItem
                                            value={item}
                                            id={itemId}
                                        />
                                        <Label htmlFor={itemId}>{item}</Label>  
                                    </div>
                                )
                            })
                        }
                    </div>
                ))
            }
        </RadioGroup>
    </div>
  )
}

export default FilterCard;