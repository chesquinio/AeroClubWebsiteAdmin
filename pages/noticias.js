"use client";
import Layout from "@/components/Layout";
import axios from "axios";
import Router from "next/router";
import Modal from "react-modal";
import { useEffect, useState } from "react";
import Head from "next/head";

function News() {
  const [news, setNews] = useState([]);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [newsToDelete, setNewsToDelete] = useState(null);

  useEffect(() => {
    fetchNews();
  }, []);

  async function fetchNews() {
    axios.get("/api/news").then((response) => {
      setNews(response.data.reverse());
    });
  }

  function newNew() {
    Router.push("noticias/nueva");
  }

  function editNew(n) {
    Router.push("noticias/editar/" + n._id);
  }

  function openDeleteModal(n) {
    setNewsToDelete(n);
    setDeleteModalIsOpen(true);
  }

  async function confirmDelete() {
    if (newsToDelete) {
      const { _id } = newsToDelete;
      await axios.delete("/api/news?_id=" + _id);
      setNewsToDelete(null);
      setDeleteModalIsOpen(false);
      fetchNews();
    }
  }

  function closeDeleteModal() {
    setNewsToDelete(null);
    setDeleteModalIsOpen(false);
  }

  return (
    <>
      <Head>
        <title>Noticias | Aero Club Admin</title>
      </Head>
      <Layout>
        <div className="bg-transparent text-white listWidth mx-auto mt-5 text-center py-2 rounded text-xl">
          <h1 className="font-normal text-4xl">Noticias</h1>
        </div>
        <div className="w-full listWidth flex justify-center md:justify-end mx-auto my-5">
          <button
            className="bg-white text-xl w-full text-gray-500 font-medium hover:text-gray-800 hover:bg-gray-100 hover:shadow-lg transition-all px-6 py-2 rounded"
            onClick={newNew}
          >
            Nueva Noticia
          </button>
        </div>
        <div>
          {news &&
            news.map((n) => (
              <div
                key={n._id}
                className="listWidth shadow-md shadow-gray-700 mx-auto my-5 grid grid-flow-col bg-white rounded px-3 py-5"
              >
                <h4 className="text-xl font-normal">{n.title}</h4>
                <div className="flex justify-end">
                  <button
                    onClick={() => editNew(n)}
                    className="mx-4 text-xl rounded-lg hover:text-cyan-600 transition-all"
                  >
                    <i className="bx bx-edit"></i>
                  </button>
                  <button
                    onClick={() => openDeleteModal(n)}
                    className="mx-4 text-xl text-black rounded-lg hover:text-red-500 transition-all duration-500"
                  >
                    <i className="bx bxs-trash"></i>
                  </button>
                </div>
              </div>
            ))}
        </div>

        <Modal
          isOpen={deleteModalIsOpen}
          onRequestClose={closeDeleteModal}
          contentLabel="Confirm Delete Modal"
          className="Modal rounded-lg p-6 bg-white w-96 mx-auto"
          overlayClassName="Overlay fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-75"
        >
          <h2 className="text-xl font-semibold text-center mb-4">
            ¿Estás seguro de que deseas eliminar esta noticia?
          </h2>
          <div className="flex justify-center">
            <button
              onClick={closeDeleteModal}
              className="bg-gray-300 text-gray-800 px-3 py-2 rounded mx-2"
            >
              Cancelar
            </button>
            <button
              onClick={confirmDelete}
              className="bg-red-500 text-white px-3 py-2 rounded mx-2"
            >
              Eliminar
            </button>
          </div>
        </Modal>
      </Layout>
    </>
  );
}

export default News;
