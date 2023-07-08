import React from 'react';

export default function BreastRowTabPanel({ leftBreastTime, rightBreastTime }) {
    return (
        <div>
            <div>{leftBreastTime}</div>
            <div>{rightBreastTime}</div>
        </div>
    );
}
