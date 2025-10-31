import { Title } from "@/components/ui/title/title";
import { subtractDate } from "@/lib/utils/subtract-date";
import { transformLinkImage } from "@/lib/utils/transform-link-image";
import { AnnoucementWithAuthor } from "@/types/annoucements";

export default function AnnoucementSection(data: AnnoucementWithAuthor) {
  return (
    <div className="max-w-[896px] w-full min-h-[calc(100vh-80px)]">
      <div className="sx:py-6 py-4">
        <img
          className="rounded-sm sx:max-h-[332px] max-h-56 w-full object-fit"
          src={transformLinkImage(data.image)}
          alt={data.title}
        />
      </div>
      <div className="text-center sx:pb-6 pb-4">
        <Title>{data.title}</Title>
      </div>
      <div className="text-gray-900 xms:text-xl text-base dark:text-gray-100">
        {data.content}
      </div>
      <div className="text-gray-900 xms:text-xl text-base dark:text-gray-100">
        {data.content}
      </div>
      <div className="text-gray-900 xms:text-xl text-base dark:text-gray-100">
        {data.content}
      </div>
      <div className="text-gray-500 dark:text-gray-400 font-base gap-1 sx:py-12 py-8">
        <p className="flex gap-2">
          by {data.author.username}
          <span className="text-sm text-white bg-blue-500 font-semibold py-0.5 px-1.5 rounded-sm">
            Publisher
          </span>
        </p>
        <p>{subtractDate(data.publishedAt)}</p>
      </div>
    </div>
  );
}
