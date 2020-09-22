import React, {useState, useEffect } from 'react';

function Example() {
    const [count, setCount] = useState(0);

    useEffect(() => {
        document.title = 'Antall klikk: ${count}'
    });

    return(
        <div>
            <p>Antall klikk: {count}</p>
            <button onClick={() => setCount(count +1)}>
                Klikk
            </button>
        </div>
    );
}
export {Example};