"use client";

import { IoLink } from "react-icons/io5";
import { FaRegCalendarAlt, FaEye, FaEdit } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import { use, useState } from "react";
import toast from "react-hot-toast";
import SuccessToast from "./toasts/SuccessToast";
const Linkitem = ({ link }) => {
  const [hover, setHover] = useState(false);
  const [editMenuOpen, setEditMenuOpen] = useState(false);
  const [deleteMenuOpen, setDeleteMenuOpen] = useState(false);

  return (
    <div
      className={`relative border border-primary/50 rounded-md px-5 py-3 flex flex-col gap-y-2 ${
        hover && "bg-primary/20"
      } ${editMenuOpen && `bg-primary/30`}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => {
        setHover(false);
      }}
    >
      <h4 className="text-accent truncate w-2/3 text-lg">{link.name}</h4>
      <div className="flex items-center gap-x-2">
        <IoLink className="h-6 w-6 text-primary" />
        <h4 className="text-primary w-3/4 truncate">{link.url}</h4>
      </div>
      <div className="text-sm flex items-center gap-x-5">
        <div className="flex items-center gap-x-1" title="views">
          <FaEye />
          <span>{link.views || 20}</span>
        </div>
        <div className="flex items-center gap-x-1" title="Date of creation">
          <FaRegCalendarAlt />
          <span>{link.cratedAt}</span>
        </div>
      </div>
      {hover && (
        <div className="absolute right-2 top-10 flex gap-x-5 items-center justify-around">
          <FaEdit
            className="h-8 w-8 text-primary cursor-pointer"
            title="Edit"
            onClick={() => {
              setEditMenuOpen(!editMenuOpen), setDeleteMenuOpen(false);
            }}
          />
          <AiOutlineDelete
            className="h-8 w-8 text-accent cursor-pointer"
            title="Delete"
            onClick={() => {
              setDeleteMenuOpen(!deleteMenuOpen);
              setEditMenuOpen(false);
            }}
          />
        </div>
      )}

      {editMenuOpen && (
        <EditMenu link={link} setEditMenuOpen={setEditMenuOpen} />
      )}

      {deleteMenuOpen && (
        <DeleteMenu link={link} setDeleteMenuOpen={setDeleteMenuOpen} />
      )}
    </div>
  );
};

const EditMenu = ({ link, setEditMenuOpen }) => {
  const [name, setName] = useState(link.name);
  const [url, setUrl] = useState(link.url);

  const handleUpdate = async () => {
    toast.custom((t) => <SuccessToast toast={t} message={"Link updated"} />);
  };

  return (
    <div className="flex flex-col gap-y-3 mt-5 items-center">
      <h4 className="text-xl">Update this Link</h4>
      <div className="flex items-center w-full gap-x-4 px-4 text-text/90 text-sm">
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="bg-transparent outline-none px-3 py-2 w-1/2 rounded-md ring-1 ring-secondary/70 transition-all focus:ring-primary"
        />
        <input
          type="text"
          id="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="bg-transparent outline-none px-3 py-2 w-1/2 rounded-md ring-1 ring-secondary/70 transition-all focus:ring-primary"
        />
      </div>
      <div className="w-full flex items-center justify-end gap-x-3">
        <button
          className="bg-primary/90 hover:bg-primary/70 px-4 py-2 rounded transition-all"
          onClick={handleUpdate}
        >
          Update
        </button>
        <button
          className="border-primary/90 border px-4 py-2 rounded hover:bg-primary/20"
          onClick={() => setEditMenuOpen(false)}
        >
          Close
        </button>
      </div>
    </div>
  );
};

const DeleteMenu = ({ link, setDeleteMenuOpen }) => {
  const handleDelete = async () => {
    toast.custom((t) => (
      <SuccessToast message={"Link deleted successfully"} toast={t} />
    ));
  };
  return (
    <div className="flex flex-col gap-y-3 items-center mt-5">
      <h3 className="animate-pulse">
        Are you sure that you want to delete this Link?
      </h3>
      <div>
        <div className="w-full flex items-center justify-end gap-x-3">
          <button
            className="bg-accent/90 hover:bg-accent/70 px-4 py-2 rounded transition-all"
            onClick={handleDelete}
          >
            Yes, delete
          </button>
          <button
            className="border-primary/90 border px-4 py-2 rounded hover:bg-primary/20"
            onClick={() => setDeleteMenuOpen(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Linkitem;
