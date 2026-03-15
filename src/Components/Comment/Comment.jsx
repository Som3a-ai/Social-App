import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Divider,
  Input,
} from "@heroui/react";
import formatPostTime from "../PostCard/formateDate";
import React, { useContext, useRef, useState } from "react";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TokenContext } from "./../../Context/TokenContext";

export default function Comment({ comment, showTopLabel = false }) {
  const {
    commentCreator,
    content,
    likes,
    createdAt,
    post,
    _id: commentId,
  } = comment;

  const { loggedUserId } = useContext(TokenContext);

  const [isEditModeOn, setisEditModeOn] = useState(false);
  const [tempContent, setTempContent] = useState(content);

  const editedCommentValue = useRef(null);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { name, photo, _id: userId } = commentCreator;

  function deleteComment() {
    return axios.delete(
      `https://route-posts.routemisr.com/posts/${post}/comments/${commentId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      },
    );
  }

  function updateComment() {
    return axios.put(
      `https://route-posts.routemisr.com/posts/${post}/comments/${commentId}`,
      prepareEditedComment(tempContent),
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      },
    );
  }

  function prepareEditedComment(data) {
    const formData = new FormData();

    formData.append("content", data);
    console.log(data);
    return formData;
  }

  const query = useQueryClient();

  const { isPendeing: isUpdating, mutate: update } = useMutation({
    mutationFn: updateComment,
    onSuccess: () => {
      setisEditModeOn(false);
      query.invalidateQueries({
        queryKey: ["getPostComment", post],
      });
      console.log("updated successfully")
    },
  });

  const { isPending, mutate } = useMutation({
    mutationFn: deleteComment,
    onSuccess: () => {
      console.log("Comment deleted successfully");
      query.invalidateQueries({
        queryKey: ["getPostComment", post],
      });
    },
  });

  return (
    <>
      <div className="mx-4 mb-4 rounded-2xl border border-slate-200 bg-slate-50 p-3">
        {showTopLabel && (
          <p className="mb-2 text-[11px] font-bold uppercase tracking-wide text-slate-500">
            Top Comment
          </p>
        )}

        <div className="flex items-start gap-2">
          <img
            alt={`${name}'s profile pic`}
            className="h-8 w-8 rounded-full object-cover"
            src={photo}
          />

          {!isEditModeOn && (
            <div className="min-w-0 flex-1 rounded-2xl bg-white px-3 py-2">
              <p className="truncate text-xs font-bold text-slate-900">
                {name}
              </p>
              <p className="mt-0.5 whitespace-pre-wrap text-sm text-slate-700">
                {content}
              </p>
            </div>
          )}

          {isEditModeOn && (
            <>
              <div className="flex  flex-wrap md:flex-nowrap gap-4">
                <Input
                  type="text"
                  className="w-full"
                  value={tempContent}
                  onChange={(e) => setTempContent(e.target.value)}
                />
                <button
                  className="px-3 py-1.5 cursor-pointer rounded-full disabled:cursor-not-allowed bg-[#1877f2] px-3 py-1.5 text-xs font-bold text-white hover:bg-[#166fe5] disabled:opacity-60"
                  onClick={update}
                  disabled={tempContent.length === 0 || isUpdating}
                >
                  Save
                </button>
                <button
                  className="px-3 py-1.5 cursor-pointer  rounded-full border  disabled:bg-blue-300 border-slate-300 bg-white px-3 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-100"
                  onClick={() => {
                    setTempContent(content);
                    setisEditModeOn(false);
                  }}
                >
                  Cancel
                </button>
              </div>
            </>
          )}
        </div>
        <button className="mt-2 text-xs font-bold text-[#1877f2] hover:underline cursor-pointer">
          View all Replies
        </button>

        <div className="mt-1.5 flex items-center justify-between px-1">
          <div className="flex items-center gap-4">
            <span className="text-xs font-semibold text-slate-400">
              {formatPostTime(createdAt)}
            </span>
            <button className="text-xs font-semibold hover:underline disabled:opacity-60 text-slate-500">
              Like ({likes.length})
            </button>
            <button className="text-xs font-semibold transition hover:underline disabled:opacity-60 text-slate-500 hover:text-[#1877f2]">
              Reply
            </button>
          </div>

          {loggedUserId === userId && (
            <>
              <div className="relative">
                <Dropdown>
                  <DropdownTrigger>
                    <i className="fa-solid fa-ellipsis cursor-pointer"></i>
                  </DropdownTrigger>
                  <DropdownMenu aria-label="Static Actions">
                    <DropdownItem
                      key="edit"
                      onClick={() => setisEditModeOn(true)}
                    >
                      <i className="fas fa-pen me-1"></i>Edit
                    </DropdownItem>
                    <DropdownItem
                      key="delete"
                      className="text-danger"
                      color="danger"
                      onClick={onOpen}
                    >
                      <i className="fa-regular fa-trash-can"></i> Delete
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>
            </>
          )}
        </div>
      </div>

      <Modal
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Confirm action
              </ModalHeader>
              <Divider />
              <ModalBody>
                <div className="flex items-start gap-3 p-4">
                  <div className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-rose-100 text-rose-600">
                    <i
                      className="fa-solid fa-triangle-exclamation"
                      style={{ color: "rgb(252, 116, 116)" }}
                    ></i>
                  </div>
                  <div>
                    <h5 className="text-sm font-extrabold text-slate-900">
                      Delete this comment?
                    </h5>
                    <p className="mt-1 text-sm text-slate-600">
                      This comment will be permanently removed.
                    </p>
                  </div>
                </div>
              </ModalBody>
              <Divider />
              <ModalFooter>
                <Button
                  color="default"
                  variant="bordered"
                  onPress={onClose}
                  className="font-bold"
                >
                  Cancel
                </Button>
                <Button
                  color="danger"
                  onPress={mutate}
                  className="font-bold disabled:cursor-not-allowed disabled:bg-red-300"
                  isDisabled={isPending}
                >
                  {isPending ? "Deleting...." : "Delete Comment"}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
