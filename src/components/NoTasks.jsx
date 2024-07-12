import { HiMiniTrophy } from "react-icons/hi2";

export default function NoTasks() {
  return (
    <div className="flex flex-col w-full max-w-sm  items-center mt-28">
      {/* <img src="/task-app-logo.svg" alt="Task App Logo" className="size-32" /> */}
      <HiMiniTrophy className="size-28 text-yellow-500" />
    </div>
  );
}
