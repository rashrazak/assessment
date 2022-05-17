import React, {useEffect, useState} from 'react'
import '../styles/app.css';
import Items from './Items';

function App() {

  const singlePage = 10
  const [data, setData] = useState(null)
  const [pagesList, setPagesList] = useState(null)
  const [pages, setPages] = useState(null)
  const [pagesArray, setPagesArray] = useState(null)
  const [page, setPage] = useState(0)
  const [sortType, setSortType] = useState('')

  useEffect(() => {
    const getData = () =>{
      fetch('/api/posts')
      .then(response => response.json())
      .then(({posts}) => {
          const occurance = Math.floor(posts.length/singlePage)
          setPages(Array.from(Array(occurance).keys()) )
          setData(posts)
          getPagesArray(posts)
      });
    }
    if (!data) getData()
  }, [data])

  useEffect(() => {
    if (data) {
      if (!sortType) {
        getPagesArray(data)
      }else if (sortType == "author") {
        let author = data.sort((a,b)=> {
          if (a.author.name < b.author.name)
              return -1;
          if (a.author.name > b.author.name)
              return 1;
          return 0;
        })

        getPagesArray(author)
        
      }else if (sortType == "date") {
        let date = data.sort((a,b)=> {
          return new Date(b.publishDate) - new Date(a.publishDate);
        })
        getPagesArray(date)
      }else if (sortType == "title") {
        let title = data.sort((a,b)=> {
          if (a.title < b.title)
              return -1;
          if (a.title > b.title)
              return 1;
          return 0;
        })
        getPagesArray(title)
      }
    }
  }, [sortType])
  

  const getPagesArray = (posts) =>{
    
    let limitArray = []
    let arr = []
    for (let index = 0; index <= posts.length; index++) {
      if ( index == 0 || index % singlePage != 9  ) {
        arr = [...arr, posts[index]]
      }else if(index == posts.length - 1){
        arr = [...arr, posts[index]]

        arr = [...arr, posts[index]]
        limitArray.push(arr)
        arr = []
      }else{
        arr = [...arr, posts[index]]
        limitArray.push(arr)
        arr = []
      }
    }
    console.log(limitArray)
    setPagesArray(limitArray)
  }
  
  return (
    <div className='main'>
      <div className='app-main'>
        <h2>Lizard-Global</h2>

        <div className='app-filter'>
          <span style={{marginRight:'10px'}}>Filter:</span>
          <select value={sortType} onChange={(e)=>setSortType(e.target.value)} className={`italic font-semibold text-sm w-full`}>
              <option value="">None</option>
              <option value="author">Author(asc)</option>
              <option value="title">Title(asc)</option>
              <option value="date">Date(latest)</option>
          </select>
        </div>

        <div className='app-pages'>
          <span>pages:</span>
          <span>{
            pages && pages.map((v, i) =>{
              return (<span key={i} style={{cursor:'pointer', color:"blue"}} onClick={()=>setPage(v)}>{v+1} ,</span>)
            })
          }</span>
        </div>
      </div>
      <div className='app-body'>
        <table className='table'>
          <thead>
            <tr>
              <th>Author</th>
              <th>Title</th>
              <th>Publish Date</th>
              <th>Summary</th>
              <th>Categories</th>
            </tr>
          </thead>
          <tbody>
            {
              pagesArray && pagesArray[page].map((v,i)=>{
                let date = new Date(v.publishDate)
                date = `${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}`

                let arrCL = v.title.split(" ")
                for (var i = 0; i < arrCL.length; i++) {
                  arrCL[i] = arrCL[i].charAt(0).toUpperCase() + arrCL[i].slice(1);
                }
                let strCL = arrCL.join(" ")

                return <Items key={`${v.id}-${i}`} title={strCL} id={v.id} author={v.author} 
                publishDate={date} summary={v.summary} categories={v.categories}/>
              })
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default App