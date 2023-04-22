import { Select, useColorModeValue } from '@chakra-ui/react';
import React from 'react';

export default function StyledSelect({ value, onChange, options, w, marginBottom, marginTop, paddingLeft }) {
    const _optionColor = useColorModeValue("#E6FFFA", "#1A202C");

    return (
        <Select
            value={value}
            onChange={onChange}
            w={w}
            marginBottom={marginBottom}
            marginTop={marginTop}
            paddingLeft={paddingLeft}
        >
            <option
                style={{ backgroundColor: _optionColor }}
                value={''}
                key="-1"
            >
                N/A
            </option>
            {options.length > 0 && options.map(option => {
                return (
                    <option
                        style={{ backgroundColor: _optionColor }}
                        value={option.value}
                        key={option.key}
                    >
                        {option.label}
                    </option>
                );
            })}
        </Select>
    );
}
