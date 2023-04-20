import React, { useState, Fragment, useEffect } from "react";
import "./Search&filter.css";

const Search = ({ dataForSearch, setFiltered }) => {
    const data = dataForSearch;
    const [searchTerm, setsearchTerm] = useState("");

    const handelClear = () => {
        setsearchTerm("")
        setFiltered(dataForSearch)
    }
    useEffect(() => {
        if (searchTerm !== "") {
            const searchedData = data?.filter(product => {
                const modelfilter = product.vehicleModel.toLowerCase().includes(searchTerm.toLowerCase())
                const productName = product.vehicleNumber.toLowerCase().includes(searchTerm.toLowerCase())
                const Locationfilter = product.seatingCapacity.toLowerCase().includes(searchTerm.toLowerCase())

                return productName || modelfilter || Locationfilter

            });
            setFiltered(searchedData)
        } else {
            setFiltered(data)
        }
        // eslint-disable-next-line
    }, [searchTerm]);

    return (
        <Fragment>
            <div className="searchBox" >
                <input
                    type="text"
                    placeholder="Search a product ..."
                    value={searchTerm}
                    onChange={(e) => setsearchTerm(e.target.value)}
                />
                <button onClick={() => handelClear()} >clear</button>
            </div>
        </Fragment>
    );
};

export default Search;
