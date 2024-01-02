"use client";

import React, { useEffect, useRef, useState } from "react";
import Linkitem from "./Linkitem";
import toast from "react-hot-toast";
import SuccessToast from "./toasts/SuccessToast";

const LinkMenu = () => {
  const [createMenuOpen, setCreateMenu] = useState(false);
  const [links, setLinks] = useState([
    {
      name: "Link 1",
      cratedAt: "23 aug 2023",
      url: "https://google.com/api/auth/92378283123",
    },
    {
      name: "Link 1",
      cratedAt: "23 aug 2023",
      url: "https://google.com/api/auth/92378283123",
    },
    {
      name: "Link 1",
      cratedAt: "23 aug 2023",
      url: "https://google.com/api/auth/92378283123",
    },
    {
      name: "Link 1",
      cratedAt: "23 aug 2023",
      url: "https://google.com/api/auth/92378283123",
    },
    {
      name: "Link 1",
      cratedAt: "23 aug 2023",
      url: "https://google.com/api/auth/92378283123",
    },
    {
      name: "Link 1",
      cratedAt: "23 aug 2023",
      url: "https://google.com/api/auth/92378283123",
    },
    {
      name: "Link 1",
      cratedAt: "23 aug 2023",
      url: "https://google.com/api/auth/92378283123",
    },
    {
      name: "Link 1",
      cratedAt: "23 aug 2023",
      url: "https://google.com/api/auth/92378283123",
    },

    {
      name: "Link 1",
      cratedAt: "23 aug 2023",
      url: "https://google.com/api/auth/92378283123",
    },
    {
      name: "Link 1",
      cratedAt: "23 aug 2023",
      url: "https://google.com/api/auth/92378283123",
    },

    {
      name: "Link 1",
      cratedAt: "23 aug 2023",
      url: "https://google.com/api/auth/92378283123",
    },
    {
      name: "Link 1",
      cratedAt: "23 aug 2023",
      url: "https://google.com/api/auth/92378283123",
    },

    {
      name: "Link 1",
      cratedAt: "23 aug 2023",
      url: "https://google.com/api/auth/92378283123",
    },
    {
      name: "Link 1",
      cratedAt: "23 aug 2023",
      url: "https://google.com/api/auth/92378283123",
    },
  ]);

  return (
    <div className="border relative border-secondary px-5 py-3 rounded max-w-[640px] min-w-[50vw] flex flex-col gap-y-4 items-start">
      <h3 className="text-xl text-text/90"> All links created by you</h3>
      <div className="h-[70vh] overflow-y-scroll flex flex-col gap-y-3 w-full">
        {links.map((link, i) => (
          <Linkitem link={link} key={i} />
        ))}
      </div>
      {createMenuOpen && (
        <CreateMenu
          links={links}
          setLinks={setLinks}
          setCreateMenu={setCreateMenu}
        />
      )}
      {!createMenuOpen && (
        <button
          className="bg-accent px-4 py-2 rounded-md hover:bg-accent/80 transition-all"
          onClick={() => setCreateMenu(true)}
        >
          Create
        </button>
      )}
    </div>
  );
};

const CreateMenu = ({ setLinks, links, setCreateMenu }) => {
  const nameInputRef = useRef(null);
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    if (nameInputRef.current) {
      nameInputRef.current.focus();
      nameInputRef.current.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [nameInputRef]);

  const handleCreate = async () => {
    toast.custom((t) => (
      <SuccessToast toast={t} message={"Link created successfully"} />
    ));
  };

  return (
    <div className="flex flex-col gap-y-3 mt-5 items-center w-full px-5">
      <h4 className="text-xl">Create a new Link</h4>
      <div className="flex items-center w-full gap-x-4 px-4 text-text/90 text-sm">
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Link name"
          className="bg-transparent outline-none px-3 py-2 w-1/2 rounded-md ring-1 ring-secondary/70 transition-all focus:ring-primary"
          ref={nameInputRef}
        />
        <input
          type="text"
          id="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Link URL"
          className="bg-transparent outline-none px-3 py-2 w-1/2 rounded-md ring-1 ring-secondary/70 transition-all focus:ring-primary"
        />
      </div>
      <div className="w-full flex items-center justify-end gap-x-3 px-4">
        <button
          className="bg-primary/90 hover:bg-primary/70 px-4 py-2 rounded transition-all"
          onClick={handleCreate}
        >
          Create
        </button>
        <button
          className="border-primary/90 border px-4 py-2 rounded hover:bg-primary/20"
          onClick={() => setCreateMenu(false)}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default LinkMenu;
