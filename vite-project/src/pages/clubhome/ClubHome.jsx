import SportsCategory from "../../components/sportscategory/SportsCategory";
import Layout from "../../components/layout/Layout";
import HeroSection from "../../components/heroSection/heroSection"
import HomePageCard from "../../components/homePageCard/HomePageCard";


const ClubHome = () => {
    return(
        <Layout>
            <HeroSection/>
            <SportsCategory/>
            <HomePageCard/>
        </Layout>
    );
}

export default ClubHome;