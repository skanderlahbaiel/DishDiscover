import React, { useState } from 'react';

const PostRecipe = () => {
  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');

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
      const response = await fetch(process.env.REACT_APP_POST_RECIPE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newRecipe)
      });
      if (!response.ok) {
        print(response)
        throw new Error('Failed to post recipe');
      }
      // Clear input fields after successful submission
      setTitle('');
      setIngredients('');
      setInstructions('');
    } catch (error) {
      console.error('Error posting recipe:', error);
    }
  };

  return (
    <div>
      <h1>Add New Recipe</h1>
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
