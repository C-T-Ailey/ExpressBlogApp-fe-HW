import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Author from './Author'
import AuthorCreateForm from './AuthorCreateForm'
import AuthorEditForm from './AuthorEditForm'
import { BrowserRouter as Router, Routes, Route, Link, Navigate} from 'react-router-dom'
import AuthorIndex from './AuthorIndex'

export default function AuthorList() {

    const [authors, setAuthors] = useState([])

    const [isEdit, setIsEdit] = useState(false)
    
    const [currentAuthor, setCurrentAuthor] = useState("")

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

    const addAuthor = (author) => {
        axios.post("author/add", author)
        .then(response => {
            console.log(response.data)
            console.log("Author added successfully.")
            loadAuthorList();
        })
        .catch((error) => {
            console.log("Error adding author!")
            console.log(error)
        })
    }

    const loadBookList = (author) => {
        if (author.review.length){
            const books = author.review.map((book, key) => (
                <td key={key}>
                    <li>{book.title}</li>
                </td>
            ));
            return books;
        };
    }

    const editView = (id) => {
        axios.get(`author/edit?id=${id}`)
        .then(response => {
            console.log(response.data.author)
            var author = response.data.author
            setIsEdit(true)
            setCurrentAuthor(author)
        })
        .catch(error => {
            console.log("Error loading author information")
            console.log(error)
        })
    }

    const editAuthor = (author) => {
        axios.put("author/update", author)
        .then(response => {
            console.log("Author information updated")
            loadAuthorList()
        })
        .catch(error => {
            console.log("Error editing author entry")
            console.log(error)
        })
    }

    const deleteAuthor = (id) => {
        axios.delete(`author/delete?id=${id}`)
        .then(response => {
            console.log("Author deleted successfully")
            loadAuthorList()
        })
        .catch(error => {
            console.log("Error deleting author entry")
            console.log(error)
        })
    }

    const refreshAdd = (e) => {
        e.preventDefault();
        return setIsEdit(false)
    }

    console.log(authors)

    const allAuthors = authors.map((author, index) => (
        <tr key={index}>
            <Author {...author} editView={editView} deleteAuthor={deleteAuthor} />
            {loadBookList(author)}
        </tr>
    ))

    // <AuthorIndex {authors} editView={editView} deleteAuthor={deleteAuthor} loadBookList={loadBookList} />

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
        {
            
            (!isEdit) ?
            <AuthorCreateForm addAuthor={addAuthor} />
            :
            <>
            <AuthorEditForm key={currentAuthor._id} author={currentAuthor} editAuthor={editAuthor} refreshAdd={refreshAdd}/>
            </>
        }
    </div>
  )
}
