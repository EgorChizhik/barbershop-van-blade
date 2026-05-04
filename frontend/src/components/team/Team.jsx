import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import { IoChevronBack, IoChevronForward } from 'react-icons/io5';

import 'swiper/css';
import 'swiper/css/navigation';
import './Team.scss';

import barber1 from '../../assets/images/team/barber1.png';
import barber2 from '../../assets/images/team/barber2.png';
import barber3 from '../../assets/images/team/barber3.png';
import barber4 from '../../assets/images/team/barber4.png';
import barber5 from '../../assets/images/team/barber5.png';

import text1 from '../../assets/images/team/text1.png';
import text2 from '../../assets/images/team/text2.png';
import text3 from '../../assets/images/team/text3.png';
import text4 from '../../assets/images/team/text4.png';
import text5 from '../../assets/images/team/text5.png';

import teamBg from '../../assets/images/team/team_bg.jpg';
import skullImage from '../../assets/images/team/skull.png'; 

const Team = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const crew = [
    { id: 1, img: barber1, textImg: text1 },
    { id: 2, img: barber2, textImg: text2 },
    { id: 3, img: barber3, textImg: text3 },
    { id: 4, img: barber4, textImg: text4 },
    { id: 5, img: barber5, textImg: text5 },
  ];

  return (
    <section className="team-section">
      <div className="container">
        
        <h2 className="team-title">НАША КОМАНДА</h2>

        <div className="team-subheader">
          <p className="team-intro">
            В этих стенах собрались не простые головорезы, а элита пиратского мира — мастера своего дела, 
            за головы которых назначена награда за идеальную стрижку, опасную работу бритвой, 
            виртуозную укладку и контрабанду хорошего настроения. Рассмотрите портреты преступников 
            хорошего вкуса и выберите того, кто поведёт ваш корабль к идеальному образу.
          </p>
          
          <div className="team-controls">
            <button ref={prevRef} className="control-btn"><IoChevronBack /></button>
            <button ref={nextRef} className="control-btn"><IoChevronForward /></button>
          </div>
        </div>

        <div 
          className="team-wall" 
          style={{ backgroundImage: `url(${teamBg})` }}
        >
          <div className="team-wall-skull">
            <img src={skullImage} alt="Skull" />
          </div>

          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            loop={true}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            onBeforeInit={(swiper) => {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
            }}
            breakpoints={{
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 }, 
            }}
            className="team-swiper"
          >
            {crew.map((member) => (
              <SwiperSlide key={member.id}>
                <div className="wanted-card">
                  <div className="card-image-wrapper">

                    <img src={member.img} alt="Wanted Poster" className="poster-base" />
                    
                    <div className="poster-text-layer">
                      <img src={member.textImg} alt="Wanted Info" />
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default Team;