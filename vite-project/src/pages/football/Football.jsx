import Layout from "../../components/layout/Layout";

const Football = () => {
  return (
    <Layout>
      <div className="flex flex-col justify-center items-center py-10">
        {/* Scorecard Container */}
        <div className="shadow-md rounded-lg border border-[#387478] p-8 w-[90%] max-w-4xl mb-10">
          <div className="flex justify-between items-center px-10">
            {/* Left Team */}
            <div className="text-center space-y-4">
              <img
                src="/public/mancity.png"
                alt="Team A Jersey"
                className="w-20 mx-auto"
              />
              <h3 className="font-semibold text-xl text-[#387478]">Man City</h3>
              <div className="text-sm text-[#387478] space-y-2">
                <p>P. Foden 22'</p>
                <p>K. DeBruyne 66'</p>
              </div>
            </div>

            {/* Match Time and Scores */}
            <div className="text-center space-y-4">
              <h1 className="text-4xl font-bold text-[#387478]">2 : 2</h1>
              <div className="border border-[#387478] bg-[#387378] rounded-full py-1 px-6 inline-block">
                <p className="text-lg text-white">15:30</p>
              </div>
            </div>

            {/* Right Team */}
            <div className="text-center space-y-4">
              <img
                src="/public/mancity2.png"
                alt="Team B Jersey"
                className="w-20 mx-auto"
              />
              <h3 className="font-semibold text-xl text-[#387478]">Man City</h3>
              <div className="text-sm text-[#387478] space-y-2">
                <p>E. Haaland 55'</p>
                <p>B. Silva 84'</p>
              </div>
            </div>
          </div>
        </div>

        {/* Lineup Container */}
        <div className="shadow-md rounded-lg border border-[#387478] p-8 w-[90%] max-w-4xl">
          <h2 className="text-2xl font-bold text-[#387478] mb-8">
            Lineup
          </h2>
          <div className="grid grid-cols-2 gap-8">
            {/* Team A */}
            <div className="space-y-2">
              <h3 className="font-semibold text-xl text-[#387478] mb-6">
                Team A
              </h3>
              <ul className="text-[#387478]">
                {[
                  "Ederson",
                  "Kyle Walker",
                  "Rúben Dias",
                  "João Cancelo",
                  "Aymeric Laporte",
                  "Rodri",
                  "Kevin De Bruyne",
                  "Phil Foden",
                  "Riyad Mahrez",
                  "Jack Grealish",
                  "Erling Haaland",
                ].map((player, index) => (
                  <li key={index} className="flex flex-col">
                    {player}
                    <hr className="border-t border-gray-400 my-4" />
                  </li>
                ))}
              </ul>
            </div>

            {/* Team B */}
            <div className="space-y-2">
              <h3 className="font-semibold text-xl text-[#387478] mb-6">
                Team B
              </h3>
              <ul className="text-[#387478]">
                {[
                  "Alisson",
                  "Trent Alexander-Arnold",
                  "Virgil van Dijk",
                  "Andy Robertson",
                  "Joel Matip",
                  "Fabinho",
                  "Jordan Henderson",
                  "Thiago Alcântara",
                  "Mohamed Salah",
                  "Darwin Núñez",
                  "Diogo Jota",
                ].map((player, index) => (
                  <li key={index} className="flex flex-col">
                    {player}
                    <hr className="border-t border-gray-400 my-4" />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Football;
