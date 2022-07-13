import React from 'react'
import Author from './Author'

export default function AuthorIndex(props) {

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
                    {props.allAuthors}
                </tbody>
            </table>
        </div>
    </div>
  )
}
