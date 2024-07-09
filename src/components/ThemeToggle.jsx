import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import clsx from "clsx";
import { RxSun } from "react-icons/rx";
import { RxMoon } from "react-icons/rx";

const ThemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    document.body.className = clsx({ dark: isDarkMode });
  }, [isDarkMode]);

  return (
    <div className="flex w-full justify-end">
      <Button className="m-2" size="icon" onClick={toggleTheme}>
        {isDarkMode ? (
          <RxSun className="size-5" />
        ) : (
          <RxMoon className="size-5" />
        )}
      </Button>
    </div>
  );
};

export default ThemeToggle;
