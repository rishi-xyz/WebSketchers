import { Navbar } from "@/components/Navbar";
//374151
export default function Home() {
  return (
    <>
      <Navbar />
      <section className="h-full w-full relative flex items-center justify-center flex-col bg-[radial-gradient(ellipse_250%_100%_at_center_right,#0066FF,#000000_20%)]">
        {/*Grids */}
        <div className=" absolute h-full w-full">
          <div className=" absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.5)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.3)_1px,transparent_1px)] bg-[size:44px_54px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
        </div>
        <div className="bg-gradient-to-r from-primary to-secondary-foreground text-transparent bg-clip-text relative -top-16">
          <h1 className="text-9xl font-bold text-center md:text-[200px]">
            WebSketchers
          </h1>
          <h2 className="text-white text-center text-2xl font-semibold uppercase tracking-wider">
            Craft Your Heart Out
          </h2>
        </div>
        <div className="flex justify-center items-center relative md:mt-[-70px]"></div>
      </section>
    </>
  );
}
