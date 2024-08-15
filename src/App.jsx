import { useState } from "react";
import "./App.css";
import Header from "./components/Header/header";
import CategoryList from "./components/CategoryList/categoryList";
import Loading from "./components/Loading/loading";
import FastFoodList from "./components/FastFoodList/fastFoodList";
import SearchBar from "./components/Searchbar/searchBar";
import notFound from "./assets/images/404.png";
import useAxios from "./hooks/useAxios";
import UserLayout from "./layout/UserLayout";
import { AppProvider } from "./context/CartContext";

function App() {
  const [url, setUrl] = useState("/FastFood/list");

  const [fastFoodItems, , loading] = useAxios({
    url,
  });

  const filterItems = (categoryId) => {
    setUrl(`/FastFood/list/${categoryId ? "?categoryId=" + categoryId : ""}`);
  };

  const searchItems = async (term) => {
    setUrl(`/FastFood/search/${term ? "?term=" + term : ""}`);
  };

  const renderContent = () => {
    if (loading) {
      return <Loading theme="dark" />;
    }
    if (fastFoodItems.length === 0) {
      return (
        <>
          <div className="alert alert-warning text-center ">
            برای کلید واژه فوق هیچ آیتمی یافت نشد
          </div>
          <img src={notFound} className="mx-auto mt-5 d-block fade-in-horiz" />
        </>
      );
    }
    return <FastFoodList fastFoodItems={fastFoodItems} />;
  };

  return (
    <AppProvider>
      <UserLayout>
        <CategoryList filterItems={filterItems}>
          <SearchBar searchItems={searchItems} />
        </CategoryList>
        <div className="container mt-4">{renderContent()}</div>
      </UserLayout>
    </AppProvider>
  );
}

export default App;
