import Link from "next/link";

export function Footer() {
  const footerItems = [
    { title: "TEAMS", contents: ["About", "News", "Guides"] },
    {
      title: "CONTACT",
      contents: ["Authors", "Commercial", "Help", "Support"],
    },
    {
      title: "FEATURES",
      contents: [
        "Dowloads",
        "Be an author",
        "Privacy Policy",
        "Terms of service",
      ],
    },
  ];
  return (
    <footer className="full-bleed bg-white dark:bg-gray-900">
      <div className="wrapper">
        <div className="flex py-8 border-b border-gray-200 gap-6 justify-between flex-wrap">
          <Link href={"/"}>
            <img
              src={"/icon-black.svg"}
              alt="Typetale logo"
              className="dark:invert xms:w-[140px] xms:h-[56px] w-[100px] h-[38px]"
            />
          </Link>
          {footerItems.map((items, index) => (
            <div key={index} className="flex flex-col">
              <h4 className="mb-3 text-cyan-950 dark:text-cyan-400 font-semibold text-xl">
                {items.title}
              </h4>
              <div className="flex flex-col gap-2">
                {items.contents.map((content, index) => (
                  <Link
                    key={index}
                    href={"/"}
                    className="text-gray-500 dark:text-gray-300 hover:text-cyan-400 dark:hover:text-cyan-300 transition"
                  >
                    {content}
                  </Link>
                ))}
              </div>
            </div>
          ))}
          <div className="flex flex-col items-center">
            <h4 className="mb-3 text-cyan-950 dark:text-cyan-400 font-semibold text-xl">
              SOCIAL MEDIA
            </h4>
            <div className="flex gap-6">
              <Link href={"/"}>
                <img
                  className="max-w-6 max-h-6 w-full h-full dark:invert"
                  src="/instagram.svg"
                />
              </Link>
              <Link href={"/"}>
                <img
                  className="max-w-6 max-h-6 w-full h-full dark:invert"
                  src="/facebook.svg"
                />
              </Link>
              <Link href={"/"}>
                <img
                  className="max-w-6 max-h-6 w-full h-full dark:invert"
                  src="/maildotru.svg"
                />
              </Link>
            </div>
          </div>
        </div>
        <p className="text-center text-gray-900 dark:text-gray-50 font-medium py-4">
          ©TypeTale todos os direitos reservados
        </p>
      </div>
    </footer>
  );
}
