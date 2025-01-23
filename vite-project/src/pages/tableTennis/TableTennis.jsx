import Layout from "../../components/layout/Layout";

const TableTennis = () => {
    return(
        <Layout>
       <div className="flex flex-col justify-center items-center py-10">
        
        <div className="shadow-md rounded-lg border border-[#387478] p-8 w-[90%] max-w-4xl mb-10">
          <div className="flex justify-between items-center px-10">
            
            <div className="text-center space-y-4">
              <img
                src="/public/mancity.png"
                alt="Team A Jersey"
                className="w-20 mx-auto"
              />
              <h3 className="font-semibold text-xl text-[#387478]">Jane Doe</h3>
              <div className="bg-[#f2f0ef] border border-[#387478] rounded-lg py-1 px-4">
                <p className="text-md font-medium text-[#387478]">
                  Sets Won: <span className="font-semibold">1</span>
                </p>
              </div>
            </div>

            <div className="text-center space-y-4">
              <h1 className="text-4xl font-bold text-[#387478]">12 : 10</h1>
              <div className="border border-[#387478] bg-[#387378] rounded-full py-1 px-6 inline-block">
                <p className="text-lg text-white">Set 2</p>
              </div>
            </div>

            <div className="text-center space-y-4">
              <img
                src="/public/mancity2.png"
                alt="Team B Jersey"
                className="w-20 mx-auto"
              />
              <h3 className="font-semibold text-xl text-[#387478]">John Doe</h3>
              <div className="bg-[#f2f0ef] border border-[#387478] rounded-lg py-1 px-4">
                <p className="text-md font-medium text-[#387478]">
                  Sets Won: <span className="font-semibold">0</span>
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
        </Layout>
    );
}

export default TableTennis;