"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const mockEvents = [
  {
    id: 1,
    title: "Scientific Results Conference",
    date: "2017-09-12",
    time: "9:00 AM - 6:00 PM",
    location: "410 Park Avenue",
    image: "/images/pexels-zhuhehuai-716276.jpg",
    description:
      "Before cats conquered the internet, they conquered the world—with a little help from their human serfs. Domesticated cats live pretty much everywhere except Antarctica, and a new study in Nature Ecology and Evolution helps to uncover how they...",
    link: "/events/1",
    price: "Free",
  },
  {
    id: 2,
    title: "Boost Your Teamworking Skills",
    date: "2017-09-15",
    time: "9:00 AM - 4:00 PM",
    location: "15 Eastern Road",
    image: "/images/undraw_hiring_8szx.svg",
    description:
      "Around 1.2 million wildebeest travel through East Africa each year during their migration. The move—the largest overland migration on the planet—is necessary for their survival, helping them keep up with moving rainfall and find plentiful...",
    link: "/events/2",
    price: "$5",
  },
  {
    id: 3,
    title: "Campus Tour 2017",
    date: "2017-09-19",
    time: "9:00 AM - 3:00 PM",
    location: "15 Hilton Street",
    image: "/images/ngo_job_board_india.jpg",
    description:
      "There are coffee shops, sports, restaurants and a multitude of great study spots. Whether you are a prospective student or already taking classes, feel free to explore and see what makes 'the campus on the hill' so special...",
    link: "/events/3",
    price: "Free",
  },
  {
    id: 4,
    title: "The Geographies of a Care-based Economy",
    date: "2017-10-22",
    time: "10:00 AM - 2:00 PM",
    location: "15 Hilton Street",
    image: "/images/wa.jpg",
    description:
      "Our sun might have been born with a non-identical twin. Dubbed Nemesis, it would have orbited the same point as our own star before wandering off into the galaxy. Nemesis has never been found, but a new analysis...",
    link: "/events/4",
    price: "Free",
  },
];

function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();
  return { day, month, year };
}

export default function EventsPage() {
  const [dateFilter, setDateFilter] = useState("");
  const [keyword, setKeyword] = useState("");

  const filteredEvents = mockEvents.filter((event) => {
    const matchesDate = dateFilter ? event.date === dateFilter : true;
    const matchesKeyword = keyword
      ? event.title.toLowerCase().includes(keyword.toLowerCase()) ||
        event.description.toLowerCase().includes(keyword.toLowerCase())
      : true;
    return matchesDate && matchesKeyword;
  });

  return (
    <main className="max-w-5xl mx-auto px-4 py-10 min-h-screen">
      <h1 className="text-4xl font-extrabold text-center text-[#1a2a3a] mb-2 tracking-tight">Events</h1>
      <div className="text-center text-gray-500 mb-8">Home &gt; Events</div>
      <form
        className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-10"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          type="date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          className="border border-gray-200 rounded-lg px-4 py-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-100 bg-white min-w-[180px]"
          placeholder="Date of Event"
        />
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="border border-gray-200 rounded-lg px-4 py-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-100 bg-white min-w-[180px]"
          placeholder="Keyword"
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-2 rounded-lg text-base shadow transition-colors"
        >
          SEARCH
        </button>
      </form>
      <div className="space-y-8">
        {filteredEvents.map((event) => {
          const { day, month, year } = formatDate(event.date);
          return (
            <div
              key={event.id}
              className="flex flex-col md:flex-row gap-6 items-center bg-white rounded-2xl shadow border border-gray-100 p-4 md:p-6"
            >
              <div className="flex-shrink-0 w-full md:w-48 h-36 md:h-32 relative rounded-xl overflow-hidden">
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  className="object-cover rounded-xl"
                  sizes="(max-width: 768px) 100vw, 192px"
                />
              </div>
              <div className="flex flex-row md:flex-col items-center md:items-start gap-4 md:gap-0 w-24 md:w-20 flex-shrink-0">
                <div className="text-blue-600 text-4xl font-extrabold leading-none">{day}</div>
                <div className="text-blue-600 text-lg font-semibold uppercase">{month}</div>
                <div className="text-gray-400 text-sm">{year}</div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-1">
                  <h2 className="text-xl font-bold text-[#1a2a3a] leading-tight mr-2">{event.title}</h2>
                  <span className="ml-auto inline-block bg-blue-50 text-blue-600 text-xs font-semibold px-3 py-1 rounded-full border border-blue-200">{event.price}</span>
                </div>
                <div className="text-gray-700 text-base font-medium mb-2 line-clamp-2">{event.description}</div>
                <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-2">
                  <span className="flex items-center gap-1"><svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg> {event.time}</span>
                  <span className="flex items-center gap-1"><svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 12.414a2 2 0 10-2.828 2.828l4.243 4.243a8 8 0 111.414-1.414z" /></svg> {event.location}</span>
                </div>
                <Link href={event.link} className="text-blue-600 font-semibold hover:underline text-sm">View Event &rarr;</Link>
              </div>
            </div>
          );
        })}
        {filteredEvents.length === 0 && (
          <div className="text-center text-gray-400 py-12 text-lg">No events found for your search.</div>
        )}
      </div>
    </main>
  );
} 