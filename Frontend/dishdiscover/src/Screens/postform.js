import React, { useState } from 'react';

const PostRecipe = () => {
  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Create a new recipe object
    const newRecipe = {
      title: title,
      ingredients: ingredients,
      instructions: instructions
    };

    // Send the new recipe data to the backend API
    try {
      console.log('Sending request to:', process.env.REACT_APP_POST_RECIPE_URL);
      const response = await fetch(process.env.REACT_APP_POST_RECIPE_URL, {
        mode: "cors",
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newRecipe)
      });

      console.log('Response status:', response.status);
      
      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Failed to post recipe: ${errorMessage}`);
      }

      console.log('Recipe posted successfully');
      
      // Clear input fields after successful submission
      setTitle('');
      setIngredients('');
      setInstructions('');
    } catch (error) {
      console.error('Error posting recipe:', error);
      setError('Failed to post recipe. Please try again later.');
    }
  };

  return (
    <div>
      <h1>Add New Recipe</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </label>
        <label>
          Ingredients:
          <textarea value={ingredients} onChange={(e) => setIngredients(e.target.value)} required />
        </label>
        <label>
          Instructions:
          <textarea value={instructions} onChange={(e) => setInstructions(e.target.value)} required />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default PostRecipe;
