import React from "react";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import Proptypes from "prop-types";
import { useEffect, useState } from "react";
import Search from "../modals/Search/Search";
import Dialog from "../modals/Dialogs/Dialogs";

const MainLayout = ({ children }) => {
    const [isSearchShow, setIsSearchShow] = useState(false);
    const [isDialogShow, setIsDialogShow] = useState(false);

    useEffect(() => {
      // localStorage'dan dialog durumunu al, yoksa true olarak ayarla
      const dialogStatus = localStorage.getItem("dialog");
      
      if (dialogStatus === null) {
        // İlk ziyarette dialog'u göster
        localStorage.setItem("dialog", JSON.stringify(true));
        setTimeout(() => {
          setIsDialogShow(true);
        }, 1000);
      } else {
        // Sonraki ziyaretlerde localStorage'daki değere göre göster/gizle
        const shouldShow = JSON.parse(dialogStatus);
        setTimeout(() => {
          setIsDialogShow(shouldShow);
        }, 2000);
      }
    }, []);

    return (
      <div className="main-layout">
        <Dialog isDialogShow={isDialogShow} setIsDialogShow={setIsDialogShow} />
        <Search isSearchShow={isSearchShow} setIsSearchShow={setIsSearchShow} />
        <Header setIsSearchShow={setIsSearchShow} />
        {children}
        <Footer />
      </div>
    );
};

export default MainLayout;

MainLayout.propTypes = {
  children: Proptypes.node,
};