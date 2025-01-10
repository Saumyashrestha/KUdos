import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import myContext from "../../context/myContext";

const ongoingEventData = [
  {
    id: 1,
    image: "/public/tournament.png",
    title: "KUCC Cup",
    clubLogo: "/public/kucc-logo.webp",
    link: "ongoingTournament",
  },
  {
    id: 2,
    image: "/public/tournament.png",
    title: "Sankalpa Cup",
    clubLogo: "/public/kucc-logo.webp",
    link: "ongoingTournament",
  },
];

const HomePageCard = () => {
  const navigate = useNavigate();
  const context = useContext(myContext);
  const { loading, getAllMatches } = context;

  return (
    <div className="playfair mt-10">
      <div>
        <h1 className="text-center mb-5 text-2xl text-[#387478] font-semibold underline">
          LIVE MATCHES
        </h1>
      </div>

      {/* Live Matches Section */}
      <section className="body-font">
        <div className="container px-5 py-5 mx-auto space-y-6 p-0">
          {getAllMatches.map((match) => {
            const { matchId, team1Name, team2Name, venue, dateTime, team1score, team2score, matchTime } = match;

            return (
              <a
                key={matchId}
                className="block w-full border border-gray-300 p-0 rounded-xl overflow-hidden shadow-md cursor-pointer transform transition-transform duration-300 hover:scale-105 hover:shadow-lg"
              >
                <div className="relative w-full flex justify-between items-center px-28 py-6">
                  {/* Left Team */}
                  <div className="text-center space-y-4">
                    <img
                      className="h-30 w-32 object-cover mx-auto"
                      src="/mancity.png" 
                      alt={`${team1Name} jersey`}
                    />
                    <h3 className="font-semibold text-xl text-[#387478]">{team1Name}</h3>
                  </div>

                  <div className="text-center space-y-4">
                    <h1 className="text-4xl font-bold text-[#387478]">
                      {team1score} : {team2score}
                    </h1>
                    <div className="border border-[#387478] bg-[#387478] rounded-full py-1 px-6 inline-block">
                      <p className="text-lg text-white">{matchTime}</p>
                    </div>
                  </div>

                  <div className="text-center space-y-4">
                    <img
                      className="h-30 w-32 object-cover mx-auto"
                      src="/mancity2.png" 
                      alt={`${team2Name} jersey`}
                    />
                    <h3 className="font-semibold text-xl text-[#387478]">{team2Name}</h3>
                  </div>
                </div>
                <hr></hr>
                <div className="p-4">
                  <h1 className="title-font text-lg font-semibold text-[#387478]">
                    {team1Name} VS {team2Name}
                  </h1>
                  <p className="text-gray-700 text-sm">Venue: {venue}</p>
                </div>
              </a>
            );
          })}
        </div>
      </section>

      <div>
        <h1 className="text-center mb-5 text-2xl text-[#387478] font-semibold underline">
          ONGOING TOURNAMENTS
        </h1>
      </div>

      <section className="body-font">
        <div className="container px-5 py-5 mx-auto space-y-6 p-0">
          {ongoingEventData.map((event) => {
            const { id, image, title, clubLogo, link } = event;
            return (
              <a
                key={id}
                href={link}
                className="block w-full border border-gray-300 p-0 rounded-xl overflow-hidden shadow-md cursor-pointer transform transition-transform duration-300 hover:scale-105 hover:shadow-lg"
              >
                <div className="relative w-full h-60">
                  <img
                    className="w-full h-full object-cover"
                    src={'/tournament .png'}
                    alt={`${title} banner`}
                  />
                  <div className="absolute top-4 left-4">
                    <img
                      className="h-12 w-12 object-cover rounded-full"
                      src={clubLogo}
                      alt={`${title} club logo`}
                    />
                  </div>
                </div>
                <div className="p-4">
                  <h1 className="title-font text-lg font-medium text-[#387478]">
                    {title}
                  </h1>
                </div>
              </a>
            );
          })}
        </div>
      </section>

      <div>
        <h1 className="text-center mb-5 text-2xl text-[#387478] font-semibold underline">
          RECENT MATCHES
        </h1>
      </div>
    </div>
  );
};

export default HomePageCard;
