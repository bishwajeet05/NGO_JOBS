import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

const Home = () => {
  return (
    <div className="w-full overflow-x-hidden">
      <Head>
        <title>GreenImpact NGO</title>
      </Head>

      {/* Hero Section */}
      <section className="flex flex-col md:flex-row bg-gradient-to-r from-blue-500 to-green-500 text-white p-4 sm:p-6 md:p-8 w-full">
        <div className="md:w-1/2 flex flex-col justify-center space-y-4 mb-6 md:mb-0">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight">
            Empowering Change Through Opportunities
          </h2>
          <p className="text-base sm:text-lg">Join us to #MakeADifference!</p>
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
            <button className="bg-white text-blue-500 px-4 sm:px-6 py-2 rounded-full hover:bg-gray-200 text-sm sm:text-base">
              Find Opportunities
            </button>
            <button className="border border-white text-white px-4 sm:px-6 py-2 rounded-full hover:bg-white hover:text-blue-500 text-sm sm:text-base">
              Learn More
            </button>
          </div>
        </div>
        <div className="md:w-1/2 flex flex-col items-center md:items-end space-y-4">
          <h3 className="text-xl sm:text-2xl font-semibold">Latest Jobs</h3>
          <div className="bg-white text-black p-4 rounded-lg shadow-lg w-full max-w-sm">
            <Image
              src="/placeholder-group.jpg"
              alt="Group of people"
              width={300}
              height={150}
              className="rounded-lg w-full h-auto"
              sizes="(max-width: 640px) 100vw, 300px"
            />
            <p className="mt-2 text-sm sm:text-base">Lead Program to Bring Change</p>
            <p className="text-gray-500 text-xs sm:text-sm">GreenImpact, USA - $2500/OneTime</p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="flex flex-col md:flex-row p-4 sm:p-6 md:p-8 space-y-8 md:space-y-0 md:space-x-8 w-full">
        {/* Featured Events */}
        <section className="md:w-1/2">
          <h3 className="text-xl sm:text-2xl font-semibold mb-4">Featured Events</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="bg-green-100 p-4 rounded-lg">
                <Image
                  src={`/placeholder-event${index + 1}.jpg`}
                  alt={`Event ${index + 1}`}
                  width={200}
                  height={100}
                  className="rounded-lg w-full h-auto"
                  sizes="(max-width: 640px) 100vw, 200px"
                />
                <p className="mt-2 text-sm sm:text-base">Community Clean Up Event</p>
                <p className="text-gray-500 text-xs sm:text-sm">GreenImpact - 2024, USA</p>
              </div>
            ))}
          </div>
        </section>

        {/* Latest Jobs and Recent News */}
        <section className="md:w-1/2">
          <h3 className="text-xl sm:text-2xl font-semibold mb-4">Latest Jobs</h3>
          <div className="flex flex-wrap gap-2 sm:gap-4 mb-4">
            {['Program Manager', 'Field Coordinator', 'Outreach Specialist'].map((job, index) => (
              <button
                key={index}
                className="bg-green-500 text-white px-3 sm:px-4 py-2 rounded-lg text-sm sm:text-base"
              >
                {job}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-1 gap-4">
            {[
              { name: 'Flor Visor Rees', year: '2024' },
              { name: 'Molly Tyr Dor', year: '2024' },
              { name: 'Smach Ego Horo', year: '2024' },
            ].map((profile, index) => (
              <div key={index} className="flex space-x-4 p-4 bg-gray-100 rounded-lg">
                <Image
                  src="/placeholder-profile.jpg"
                  alt="Profile"
                  width={50}
                  height={50}
                  className="rounded-full w-10 h-10 sm:w-12 sm:h-12"
                  sizes="(max-width: 640px) 40px, 50px"
                />
                <div>
                  <p className="text-sm sm:text-base">{profile.name}</p>
                  <p className="text-gray-500 text-xs sm:text-sm">GreenImpact - {profile.year}</p>
                </div>
              </div>
            ))}
          </div>

          <h3 className="text-xl sm:text-2xl font-semibold mt-8 mb-4">Recent News</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { title: 'Do Be Orant', year: '2024' },
              { title: 'Job Abosts Doodlan', year: '2024' },
              { title: 'New Grant Open Opportunity', year: '2024' },
              { title: '$70 Million Initiative', year: '2024' },
            ].map((news, index) => (
              <div key={index} className="bg-gray-100 p-4 rounded-lg">
                <Image
                  src={`/placeholder-news${index + 1}.jpg`}
                  alt={`News ${index + 1}`}
                  width={150}
                  height={100}
                  className="rounded-lg w-full h-auto"
                  sizes="(max-width: 640px) 100vw, 150px"
                />
                <p className="mt-2 text-sm sm:text-base">{news.title}</p>
                <p className="text-gray-500 text-xs sm:text-sm">GreenImpact - {news.year}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;