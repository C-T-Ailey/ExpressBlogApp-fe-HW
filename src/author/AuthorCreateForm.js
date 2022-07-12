import React, { useState } from 'react'

export default function AuthorCreateForm(props) {

    const [newAuthor, setNewAuthor] = useState({})

    const handleChange = (event) => {

        const attributeToChange = event.target.name

        const newValue = event.target.value


        const author = {...newAuthor}

        author[attributeToChange] = newValue
        console.log(author)
        setNewAuthor(author)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(newAuthor)
        props.addAuthor(newAuthor)
    }

  return (
    <div>
        <h1>Add Author</h1>
        <form onSubmit={handleSubmit}>
            <div>
                <label>Name</label>
                <input type="text" name="name" onChange={handleChange} />
            </div>

            <div>
                <label>Nationality</label>
                <input type="text" name="nationality" onChange={handleChange} />
            </div>

            <div>
                <label>Year of Birth</label>
                <input type="number" name="yearBorn" onChange={handleChange} />
            </div>

            <div>
                <label>Still alive?</label>
                <select name="isAlive" onChange={handleChange}>
                    <option value="true">True</option>
                    <option value="false">False</option>
                </select>
            </div>

            <div>
                <input type="submit" value="Add Author" />
            </div>
        </form>
    </div>
  )
}
