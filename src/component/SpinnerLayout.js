import React from "react";

export function SpinnerLayout() {
  return (
    <div class="flex flex-row gap-4 h-screen w-full justify-center items-center">
      <h1 className="text-2xl text-red-500 animate-bounce">Loading </h1>
      <div class="size-6 rounded-full bg-red-500 animate-bounce"></div>
      <div class="size-6 rounded-full bg-red-500 animate-bounce [animation-delay:-.3s]"></div>
      <div class="size-6 rounded-full bg-red-500 animate-bounce [animation-delay:-.5s]"></div>
    </div>
  );
}

export function SpinnerLayout1() {
  return (
    <div class="text-center flex flex-col gap-4 h-screen w-full justify-center items-center">
      <div class="size-14 border-4 border-dashed rounded-full animate-spin border-yellow-500 mx-auto"></div>
      <h2 class="text-zinc-900 dark:text-white mt-4 text-2xl">Loading...</h2>
      {/* <p class="text-zinc-600 dark:text-zinc-400">
        Your adventure is about to begin
      </p> */}
    </div>
  );
}
