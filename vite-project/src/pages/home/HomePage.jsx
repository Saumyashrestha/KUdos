import Category from "../../components/category/Category";
import HomePageCard from "../../components/homePageCard/HomePageCard";
import Layout from "../../components/layout/Layout";
import Carousel from "../../components/carousel/carousel";

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