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
    <main className="max-w-6xl mx-auto px-4 py-8 space-y-12">
      <h1 className="text-center text-4xl font-extrabold text-blue-800 mb-12">
        চাঁচাইতারা মাদলা যুক্ত উচ্চ বিদ্যালয়
      </h1>

      <Section title="Upcoming Events" href="/event">
        {events?.events?.slice(0, 2).map((event) => (
          <Card
            key={event._id}
            title={event.title}
            subtitle={`📅 ${event.eventDate}`}
          />
        ))}
      </Section>

      <Section title="Gallery Highlights" href="/gallery">
        {galleries?.galleries?.slice(0, 2).map((gallery) => (
          <Card
            key={gallery._id}
            title={gallery.title}
            subtitle={
              gallery.youtubeLink ? `🎬 YouTube: ${gallery.youtubeLink}` : ""
            }
          />
        ))}
      </Section>

      <Section title="Latest Notices" href="/notice">
        {notices?.notices?.slice(0, 2).map((notice) => (
          <Card
            key={notice._id}
            title={`${notice.title} (${notice.type})`}
            subtitle={`🕒 ${notice.dateTime}`}
          />
        ))}
      </Section>

      <Section title="Recent Posts" href="/post">
        {posts?.posts?.slice(0, 2).map((post) => (
          <Card
            key={post._id}
            title={post.title}
            subtitle={post.youtubeLink ? `🎬 YouTube: ${post.youtubeLink}` : ""}
          />
        ))}
      </Section>

      <Section title="New Members" href="/student">
        {students?.students?.slice(0, 2).map((student) => (
          <Card
            key={student._id}
            title={student.name}
            subtitle={`🎓 ${student.type}`}
          />
        ))}
      </Section>
    </main>
  );
}

// ✅ Section Component
function Section({ title, href, children }) {
  return (
    <section className="bg-white shadow-md rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold text-gray-800">{title}</h2>
        <a
          href={href}
          className="text-sm text-blue-600 hover:underline font-medium"
        >
          See All →
        </a>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">{children}</div>
    </section>
  );
}

// ✅ Card Component
function Card({ title, subtitle }) {
  return (
    <div className="border rounded-lg p-4 bg-gray-50 hover:shadow-md transition">
      <h3 className="font-bold text-lg text-gray-700">{title}</h3>
      {subtitle && (
        <p className="text-sm text-gray-500 mt-1 whitespace-pre-line">
          {subtitle}
        </p>
      )}
    </div>
  );
}
