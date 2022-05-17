import React from 'react'

function Items({ title, author, publishDate, summary, id, categories, total }) {
    return (
            <tr>
                <td>{author.name}</td>
                <td>
                    {title} <br/>
                    <em><small>{id}</small></em>
                </td>
                <td style={{ width:'10%'}}>{publishDate}</td>
                <td style={{width:'30%'}}>{summary}</td>
                <td>
                    <ul>
                    {categories.map( (v,i) => {
                        return <li key={i}>
                            {v.name} <br/>
                            <em><small>{v.id}</small></em>
                        </li>
                    })}
                    </ul>
                    
                </td>   
            </tr>    
    )
}

export default Items