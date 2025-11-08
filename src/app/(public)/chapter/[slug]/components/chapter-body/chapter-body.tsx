import { LinkButton } from "@/components/ui/link-buttons/link-button";
import Link from "next/link";

type ChapterBodyProps = {
  chapterTitle: string;
  chapterContent: string;
  chapterPostion: number;
  nextChapter: string | undefined;
  prevChapter: string | undefined;
};

export default function ChapterBody({
  chapterContent,
  chapterTitle,
  nextChapter,
  prevChapter,
  chapterPostion,
}: ChapterBodyProps) {
  return (
    <div className="w-[896px] max-w-full">
      <h1 className="text-cyan-800 dark:text-cyan-600 font-semibold sx:text-3xl text-xl pt-3 sx:pb-12 pb-6">
        Chapter {chapterPostion} : {chapterTitle}
      </h1>
      <div className="sx:text-xl text-lg leading-8 flex flex-col gap-4">
        <p>The capital shone that night, though no one could call it joyful.</p>{" "}
        <p>
          Silver lanterns drifted along the winding canals of Asterhall, their
          reflections swaying like pale ghosts on the dark water. The scent of
          incense clung to the air, masking — but not erasing — the lingering
          trace of blood that had soaked into the palace stones three nights
          prior.
        </p>{" "}
        <p>
          Princess Elara walked among the crowd in silence, her hood drawn low.
          She should have been inside the palace, wrapped in velvet and guarded
          by ten swords at every corner. But that place was no home to her now —
          only a gilded cage built from grief and lies.
        </p>{" "}
        <p>
          Her father’s crown, the Blood Crown, rested tonight on another’s head.
        </p>{" "}
        <p>King Alistair.</p> <p>Her uncle.</p> <p>Her usurper.</p>{" "}
        <p>
          “You shouldn’t have come here,” whispered Kael beside her. He moved
          like a shadow, always close, always ready. His hand rested near the
          hilt of his blade, though his face remained unreadable.
        </p>{" "}
        <p>
          “I needed to see the city,” Elara murmured. “I needed to know if they
          mourn him.”
        </p>{" "}
        <p>
          Kael’s jaw tightened. “They do. But fear is a heavy hand, Princess. No
          one dares light a candle for the dead king while the new one watches.”
        </p>{" "}
        <p>
          A gust of cool river wind scattered the lanterns. Some dipped,
          flickered, and extinguished — swallowed by the dark.
        </p>{" "}
        <p>Elara stopped walking.</p>{" "}
        <p>
          The crowd moved around her, drifting past like a slow-moving river of
          masks, veils, and hollow celebration. The Night of Silver Lanterns — a
          festival meant to honor ancestors. And yet tonight, it felt like a
          funeral no one dared acknowledge.
        </p>{" "}
        <p>
          “My father did not die of illness,” Elara said, voice trembling. Not
          from weakness — but from fury carefully held. “He was murdered.
          Poisoned. And the Blood Crown placed upon his killer.”
        </p>{" "}
        <p>
          Kael didn’t answer. He didn’t need to. He had been there. He had seen
          the king’s final breath.
        </p>{" "}
        <p>He had seen the smirk on Alistair’s lips.</p>{" "}
        <p>“What will you do?” Kael asked softly.</p>{" "}
        <p>
          Elara lifted her gaze to the palace on the hill — bathed in
          torchlight, guarded by battalions, its banners no longer crimson and
          gold, but black threaded with silver thorns.
        </p>{" "}
        <p>“I will reclaim what is mine,” she said.</p>{" "}
        <p>“Even if it means war?”</p>{" "}
        <p>
          “No…” Elara’s expression hardened like steel cooling in water. “War
          will come on its own. I will *end* it.”
        </p>{" "}
        <p>A sudden chime echoed across the canals — the midnight bell.</p>{" "}
        <p>
          Lanterns were released into the sky, thousands of silver lights rising
          at once, like souls escaping their bodies.
        </p>{" "}
        <p>
          Elara watched them, and in their wavering glow, she whispered a vow
          that only the river heard:
        </p>{" "}
        <p>
          “Father… I will not let your blood be the foundation of a tyrant’s
          throne.”
        </p>{" "}
        <p>
          Kael turned to her with the ghost of a smile. “Then the rebellion
          begins tonight.”
        </p>{" "}
        <p>Elara lowered her hood.</p>{" "}
        <p>For the first time in three nights, she did not hide.</p>{" "}
        <p>
          And far above them, in the palace tower, King Alistair watched the
          lanterns rise — and saw <em>her</em> among the crowd. His expression
          did not change, save for a faint curve of amusement.
        </p>{" "}
        <p>“The game begins, niece,” he whispered into the dark.</p>
      </div>
      <div className="flex flex-col gap-3 py-12 items-center justify-center">
        {nextChapter ? (
          <LinkButton text="NEXT CHAPTER" link={`/chapter/${nextChapter}`} />
        ) : (
          <LinkButton
            disabled
            text="NEXT CHAPTER"
            link={`/chapter/${nextChapter}`}
          />
        )}
        {prevChapter ? (
          <Link
            href={`/chapter/${prevChapter}`}
            className="text-gray-500 dark:text-gray-400 hover:text-gray-300 dark:hover:text-gray-300 border-b-2 font-medium border-gray-500 dark:border-gray-400 hover:border-gray-300 dark:hover:border-gray-300 transition md:text-base text-sm"
          >
            PREVIOUS CHAPTER
          </Link>
        ) : (
          <div className="text-gray-400 dark:text-gray-500 border-b-2 font-medium border-gray-400 dark:border-gray-500 md:text-base text-sm">
            PREVIOUS CHAPTER
          </div>
        )}
      </div>
    </div>
  );
}
