const equips = [
    {src: "https://media.istockphoto.com/id/497096562/photo/soccer-ball.jpg?s=1024x1024&w=is&k=20&c=x3ObXWN26M1AV-21waU7CmR8OXuSm6NIfSQut5fExU0=",
     alt: "Image of football",
     des: "Football"
    },
    {src: "https://media.istockphoto.com/id/172147072/photo/standard-basketball-on-white-surface.jpg?s=1024x1024&w=is&k=20&c=2nhBuhLc8g854djEChmDNRD8twefEn9SGq1QbD8yjYo=",
     alt: "Image of basketball",
     des: "Basketball"
    },
    {src: "https://media.istockphoto.com/id/618341990/photo/volleyball-ball-isolated-on-white-background.jpg?s=1024x1024&w=is&k=20&c=Ecm_dXYy2kFwbQa7C2TBLA67odrKNXRfCIVMI0xVLVs=",
     alt: "Image of volleyball",
     des: "Volleyball"
    },
    {src: "https://media.istockphoto.com/id/493759086/photo/close-up-of-a-cricket-ball.jpg?s=1024x1024&w=is&k=20&c=9RWSVlrPShvX8ybXqmK95VdWKI_iISDLc8jmD-TBi2Y=",
     alt: "Image of cricket ball",
     des: "Cricket ball"
    },
    {src: "https://media.istockphoto.com/id/505125296/photo/wooden-cricket-bat-and-ball-on-a-white-background.jpg?s=1024x1024&w=is&k=20&c=86gmxW-qW3WJmfQL97a6Wr6PgOWopUfWIIVEbDf0okY=",
     alt: "Image of cricket bat",
     des: "Cricket bat"
    },
    {src: "https://media.istockphoto.com/id/115036390/photo/racket-and-shuttlecock-badminton.jpg?s=1024x1024&w=is&k=20&c=9aDLB00dcZEftxcegmPxnZsg-X62wRsXclcR4RHTecw=",
     alt: "Image of badminton racket",
     des: "Badminton racket"
    },
    {src: "https://media.istockphoto.com/id/496600897/photo/table-tennis.jpg?s=1024x1024&w=is&k=20&c=qZp9p8fgIFpamNt05ZaF0ciJXNseR76VVd3l1RZhihs=",
     alt: "Image of table tennis",
     des: "Table tennis"
    },
    {src: "https://media.istockphoto.com/id/1133952615/photo/top-view-old-goalkeeper-gloves-and-dilapidated-isolated-on-white-background-with-clipping-path.jpg?s=1024x1024&w=is&k=20&c=1efkb2PrmuU-8t0k1CT97Gk47ZbOj5i3WA6BuRGj05U=",
     alt: "Image of goalkeeper gloves",
     des: "Goalkeeper gloves"
    },
    {src: "https://media.istockphoto.com/id/184946816/photo/keeping-gloves.jpg?s=1024x1024&w=is&k=20&c=iwb6MNRrLj0il1DdV58GtHbbucxucaQOsseOnZPygGQ=",
     alt: "Image of wicket keeping gloves",
     des: "Wicket keeping gloves"
    },
    {src: "https://media.istockphoto.com/id/172285390/photo/cricket-stumps.webp?s=612x612&w=is&k=20&c=wmfQ4kjWrsrdgzFMAjSgfwwXnzuHDuaK4DfxwCKueRI=",
     alt: "Image of wicket",
     des: "Wicket"
    }
];

const EquipCards = () => {
    return (
        <div className="flex bg-gray-100">
            {/* Main Content Area (Shifted Left) */}
            <div className="flex-1 px-5 py-5 overflow-y-auto mr-80">
                {/* Heading */}
                <div className="text-center mb-5">
                    <h1 className="text-2xl text-[#387478] font-semibold">AVAILABLE EQUIPMENTS</h1>
                </div>

                {/* Main Section */}
                <section className="body-font">
                    <div className="container mx-auto">
                        {/* Grid Layout for the Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {equips.map((data, index) => {
                                const { src, alt, des } = data;
                                return (
                                    <div key={index} className="max-w-xs rounded-lg shadow-lg overflow-hidden bg-white">
                                        {/* Equipment Image */}
                                        <div className="relative w-full h-60">
                                            <img
                                                className="w-full h-full object-cover"
                                                src={src}
                                                alt={alt}
                                            />
                                        </div>
                                        {/* Equipment Description */}
                                        <div className="p-4">
                                            <h1 className="title-font text-lg font-medium text-[#387478]">{des}</h1>
                                            <p className="text-gray-700 text-sm">{des}</p>
                                        </div>
                                        {/* Button Section */}
                                        <div className="flex justify-center p-4">
                                            <button className="bg-transparent hover:bg-[#387478] text-[#387478] font-semibold hover:text-white py-2 px-4 border border-[#387478] hover:border-transparent rounded">
                                                Add to list
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>
            </div>

            {/* Sidebar (Fixed on the right side) */}
            <div className="w-80 bg-white p-5 fixed top-10 right-0 h-full lg:block hidden">
                {/* Sidebar Content */}
                <h2 className="text-lg font-semibold text-[#387478] mb-4">Request List</h2>
                <p className="text-gray-700">Items which are added to list appear here. Items in this list can be requested to the SWD. The request list will be processed and we will notify you soon.</p>
                <div className="flex justify-center p-4">
                                            <button className="bg-transparent hover:bg-[#387478] text-[#387478] font-semibold hover:text-white py-2 px-4 border border-[#387478] hover:border-transparent rounded">
                                                Request 
                                            </button>
                                        </div>
            </div>
        </div>
    );
};

export default EquipCards;
