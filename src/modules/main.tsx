"use client";

import { useState } from "react";

const Home = () => {
  return <div>Home</div>;
};

const Faq = () => {
  return <div>Faq</div>;
};

enum ModuleEnum {
  "Home" = "Home",
  "Faq" = "Faq",
}

export const ModuleManagment = () => {
  const [module, setModule] = useState<ModuleEnum>(ModuleEnum.Home); // refactor to diferent pages

  const selectModule = {
    [ModuleEnum.Home]: <Home />,
    [ModuleEnum.Faq]: <Faq />,
  }[module];

  const handleUpdateModule = (newModule: ModuleEnum) => {
    setModule(newModule);
  };

  return (
    <main className="min-h-screen h-full">
      <div className="flex w-full h-screen">
        <div className="h-full flex flex-col bg-teal-700">
          <button
            type="button"
            onClick={() => handleUpdateModule(ModuleEnum.Home)}
            className="px-3 py-2 min-w-[10rem] text-left hover:bg-teal-600 transition-all duration-150 text-white"
          >
            Home
          </button>
          <button
            type="button"
            onClick={() => handleUpdateModule(ModuleEnum.Faq)}
            className="px-3 py-2 min-w-[10rem] text-left hover:bg-teal-600 transition-all duration-150 text-white"
          >
            Faq
          </button>
        </div>

        <div className="px-24">{selectModule}</div>
      </div>
    </main>
  );
};
