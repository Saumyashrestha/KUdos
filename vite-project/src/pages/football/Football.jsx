import Layout from "../../components/layout/Layout";

const Football = () => {
  return (
    <Layout>
      <div className="flex justify-center items-center py-10">
        {/* Scorecard Container */}
        <div className=" shadow-md rounded-lg border border-[#387478] p-8 w-[90%] max-w-4xl">
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
          <div className="flex justify-center gap-20 mt-4 mb-0">
            <button className="text-[#387478] hover:text-[#387478] text-lg font-semibold border-b-2 border-transparent hover:border-[#387478]">
              Lineup
            </button>
            <button className="text-[#387478] hover:text-[#387478] text-lg font-semibold border-b-2 border-transparent hover:border-[#387478]">
              Result
            </button>
            <button className="text-[#387478] hover:text-[#387478] text-lg font-semibold border-b-2 border-transparent hover:border-[#387478]">
              Table
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Football;
