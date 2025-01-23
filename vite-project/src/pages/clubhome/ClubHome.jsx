import SportsCategory from "../../components/sportscategory/SportsCategory";
import Layout from "../../components/layout/Layout";
import HeroSection from "../../components/heroSection/heroSection"
import HomePageCard from "../../components/homePageCard/HomePageCard";
import { useLocation } from "react-router-dom";


const ClubHome = () => {
    const location = useLocation();
    const { club } = location.state || {};
    return(
        <Layout>
            <HeroSection/>
            <SportsCategory/>
            <HomePageCard/>
        </Layout>
    );
}

export default ClubHome;