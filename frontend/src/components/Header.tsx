import React from "react";

export default function Header() {
  return (
    <header className="w-full flex fixed top-0 left-0 bg-white items-center h-[80px] p-[20px] border-b-[1px] border-b-customGrey">
      <a href="/" className="text-xl text-customPurple">
        🌍 Countries App
      </a>
    </header>
  );
}
