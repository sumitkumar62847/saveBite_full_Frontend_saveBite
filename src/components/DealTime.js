import React, { useEffect, useState } from 'react'

function DealTime({ liveTime, SetitemShow }) {
    const [dealSec, setDealSec] = useState(null);

    useEffect(() => {
        const abc = setInterval(() => {
            const now = Date.now();
            const diffMs = liveTime - now;
            const sec = Math.floor(diffMs / 1000);
            if (sec < 0) {
                SetitemShow(false);
                clearInterval(abc);
            } else if (sec) {
                setDealSec(sec);
            }
        }, 1000);
        return () => clearInterval(abc);
    }, [SetitemShow, liveTime])

    return (
        <p
            style={{
                textAlign: 'center',
                color: '#dc2626',           // text-red-600
                backgroundColor: '#fee2e2', // bg-red-100
                margin: 0                   // Ensures no default margin breaks the layout
            }}
        >
            {`${Math.floor(dealSec / 3600) ? `0${Math.floor(dealSec / 3600)}h :` : ''} ${Math.floor((dealSec % 3600) / 60)}min : ${Math.floor(dealSec % 60)}sec`}
        </p>
    )
}

export default DealTime;