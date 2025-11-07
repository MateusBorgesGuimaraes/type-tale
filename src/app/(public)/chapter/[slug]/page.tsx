import ChapterSection from "./components/chapter-section/chapter-section";

export default async function ChapterPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return (
    <section>
      <ChapterSection />
    </section>
  );
}
