import Layout from "../../components/layout/Layout";
import { useRef } from "react";

const OngoingTournament = () => {
    const matchContainerRef = useRef(null);

    const scrollLeft = () => {
        matchContainerRef.current.scrollBy({ left: -300, behavior: "smooth" });
    };

    const scrollRight = () => {
        matchContainerRef.current.scrollBy({ left: 300, behavior: "smooth" });
    };

    return (
        <Layout>
            <div className="container border border-[#387478] shadow-md rounded-lg mt-20 mx-auto px-5 py-5 flex flex-col h-48">
                <div className="flex items-center mt-2 space-x-5">
                    <img
                        src="/public/kucc-logo.webp"
                        alt="KUCC Logo"
                        className="w-16 h-16 object-cover"
                    />
                    <div>
                        <h1 className="text-2xl font-semibold text-[#387478]">KUCC Cup</h1>
                        <h2 className="text-lg text-gray-600">DoCSE</h2>
                    </div>
                </div>
                <div className="flex-grow"></div>
                <div className="flex space-x-10 mt-auto pb-1">
                    <a
                        href="/ongoing-tournament/table"
                        className="text-[#387478] hover:text-[#387478] text-lg font-semibold border-b-2 border-transparent hover:border-[#387478]"
                    >
                        Table
                    </a>
                    <a
                        href="/ongoing-tournament/matches"
                        className="text-[#387478] hover:text-[#387478] text-lg font-semibold border-b-2 border-transparent hover:border-[#387478]"
                    >
                        Matches
                    </a>
                </div>
            </div>

            {/* Matches Section */}
            <div className="container bg-gray-100 border border-[#387478] shadow-md rounded-lg mt-8 mx-auto px-5 py-5">
                <h2 className="text-2xl font-semibold text-[#387478] mb-4">Matches</h2>
                <div className="relative">
                    <button
                        onClick={scrollLeft}
                        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-200 hover:bg-gray-400 rounded-full p-3 shadow z-10"
                        style={{ marginLeft: "-40px" }}
                    >
                        &lt;
                    </button>

                    {/* Matches Container */}
                    <div
                        ref={matchContainerRef}
                        className="flex space-x-5 overflow-x-auto px-20 py-5 relative"
                        style={{ paddingLeft: "10px", paddingRight: "10px" }}
                    >
                        {/* Cards */}
                        {[
                            {
                                team1: "Brentford",
                                team2: "Nottm Forest",
                                score: "0 - 0",
                                time: "26'",
                                team1Jersey: "/kucc-logo.webp",
                                team2Jersey: "/kucc-logo.webp",
                                link: "/match-details/brentford-vs-nottm-forest", // Link for the match
                            },
                            {
                                team1: "Ipswich",
                                team2: "Newcastle",
                                score: "0 - 1",
                                time: "27'",
                                team1Jersey: "/mancity2.png",
                                team2Jersey: "/mancity.png",
                                link: "/match-details/ipswich-vs-newcastle",
                            },
                            {
                                team1: "Brentford",
                                team2: "Nottm Forest",
                                score: "0 - 0",
                                time: "26'",
                                team1Jersey: "/kucc-logo.webp",
                                team2Jersey: "/kucc-logo.webp",
                                link: "/match-details/brentford-vs-nottm-forest", // Link for the match
                            },
                            {
                                team1: "Ipswich",
                                team2: "Newcastle",
                                score: "0 - 1",
                                time: "27'",
                                team1Jersey: "/mancity2.png",
                                team2Jersey: "/mancity.png",
                                link: "/match-details/ipswich-vs-newcastle",
                            },
                            {
                                team1: "Brentford",
                                team2: "Nottm Forest",
                                score: "0 - 0",
                                time: "26'",
                                team1Jersey: "/kucc-logo.webp",
                                team2Jersey: "/kucc-logo.webp",
                                link: "/match-details/brentford-vs-nottm-forest", // Link for the match
                            },
                            {
                                team1: "Ipswich",
                                team2: "Newcastle",
                                score: "0 - 1",
                                time: "27'",
                                team1Jersey: "/mancity2.png",
                                team2Jersey: "/mancity.png",
                                link: "/match-details/ipswich-vs-newcastle",
                            },
                            {
                                team1: "Brentford",
                                team2: "Nottm Forest",
                                score: "0 - 0",
                                time: "26'",
                                team1Jersey: "/kucc-logo.webp",
                                team2Jersey: "/kucc-logo.webp",
                                link: "/match-details/brentford-vs-nottm-forest", // Link for the match
                            },
                            
                        ].map((match, index) => (
                            <a
                                key={index}
                                href={match.link}
                                className="min-w-[250px] flex flex-col items-center bg-gray-300 border border-[#387478] rounded-lg shadow-md p-4 hover:bg-gray-400 transition"
                            >
                                {/* Jerseys and Teams */}
                                <div className="flex items-center justify-between w-full">
                                    {/* Team 1 Jersey and Name */}
                                    <div className="flex flex-col items-center">
                                        <img
                                            src={match.team1Jersey}
                                            alt={`${match.team1} Jersey`}
                                            className="w-12 h-12 object-contain"
                                        />
                                        <p className="text-sm font-medium mt-1">{match.team1}</p>
                                    </div>

                                    {/* Score and Time */}
                                    <div className="text-center">
                                        <p className="text-xl font-bold">{match.score}</p>
                                        <p className="text-sm text-gray-500">{match.time}</p>
                                    </div>

                                    {/* Team 2 Jersey and Name */}
                                    <div className="flex flex-col items-center">
                                        <img
                                            src={match.team2Jersey}
                                            alt={`${match.team2} Jersey`}
                                            className="w-12 h-12 object-contain"
                                        />
                                        <p className="text-sm font-medium mt-1">{match.team2}</p>
                                    </div>
                                </div>
                            </a>
                        ))}
                    </div>

                    <button
                        onClick={scrollRight}
                        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-200 hover:bg-gray-400 rounded-full p-3 shadow z-10"
                        style={{ marginRight: "-40px" }}
                    >
                        &gt;
                    </button>
                </div>
            </div>
        </Layout>
    );
};

export default OngoingTournament;
