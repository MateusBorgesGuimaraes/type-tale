type TagsSectionProp = {
  tagsName: string[];
};

export function TagsSection({ tagsName }: TagsSectionProp) {
  const extendedTags = [...tagsName, ...tagsName];

  return (
    <div className="flex flex-col gap-4 overflow-hidden group">
      {/* Linha 1 */}
      <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <ul className="flex gap-6 flex-nowrap animate-marquee pause-on-hover">
          {extendedTags.map((tag, index) => (
            <li
              key={`row1-${index}`}
              className="font-semibold text-cyan-800 dark:text-cyan-200 py-1.5 px-6 rounded-[20px] bg-white dark:bg-gray-800 shadow-xs whitespace-nowrap"
            >
              {tag}
            </li>
          ))}
        </ul>
      </div>

      {/* Linha 2 (invertida) */}
      <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <ul className="flex gap-6 flex-nowrap animate-marquee-reverse pause-on-hover">
          {extendedTags.map((tag, index) => (
            <li
              key={`row2-${index}`}
              className="font-semibold text-cyan-800 dark:text-cyan-200 py-1.5 px-6 rounded-[20px] bg-white dark:bg-gray-800 shadow-xs whitespace-nowrap"
            >
              {tag}
            </li>
          ))}
        </ul>
      </div>

      {/* Linha 3 */}
      <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <ul className="flex gap-6 flex-nowrap animate-marquee pause-on-hover">
          {extendedTags.map((tag, index) => (
            <li
              key={`row3-${index}`}
              className="font-semibold text-cyan-800 dark:text-cyan-200 py-1.5 px-6 rounded-[20px] bg-white dark:bg-gray-800 shadow-xs whitespace-nowrap"
            >
              {tag}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
