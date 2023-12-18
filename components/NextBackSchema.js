import { useRouter } from "next/router";
import React from "react";

export default function NextBackSchema({ inscription, allInscriptions }) {
  const router = useRouter();

  const inscriptionArray = Object.values(allInscriptions);
  const currentIndex = inscriptionArray.findIndex(
    (item) => item._id === inscription._id
  );
  const isLastInscription = currentIndex === 0;
  const isFirstInscription = currentIndex === inscriptionArray.length - 1;

  const navigateToInscription = (direction) => {
    if (isLastInscription && direction === "prev") return;
    if (isFirstInscription && direction === "next") return;

    if (Array.isArray(inscriptionArray) && currentIndex !== -1) {
      const newIndex =
        direction === "prev" ? currentIndex - 1 : currentIndex + 1;
      const newInscription = inscriptionArray[newIndex];
      router.push(`/parque/colonia/${newInscription.documento}`);
    }
  };
  return (
    <div className="bg-white rounded flex justify-between shadow-sm shadow-gray-700 w-full mt-5 text-3xl text-gray-600">
      <button
        className={`pt-2 pb-1 px-4 ${
          isLastInscription ? "text-gray-300 cursor-default" : ""
        }`}
        title="Anterior"
        onClick={() => navigateToInscription("prev")}
      >
        <i className="bx bx-chevrons-left"></i>
      </button>
      <button
        className={`pt-2 pb-1 px-4 ${
          isFirstInscription ? "text-gray-300 cursor-default" : ""
        }`}
        title="Siguiente"
        onClick={() => navigateToInscription("next")}
      >
        <i className="bx bx-chevrons-right"></i>
      </button>
    </div>
  );
}
