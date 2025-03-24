import React, { useState } from 'react';
import axios from 'axios';

function App() {
    const [ingredient, setIngredient] = useState('');
    const [measurement, setMeasurement] = useState('');
    const [quantity, setQuantity] = useState('');
    const [result, setResult] = useState(null);

    const handleConvert = async () => {
        try {
            const response = await axios.post('http://localhost:5000/convert', {
                ingredient: ingredient,
                measurement: measurement,
                quantity: parseFloat(quantity),
            });
            setResult(response.data);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>Precision Baking</h1>
            <input 
                type="text" 
                placeholder="Ingredient" 
                value={ingredient} 
                onChange={(e) => setIngredient(e.target.value)} 
            />
            <input 
                type="text" 
                placeholder="Measurement (e.g., cup)" 
                value={measurement} 
                onChange={(e) => setMeasurement(e.target.value)} 
            />
            <input 
                type="number" 
                placeholder="Quantity" 
                value={quantity} 
                onChange={(e) => setQuantity(e.target.value)} 
            />
            <button onClick={handleConvert}>Convert</button>
            
            {result && (
                <div>
                    <h3>Conversion Result:</h3>
                    {result.error ? (
                        <p>{result.error}</p>
                    ) : (
                        <p>{result.quantity} {measurement} of {ingredient} equals {result.grams} grams.</p>
                    )}
                </div>
            )}
        </div>
    );
}

export default App;
