import Link from "next/link";

type VolumeSectionProps = {
  startTop: boolean;
};

export function VolumeChapters({ startTop }: VolumeSectionProps) {
  const chapters = [
    "Capítulo 1: O Início",
    "Capítulo 2: A Jornada",
    "Capítulo 3: O Confronto",
    "Capítulo 4: A Queda",
    "Capítulo 5: O Renascimento",
    "Capítulo 6: O Chamado",
    "Capítulo 7: O Despertar",
    "Capítulo 8: Sombras do Passado",
    "Capítulo 9: O Encontro",
    "Capítulo 10: Ecos da Verdade",
    "Capítulo 11: A Tempestade",
    "Capítulo 12: O Sacrifício",
    "Capítulo 13: Vozes do Silêncio",
    "Capítulo 14: A Batalha Interior",
    "Capítulo 15: O Portal",
    "Capítulo 16: Fragmentos do Tempo",
    "Capítulo 17: O Julgamento",
    "Capítulo 18: Além da Escuridão",
    "Capítulo 19: O Retorno",
    "Capítulo 20: Luz e Cinzas",
    "Capítulo 21: O Último Suspiro",
    "Capítulo 22: A Promessa",
    "Capítulo 23: O Legado",
    "Capítulo 24: O Fim e o Recomeço",
  ];

  const order = startTop ? chapters : [...chapters].reverse();

  return (
    <div className="items-center justify-center w-full">
      <h4 className="text-xl font-semibold mb-4">Volume 1 : Fallen</h4>
      <ul className="flex flex-wrap justify-between">
        {order.map((chapter, index) => {
          const isColoredRow = Math.floor(index / 2) % 2 === 1;
          return (
            <li
              key={index}
              className={`
                  md:w-[49%] w-full border-b border-gray-200 dark:border-gray-700 p-3 flex flex-col gap-1
                  ${index % 2 === 0 ? "bg-gray-200/20 dark:bg-gray-700/20" : "bg-transparent dark:bg-transparent"}
                  ${isColoredRow ? "md:bg-gray-200/20 dark:md:bg-gray-600/20" : "md:bg-transparent dark:md:bg-transparent"}
                `}
            >
              <Link
                className="text-gray-900 hover:text-cyan-500 dark:text-cyan-400 dark:hover:text-cyan-600 transition"
                href={"/"}
              >
                {chapter}
              </Link>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                4 months ago
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
