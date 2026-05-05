import React from "react";
import { useWorks } from "../hooks/useWorks";
import PageTitle from "../components/PageTitle/PageTitle";
import { BASE_URL } from "../utils/api";
import "./Works.scss";

const Works = () => {
  const { data: works, isLoading } = useWorks();

  if (isLoading)
    return <div className="loading-screen">Загрузка арсенала...</div>;

  return (
    <main className="works-page">
      <PageTitle title="НАШИ РАБОТЫ" />
      <div className="container">
        <div className="works-grid">
          {works?.map((work) => (
            <div key={work.id} className={`work-item ${work.image_type}`}>
              <div className="work-image-wrapper">
                <img
                  src={
                    work.image.startsWith("http")
                      ? work.image
                      : `${BASE_URL}${work.image}`
                  }
                  alt="Van Blade Craftsmanship"
                  loading="lazy"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Works;