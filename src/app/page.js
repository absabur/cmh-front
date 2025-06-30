export default async function Home() {
  const backend = process.env.NEXT_PUBLIC_BACKEND_URL;

  const [eventRes, galleryRes, noticeRes, postRes, studentRes] =
    await Promise.all([
      fetch(`${backend}/api/event`, { cache: "no-store" }),
      fetch(`${backend}/api/gallery`, { cache: "no-store" }),
      fetch(`${backend}/api/notice`, { cache: "no-store" }),
      fetch(`${backend}/api/post`, { cache: "no-store" }),
      fetch(`${backend}/api/student`, { cache: "no-store" }),
    ]);

  const [events, galleries, notices, posts, students] = await Promise.all([
    eventRes.json(),
    galleryRes.json(),
    noticeRes.json(),
    postRes.json(),
    studentRes.json(),
  ]);

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      <h1 className="text-center text-3xl sm:text-4xl font-bold text-gray-900 mb-8">
        চাঁচাইতারা মাদলা যুক্ত উচ্চ বিদ্যালয়
      </h1>

      <Section title="Upcoming Events" href="/event">
        {events?.events?.slice(0, 2).map((event) => (
          <Card
            key={event._id}
            title={event.title}
            subtitle={`${event.eventDate}`}
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            }
          />
        ))}
      </Section>

      <Section title="Gallery Highlights" href="/gallery">
        {galleries?.galleries?.slice(0, 2).map((gallery) => (
          <Card
            key={gallery._id}
            title={gallery.title}
            subtitle={gallery.youtubeLink ? `YouTube: ${gallery.youtubeLink}` : ""}
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            }
          />
        ))}
      </Section>

      <Section title="Latest Notices" href="/notice">
        {notices?.notices?.slice(0, 2).map((notice) => (
          <Card
            key={notice._id}
            title={`${notice.title} (${notice.type})`}
            subtitle={`${notice.dateTime}`}
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
              </svg>
            }
          />
        ))}
      </Section>

      <Section title="Recent Posts" href="/post">
        {posts?.posts?.slice(0, 2).map((post) => (
          <Card
            key={post._id}
            title={post.title}
            subtitle={post.youtubeLink ? `YouTube: ${post.youtubeLink}` : ""}
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            }
          />
        ))}
      </Section>

      <Section title="New Members" href="/student">
        {students?.students?.slice(0, 2).map((student) => (
          <Card
            key={student._id}
            title={student.name}
            subtitle={`${student.type}`}
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            }
          />
        ))}
      </Section>
    </main>
  );
}

function Section({ title, href, children }) {
  return (
    <section className="bg-white rounded-2xl shadow-lg overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">{title}</h2>
          <a
            href={href}
            className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-indigo-100 text-indigo-900 hover:bg-indigo-200 transition-colors"
          >
            View All
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
      <div className="p-6">
        <div className="grid sm:grid-cols-2 gap-6">{children}</div>
      </div>
    </section>
  );
}

function Card({ title, subtitle, icon }) {
  return (
    <div className="border border-gray-200 rounded-xl p-5 bg-white hover:shadow-md transition-all duration-200">
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">
          {icon}
        </div>
        <div>
          <h3 className="font-bold text-gray-900">{title}</h3>
          {subtitle && (
            <p className="text-sm text-gray-600 mt-1">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}