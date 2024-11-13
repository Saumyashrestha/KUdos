import Category from "../../components/category/category";
import HeroSection from "../../components/heroSection/heroSection";
import HomePageCard from "../../components/homePageCard/HomePageCard";
import Layout from "../../components/layout/Layout";
import { Carousel } from "../../components/carousel/carousel";

const HomePage = () => {
    return(
        <Layout>
            <HeroSection/>
            <Carousel/>
            <Category/>
            <HomePageCard/>
        </Layout>
    );
}

export default HomePage;