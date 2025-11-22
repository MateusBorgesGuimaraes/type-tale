import StatsCard from "@/app/(auth)/dashboard/components/stats-card/stats-card";
import LayoutBox from "@/components/ui/layout-box/layout-box";
import LinkButtonCustom from "@/components/ui/link-buttons/link-button-custom";
import { Title } from "@/components/ui/title/title";
import { transformLinkImage } from "@/lib/utils/transform-link-image";
import { Story } from "@/types/stories";
import {
  CirclePlusIcon,
  EyeIcon,
  HashIcon,
  PenToolIcon,
  StarIcon,
  UsersIcon,
} from "lucide-react";

type DetailsHeaderProps = {
  story: Story;
};

export default function DetailsHeader({ story }: DetailsHeaderProps) {
  return (
    <div>
      <div className="flex flex-col md:flex-row gap-4 md:gap-6">
        <div className="w-[160px] h-[240px] overflow-hidden mx-auto md:mx-0 flex-shrink-0">
          <img
            className="rounded-sm w-full h-full object-cover"
            src={transformLinkImage(story.coverUrl)}
            alt={story.title}
          />
        </div>
        <div className="w-full flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <Title>{story.title}</Title>
            <LinkButtonCustom
              link="/"
              className="sm:w-auto bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-md py-3 px-5 text-white hover:shadow-lg transition-all duration-300 whitespace-nowrap flex items-center justify-center gap-2"
            >
              <CirclePlusIcon className="w-5 h-5" />
              Create chapter
            </LinkButtonCustom>
          </div>
          <div className="flex flex-wrap gap-2 items-center text-sm sm:text-base">
            <p className="text-gray-800">
              <span className="text-gray-500">By</span> {story.author.username}
            </p>
            <span className="text-gray-400">/</span>
            <p className="text-gray-800">
              <span className="text-gray-500">In</span> {story.mainGenre}
            </p>
          </div>
          <button className="flex gap-1.5 bg-gray-300 py-1.5 px-3 rounded-sm text-gray-500 font-semibold uppercase text-xs sm:text-sm self-start items-center hover:bg-gray-400 transition cursor-pointer">
            <PenToolIcon className="w-4 h-4" />
            <p>Synopse</p>
          </button>
          <p className="text-gray-700 text-sm sm:text-base">{story.synopsis}</p>
        </div>
      </div>
      <div className="mt-6">
        <LayoutBox>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            <div className="w-full">
              <StatsCard
                icon={HashIcon}
                label="Chapters"
                value={story.chaptersCount || 0}
                color="bg-gradient-to-br from-green-500 to-green-600"
              />
            </div>
            <div className="w-full">
              <StatsCard
                icon={EyeIcon}
                label="Views"
                value={story.viewsCount || 0}
                color="bg-gradient-to-br from-purple-500 to-purple-600"
              />
            </div>
            <div className="w-full">
              <StatsCard
                icon={UsersIcon}
                label="Followers"
                value={story.followersCount || 0}
                color="bg-gradient-to-br from-pink-500 to-pink-600"
              />
            </div>
            <div className="w-full">
              <StatsCard
                icon={StarIcon}
                label="Rating Count"
                value={story.ratingCount || 0}
                color="bg-gradient-to-br from-yellow-500 to-yellow-600"
              />
            </div>
            <div className="w-full bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl p-5 text-white hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="text-center">
                <p className="text-sm opacity-90 font-medium mb-2">Status</p>
                <p className="text-xl font-bold">{story.status}</p>
              </div>
            </div>
          </div>
        </LayoutBox>
      </div>
    </div>
  );
}
