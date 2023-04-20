import React, { useState } from 'react'
import { FcClearFilters } from 'react-icons/fc';
import "./Search&filter.css";

const Filters = ({ AllProducts, setFiltered }) => {

    const [setSearchAval] = useState("");
    const [FilterByPrice, setFilterByPrice] = useState('')

    const filterbyFilterByPrice = async (value) => {
        const v = value.split('-')
        let Min = parseInt(v[0]);
        let Max = parseInt(v[1]) || Number.MAX_VALUE;
        setFilterByPrice(value)

        if (value === "select") return setFiltered(AllProducts)
        const filterByPrice = AllProducts?.filter((item) => {
            const itemVal = parseInt(item.rentPerDay)
            console.log(`itemVal: ${itemVal}, Min: ${Min}, Max: ${Max}`);
            return itemVal >= Min && itemVal <= Max;
        })
        setFiltered(filterByPrice)
    }


    const filterbyAvailability = async (value) => {
        const availabilityFilter = AllProducts?.filter((item) => {
            return item.Availability?.toLowerCase() === (value?.toLowerCase());
        })
        setFiltered(availabilityFilter)
    }


    const handelClear = () => {
        setSearchAval("")
        setFiltered(AllProducts)
        setFilterByPrice("select")
    }
    return (

        <div className='filter '>
            <div className="hovertext">clear Filter</div>
            <button onClick={handelClear} className="clear_filter">
                <FcClearFilters style={{ fontSize: "2rem" }} />
            </button>
            <h3>Find product for you</h3>
            <div className='filter_form'>
                <div className='filter_field'>
                    <label >Filter by price:</label>
                    <select className="form-control" value={FilterByPrice}
                        onChange={(a) => filterbyFilterByPrice(a.target.value)}>
                        <option value="select">select</option>
                        <option value="0-20">0-20</option>
                        <option value="21-50">21-50</option>
                        <option value="51-100">51-100</option>
                        <option value="100">more than 100</option>
                    </select>
                </div>

                <div className='filter_field'>
                    <label>Avilablity:</label>
                    <section className='radioSection'>
                        <input type={"radio"} id="1" name="avail" value={"Available"} onChange={(a) => filterbyAvailability(a?.target.value)} placeholder="search by model name" />
                        <label>Available</label>
                    </section>
                    <section className='radioSection'>
                        <input type={"radio"} id="2" name="avail" value={"Not Available"} onChange={(a) => filterbyAvailability(a?.target.value)} placeholder="search by model name" />
                        <label> Not available</label>
                    </section>
                </div>

            </div>
        </div>
    )
}

export default Filters

