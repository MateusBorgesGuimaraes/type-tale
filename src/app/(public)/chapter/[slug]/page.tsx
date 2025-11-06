import ChapterBody from "./components/chapter-body/chapter-body";
import ChapterHeader from "./components/chapter-header/chapter-header";

export default async function ChapterPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return (
    <section>
      <ChapterHeader />
      <div className="flex items-center justify-center">
        <ChapterBody />
      </div>
    </section>
  );
}
