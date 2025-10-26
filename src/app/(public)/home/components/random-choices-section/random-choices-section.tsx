import { SimpleStoryCard } from "@/components/ui/story-cards/simple-story-card";
import { Title } from "@/components/ui/title/title";
import { getRamdomStories } from "@/lib/api/stories";

export async function RandomChoicesSection() {
  const { data: ramdomStoriesData } = await getRamdomStories();
  return (
    <div className="pb-8">
      <div className="pt-8 pb-6 border-b border-gray-200 dark:border-gray-700">
        <Title>Random Choices</Title>
      </div>
      <ul className="flex mt-6 lg:gap-7 gap-4 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 snap-x snap-mandatory">
        {ramdomStoriesData.map(({ id, mainGenre, coverUrl, title }) => (
          <li className="flex-shrink-0 snap-start" key={id}>
            <SimpleStoryCard
              mainGenre={mainGenre}
              id={id}
              coverUrl={coverUrl}
              title={title}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
