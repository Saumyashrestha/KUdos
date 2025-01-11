import Category from "../../components/category/Category";
import HomePageCard from "../../components/homePageCard/HomePageCard";
import Layout from "../../components/layout/Layout";
import Carousel from "../../components/carousel/carousel";
import myContext from "../../context/myContext";
import { useContext, useEffect, useState } from "react";
import { use } from "react";


const HomePage = () => {
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
    },[]);
    return(
        <Layout>
             {loading ? (
      <p className="text-center text-lg font-bold" style={{ color: '#387478' }}>
        Loading page...
      </p>

    ) :(
    <><Carousel/>
    <Category/>
    <HomePageCard/></>)}
            
        </Layout>
    );
}

export default HomePage;