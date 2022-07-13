import React, { useState } from 'react'

export default function AuthorEditForm(props) {
    const [newAuthor, setNewAuthor] = useState(props.author)

    //
    const handleChange = (event) => {
        //
        const attributeToChange = event.target.name
        //
        const newValue = event.target.value

        //
        const author = {...newAuthor}
        //
        author[attributeToChange] = newValue
        console.log(author)
        setNewAuthor(author)
    }

    const handleSubmit = (event) => {
        console.log("here boss")
        event.preventDefault();
        props.editAuthor(newAuthor)
        event.target.reset();
    }

  return (
    <div>
        <h1>Edit Author</h1>
        <form onSubmit={handleSubmit}>
            <div>
                <label>Name</label>
                <input type="text" name="name" onChange={handleChange} value={newAuthor.name} />
            </div>

            <div>
                <label>Nationality</label>
                <input type="text" name="nationality" onChange={handleChange} value={newAuthor.nationality} />
            </div>

            <div>
                <label>Year of Birth</label>
                <input type="number" name="yearBorn" onChange={handleChange} value={newAuthor.yearBorn} />
            </div>

            <div>
                <label>Still alive?</label>
                <select name="isAlive" onChange={handleChange} defaultValue={newAuthor.isAlive}>
                    <option value="true" >yes</option>
                    <option value="false">no</option>
                </select>
            </div>

            <div>
                <input type="submit" value="Update Author" />
                <button id="return" onClick={(e) => props.refreshAdd(e)}>New Author</button>
            </div>
        </form>
    </div>
  )
}
