"use client";

import { FiClipboard } from "react-icons/fi";
import { FaRegCalendarAlt, FaEye, FaEdit } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import { MdUpdate } from "react-icons/md";

import { useState } from "react";
import toast from "react-hot-toast";
import SuccessToast from "./toasts/SuccessToast";

import { formatDistance } from "date-fns";
import axios from "axios";
import ErrorToast from "./toasts/ErrorToast";
import { toastIdGenerator } from "@/lib/toast/toastIdGenerator";

const Linkitem = ({ link, userId, setLinks }) => {
  const [hover, setHover] = useState(false);
  const [editMenuOpen, setEditMenuOpen] = useState(false);
  const [deleteMenuOpen, setDeleteMenuOpen] = useState(false);

  const handleCopy = async () => {
    try {
      let linkUrl = process.env.NEXT_PUBLIC_DOMAIN + "/u/" + link.shortId;
      linkUrl = linkUrl.replace(/^https?:\/\//, "");
      await window.navigator.clipboard.writeText(linkUrl);
      toast.custom(
        (t) => <SuccessToast message={"Short URL Copied to clipboard"} toast={t} />,
        {
          id: toastIdGenerator(),
        }
      );
    } catch (err) {
      toast.custom(
        (rt) => <ErrorToast message={"Failed to copy"} toast={t} />,
        { id: toastIdGenerator() }
      );
      console.error(err);
    }
  };

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
      {link.isNew && (
        <div className="ring-1 ring-accent top-2 right-2 absolute px-2 text-xs py-1 rounded-full">
          New
        </div>
      )}
      <h4 className="text-accent truncate w-2/3 text-lg">{link.name}</h4>
      <div className="flex items-center gap-x-2">
        <FiClipboard
          className="h-5 w-5 hover:text-text text-primary cursor-pointer transition-all"
          title="Copy"
          onClick={handleCopy}
        />
        <a
          href={link.url}
          target="_blank"
          className="text-primary w-3/4 truncate hover:underline"
        >
          {link.url}
        </a>
      </div>
      <div className="text-sm flex items-center gap-x-5">
        <div className="flex items-center gap-x-1.5" title="views">
          <FaEye />
          <span>{link.visits}</span>
        </div>
        <div className="flex items-center gap-x-1.5" title="Date of creation">
          <FaRegCalendarAlt />
          <span>
            {formatDistance(link.createdAt, new Date(), { addSuffix: true })}
          </span>
        </div>
        {link.updatedAt && (
          <div title="Date of updation" className="flex items-center gap-x-1.5">
            <MdUpdate className="h-4 w-4" />
            <span>
              {formatDistance(link.updatedAt, new Date(), {
                addSuffix: true,
              })}
            </span>
          </div>
        )}
      </div>
      {hover && (
        <div className="absolute right-2 top-14 flex gap-x-5 items-center justify-around">
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
        <EditMenu
          setLinks={setLinks}
          link={link}
          setEditMenuOpen={setEditMenuOpen}
          userId={userId}
        />
      )}

      {deleteMenuOpen && (
        <DeleteMenu
          setLinks={setLinks}
          link={link}
          setDeleteMenuOpen={setDeleteMenuOpen}
          userId={userId}
        />
      )}
    </div>
  );
};

const EditMenu = ({ link, setEditMenuOpen, userId, setLinks }) => {
  const [name, setName] = useState(link.name);
  const [url, setUrl] = useState(link.url);

  const handleUpdate = async () => {
    const response = await axios.post("/api/links/update", {
      userId,
      _id: link._id,
      name,
      url,
    });

    if (response.status === 200) {
      setLinks((prev) => {
        let newLinks = prev.filter((ele) => {
          return ele._id != link._id;
        });

        return [{ ...link, name, url }, ...newLinks];
      });
      toast.custom(
        (t) => <SuccessToast message={"Link updated successfully"} toast={t} />,
        { id: toastIdGenerator() }
      );
      setEditMenuOpen(false);
    } else {
      toast.custom(
        (t) => (
          <ErrorToast
            message={"Unable to update this link, try again"}
            toast={t}
          />
        ),
        { id: toastIdGenerator() }
      );
    }
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

const DeleteMenu = ({ link, setDeleteMenuOpen, userId, setLinks }) => {
  const handleDelete = async () => {
    const response = await axios.post("/api/links/delete", {
      userId,
      _id: link._id,
    });

    if (response.status === 200) {
      setLinks((prev) => {
        return prev.filter((ele) => {
          return ele._id != link._id;
        });
      });
      toast.custom(
        (t) => <SuccessToast message={"Link deleted successfully"} toast={t} />,
        { id: toastIdGenerator() }
      );
      setDeleteMenuOpen(false);
    } else {
      toast.custom(
        (t) => (
          <ErrorToast
            message={"Unable to delete this link, try again"}
            toast={t}
          />
        ),
        { id: toastIdGenerator() }
      );
    }
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
