import React, { useState } from "react";
import { useSelector } from "react-redux";

import { Link } from "react-router-dom";
import style from "./MenuDashboard.module.css";
import "../header/UserLink.css";
import { BsFillFileCodeFill } from "react-icons/bs";
import { AiOutlineFundProjectionScreen, AiFillProject } from "react-icons/ai";
import { MdAnnouncement } from "react-icons/md";
import { FiFileText } from "react-icons/fi";
import { RiFileUserFill, RiPagesFill } from "react-icons/ri";
import { IconContext } from "react-icons";
import { useParams } from "react-router-dom";

export function MenuDashboard({ open, setOpen }) {
  const auth = useSelector((state) => state.auth);
  const params = useParams();
  const cohortID = params.id;
  const { isTeacher } = auth;
  const [activeLink, setActiveLink] = useState(null);
  const navLinks = [
    // {
    //   text: "Estadísticas",
    //   route: `/dashboard/${cohortID}/statistics`,
    //   icon: <AiOutlineFundProjectionScreen className={style.icon} />,
    // }, 
    {
      text: "Proyectos",
      route: `/dashboard/${cohortID}/projects`,
      icon: <AiFillProject className={style.icon} />,
    },
    {
      text: "Workbooks",
      route: `/dashboard/${cohortID}/workbooks`,
      icon: <BsFillFileCodeFill className={style.icon} />,
    },
    {
      text: "Consultas",
      route: `/dashboard/${cohortID}/queries`,
      icon: <FiFileText className={style.icon} />,
    },
    {
      text: "Anuncios",
      route: `/dashboard/${cohortID}/announcements-cohort`,
      icon: <MdAnnouncement className={style.icon} />,
    },
    {
      text: "Estudiantes",
      route: `/dashboard/${cohortID}/students`,
      icon: <RiFileUserFill className={style.icon} />,
    },
    {
      text: "Cohortes",
      route: "/",
      icon: <RiPagesFill className={style.icon} />,
    },
  ];
  let list = [];
  if (isTeacher) {
    list = navLinks;
  } else {
    list = navLinks.slice(0, navLinks.length - 2);
  }
  const handleNavLink = (index) => {
    setActiveLink(index);
    if (open) {
      setOpen(!open);
    }
  };
  return (
    <div>
      <IconContext.Provider value={{ size: 30 }}>
        <nav className={style.nav}>
          <ul className={style.ul}>
            {list.map((item, index) => {
              return (
                <Link
                  key={index}
                  to={item.route}
                  className={
                    activeLink === index
                      ? `${style.link_active} ${style.link}`
                      : ` ${style.link}`
                  }
                  onClick={() => handleNavLink(index, item.text)}
                >
                  <div>{item.icon}</div>
                  <span className={style.nav_text}>{item.text}</span>
                </Link>
              );
            })}
          </ul>
        </nav>
      </IconContext.Provider>
    </div>
  );
}