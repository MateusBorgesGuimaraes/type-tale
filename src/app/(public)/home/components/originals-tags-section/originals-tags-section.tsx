import { Title } from "@/components/ui/title/title";
import { ORIGINALS_TAGS } from "@/lib/utils/mockup-arrays";
import { TagsSection } from "../tags-section/tags-section";

export function OriginalsTagsSection() {
  return (
    <section aria-label="Top Originals tags" className="py-8 overflow-hidden">
      <div className="pb-6 mb-6 border-b border-gray-200 dark:border-gray-700">
        <Title>Top Originals Tags</Title>
      </div>
      <div className="relative min-w-[1200px] overflow-hidden">
        <TagsSection tagsName={ORIGINALS_TAGS} />
      </div>
    </section>
  );
}
