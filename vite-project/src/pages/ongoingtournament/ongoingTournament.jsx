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
                        href="#matches"
                        className="text-[#387478] hover:text-[#387478] text-lg font-semibold border-b-2 border-transparent hover:border-[#387478]"
                    >
                        Matches
                    </a>
                    <a
                        href="#table"
                        className="text-[#387478] hover:text-[#387478] text-lg font-semibold border-b-2 border-transparent hover:border-[#387478]"
                    >
                        Table
                    </a>
                   
                </div>
            </div>

            {/* Matches Section */}
            <div id="matches" className="container bg-gray-100 border border-[#387478] shadow-md rounded-lg mt-8 mx-auto px-5 py-5">
                <h2 className="text-2xl font-semibold text-[#387478] mb-4">Matches</h2>
                <div className="relative">
                   

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
                </div>
                </div>
                 {/* Table Section */}
            <div id="table" className="container bg-gray-100 border border-[#387478] shadow-md rounded-lg mt-8 mx-auto px-5 py-5 mb-8">
                <h2 className="text-2xl font-semibold text-[#387478] mb-4">Table</h2>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse border border-[#387478]">
                        <thead>
                            <tr className="bg-gray-200 text-[#387478]">
                                <th className="px-2 py-2 border-b border-[#387478] text-left font-semibold">Rank</th>
                                <th className="px-8 py-2 border-b border-[#387478] text-left font-semibold">Team</th>
                                <th className="px-1 py-2 border-b border-[#387478] text-center font-semibold">Played</th>
                                <th className="px-1 py-2 border-b border-[#387478] text-center font-semibold">Win</th>
                                <th className="px-1 py-2 border-b border-[#387478] text-center font-semibold">Draw</th>
                                <th className="px-1 py-2 border-b border-[#387478] text-center font-semibold">Loss</th>
                                <th className="px-1 py-2 border-b border-[#387478] text-center font-semibold">Goal Difference</th>
                                <th className="px-1 py-2 border-b border-[#387478] text-center font-semibold">Points</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[
                                { rank: 1, team: "Team A", played: 5, win: 4, draw: 1, loss: 0, gd: 10, points: 13 },
                                { rank: 2, team: "Team B", played: 5, win: 3, draw: 1, loss: 1, gd: 8, points: 10 },
                                { rank: 3, team: "Team C", played: 5, win: 2, draw: 1, loss: 2, gd: 2, points: 7 },
                                { rank: 4, team: "Team D", played: 5, win: 3, draw: 1, loss: 1, gd: -3, points: 5 },
                                { rank: 5, team: "Team E", played: 5, win: 0, draw: 1, loss: 4, gd: -8, points: 1 },
                            ].map((row, index) => (
                                <tr key={index} className="hover:bg-gray-200">
                                    <td className="px-4 py-2 border-b border-[#387478] text-left">{row.rank}</td>
                                    <td className="px-8 py-2 border-b border-[#387478] text-left">{row.team}</td>
                                    <td className="px-1 py-2 border-b border-[#387478] text-center">{row.played}</td>
                                    <td className="px-1 py-2 border-b border-[#387478] text-center">{row.win}</td>
                                    <td className="px-1 py-2 border-b border-[#387478] text-center">{row.draw}</td>
                                    <td className="px-1 py-2 border-b border-[#387478] text-center">{row.loss}</td>
                                    <td className="px-1 py-2 border-b border-[#387478] text-center">{row.gd}</td>
                                    <td className="px-1 py-2 border-b border-[#387478] text-center">
                                        {(row.win * 3) + (row.draw * 1) + (row.loss * 0)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        
        </Layout>
    );
};

export default OngoingTournament;
