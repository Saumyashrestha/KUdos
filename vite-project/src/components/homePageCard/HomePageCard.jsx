// eventData
const eventData = [
    {
        id: 1,
        image: '/public/football-banner.png', // replace with actual event banner URL
        title: 'Football Tournament',
        clubLogo: '/public/kucc-logo.webp', // replace with actual club logo URL
        link: '/events/football-tournament', // replace with actual link to event page
    },
    {
        id: 2,
        image: '/public/basketball-banner.png',
        title: 'Basketball Tournament',
        clubLogo: '/public/kucc-logo.webp',
        link: '/events/basketball-championship',
    },
    {
        id: 3,
        image: '/public/badminton-banner.jpeg',
        title: 'Badminton Tournament',
        clubLogo: '/public/kucc-logo.webp',
        link: '/events/badminton-open',
    },
    {
        id: 4,
        image: '/public/cricket-banner.jpeg',
        title: 'Cricket Tournament',
        clubLogo: '/public/kucc-logo.webp',
        link: '/events/cricket-league',
    },
];

const HomePageCard = () => {
    return (
        <div className=" playfair mt-10">
            {/* Heading */}
            <div className="">
                <h1 className="text-center mb-5 text-2xl text-[#387478] font-semibold">ONGOING EVENTS</h1>
            </div>

            {/* Main Section */}
            <section className="body-font">
                <div className="container px-5 py-5 mx-auto space-y-6 p-0">
                    {eventData.map((event) => {
                        const { id, image, title, description, clubLogo, link } = event;
                        return (
                            <a
                                key={id}
                                href={link}
                                className="block w-full border border-gray-300 p-0 rounded-xl overflow-hidden shadow-md cursor-pointer transform transition-transform duration-300 hover:scale-105 hover:shadow-lg"
                            >
                                {/* Event Banner */}
                                <div className="relative w-full h-60">
                                    <img
                                        className="w-full h-full object-cover "
                                        src={image}
                                        alt={`${title} banner`}
                                    />
                                    {/* Club Logo */}
                                    <div className="absolute top-4 left-4">
                                        <img
                                            className="h-12 w-12 object-cover rounded-full"
                                            src={clubLogo}
                                            alt={`${title} club logo`}
                                        />
                                    </div>
                                </div>
                                {/* Event Description */}
                                <div className="p-4">
                                    <h1 className="title-font text-lg font-medium text-[#387478] ">
                                        {title}
                                    </h1>
                                    <p className="text-gray-700 text-sm">
                                        {description}
                                    </p>
                                </div>
                            </a>
                        );
                    })}
                </div>
            </section>
        </div>
    );
};

export default HomePageCard;
