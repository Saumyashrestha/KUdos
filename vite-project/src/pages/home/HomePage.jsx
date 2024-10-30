import Category from "../../components/category/category";
import HeroSection from "../../components/heroSection/heroSection";
import Layout from "../../components/layout/Layout";

const HomePage = () => {
    return(
        <Layout>
            <HeroSection/>
            <Category/>
        </Layout>
    );
}

export default HomePage;