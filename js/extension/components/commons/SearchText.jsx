import React, { useState, useEffect } from "react";
import { FormControl } from "react-bootstrap";
import { isEmpty } from "lodash";

/**
 * Solution from
 * https://stackoverflow.com/questions/42217121/how-to-start-search-only-when-user-stops-typing
 */

export default function SearchText({
    search = () => {},
    className = "",
    style = {},
    placeholder = "",
    value,
    minLength = 3,
    onChange = () => {}
}) {
    const [searchTerm, setSearchTerm] = useState("");
    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            search(searchTerm);
        }, 800);

        return () => clearTimeout(delayDebounceFn);
    }, [searchTerm]);
    return (
        <FormControl
            autoFocus
            type="text"
            style={style}
            value={value}
            autoComplete="off"
            className={`docs-search-field ${className}`}
            placeholder={placeholder}
            onChange={(e) => {
                if (e.target.value.length >= minLength) {
                    setSearchTerm(e.target.value);   
                }
                onChange(e.target.value);
            }}
        />
    );
}
