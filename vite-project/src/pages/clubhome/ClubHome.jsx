import SportsCategory from "../../components/sportscategory/SportsCategory";
import Layout from "../../components/layout/Layout";
import HeroSection from "../../components/heroSection/heroSection"


const ClubHome = () => {
    return(
        <Layout>
            <HeroSection/>
            <SportsCategory/>
            
        </Layout>
    );
}

export default ClubHome;