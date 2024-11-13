import Layout from "../../components/layout/Layout";
import EquipCards from "../../components/equipCards/equipCards";
import {equips} from "../../components/equipCards/equipData";

const Equipments = () => {
    const data=equips;
    return(
        <Layout>
            <EquipCards imgsrc={data.src} imgalt={data.alt} imgdes={data.des}/>
        </Layout>
    );
}

export default Equipments;