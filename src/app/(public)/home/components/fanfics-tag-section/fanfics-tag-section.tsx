import { Title } from "@/components/ui/title/title";

import { FANFICS_TAGS } from "@/lib/utils/mockup-arrays";
import { TagsSection } from "../tags-section/tags-section";

export function FanficsTagsSection() {
  return (
    <section aria-label="Top Fanfics tags" className="py-8 overflow-hidden">
      <div className="pb-6 mb-6 border-b border-gray-200 dark:border-gray-700">
        <Title>Top Fanfics Tags</Title>
      </div>
      <div className="relative min-w-[1200px] overflow-hidden">
        <TagsSection tagsName={FANFICS_TAGS} />
      </div>
    </section>
  );
}
