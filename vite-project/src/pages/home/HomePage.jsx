import Category from "../../components/category/Category";
import HomePageCard from "../../components/homePageCard/HomePageCard";
import Layout from "../../components/layout/Layout";
import Carousel from "../../components/carousel/carousel";
import myContext from "../../context/myContext";
import { useContext } from "react";

const HomePage = () => {
    return(
        <Layout>
            <Carousel/>
            <Category/>
            <HomePageCard/>
        </Layout>
    );
}

export default HomePage;