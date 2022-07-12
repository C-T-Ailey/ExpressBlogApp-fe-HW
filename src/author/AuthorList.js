import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Author from './Author'
import AuthorCreateForm from './AuthorCreateForm'

export default function AuthorList() {

    const [authors, setAuthors] = useState([])

    useEffect(() => {
        loadAuthorList()
    }, [])

    const loadAuthorList = () => {
        axios.get("author/index")
        .then((response => {
            console.log(response)
            setAuthors(response.data.authors)
        }))
        .catch((error) => {
            console.log(error)
        })
    }


    const allAuthors = authors.map((author, index) => (
        <tr key={index}>
            <Author {...author} />
        </tr>
    ))

    const addAuthor = (author) => {
        axios.post("author/add", author)
        .then(response => {
            console.log("Author added successfully.")
            loadAuthorList();
        })
        .catch((error) => {
            console.log("Error adding author!")
            console.log(error)
        })
    }

  return (
    <div>
        <h1>Authors</h1>
        <div>
            <table>
                <tbody>
                    <tr>
                        <th>Name</th>
                        <th>Nationality</th>
                    </tr>
                    {allAuthors}
                </tbody>
            </table>
        </div>
    </div>
  )
}
