import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase/FirebaseConfig";


const HeroSection = () => {
    const location = useLocation();
    const { clubName } = location.state || {};
    const [clubData, setClubData] = useState(null);

    useEffect(() => {
        const fetchClubData = async () => {
            if (clubName) {
                const q = query(collection(db, "Clubs"), where("name", "==", clubName));
                const querySnapshot = await getDocs(q);
                querySnapshot.forEach((doc) => {
                    setClubData(doc.data());
                });
            }
        };
        fetchClubData();
    }, [clubName]);

    return (
        <div className="relative">
            {/* Hero Image */}
            <img className="h-60 w-full lg:h-auto lg:max-h-128 object-cover" 
                 src={clubData?.image || "./heroimg.png"} 
                 alt="hero image" />

            {/* Text Overlay */}
            <div className="absolute inset-0 flex flex-col justify-center items-start p-8 text-white bg-black bg-opacity-30 ">
                <div className="w-2/3">
                    <h1 className="text-4xl md:text-6xl font-bold mb-4">
                        {clubData ? clubData.name : ""}
                    </h1>
                    <p className="text-lg md:text-xl mb-6">
                        {clubData ? clubData.description : ""}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;
