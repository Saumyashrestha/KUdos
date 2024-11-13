import Category from "../../components/category/category";
import HeroSection from "../../components/heroSection/heroSection";
import Layout from "../../components/layout/Layout";
import { Carousel } from "../../components/carousel/carousel";

const HomePage = () => {
    return(
        <Layout>
            <HeroSection/>
            <Carousel/>
            <Category/>
        </Layout>
    );
}

export default HomePage;