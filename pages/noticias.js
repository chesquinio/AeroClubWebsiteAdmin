"use client"
import Layout from "@/components/Layout";
import axios from "axios";
import Router from "next/router";
import { useEffect, useState } from "react";


function News() {
  const [news, setNews] = useState([])

  useEffect(() => {
    fetchNews()
  }, [])

  async function fetchNews() {
    axios.get('/api/news').then((response) => {
      setNews(response.data)
    })
  }

  function newNew() {
    Router.push("noticias/nueva")
  }

  function editNew(n) {
    Router.push("noticias/editar/" + n._id)
  }

  async function deleteNew(n) {
    const { _id } = n;
    await axios.delete("/api/news?_id=" + _id);
    fetchNews()
  }

  return (
    <Layout>
      <div className="bg-white listWidth text-center py-2 rounded text-xl">
        <h1 className="font-medium">Noticias</h1>
      </div>
        <div>
          {news && news.map( n => (
              <div key={n._id} className="listWidth grid grid-flow-col bg-white rounded-lg px-3 py-5">
                <h4>{n.title}</h4>
                <div className='text-right'>
                  <button onClick={() => editNew(n)} className="mx-3 px-4 py-1 bg-blue-300 rounded-lg">Editar</button>
                  <button onClick={() => deleteNew(n)} className="mx-3 px-4 py-1 bg-red-500 text-white rounded-lg">Eliminar</button>
                </div>
              </div>
          ))} 
          <div className="listWidth flex justify-end mt-7">
            <button className="bg-white px-6 py-2 rounded-lg" onClick={newNew}>Nueva Noticia</button>
          </div>
        </div>
        
    </Layout>
  );
}

export default News;
