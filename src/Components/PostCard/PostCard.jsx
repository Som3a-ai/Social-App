import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Image,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Textarea,
} from "@heroui/react";
import formatPostTime from "./formateDate";
import Comment from "../Comment/Comment";
import { Link, useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import PlaceHolder from "../PlaceHolder/PlaceHolder";
import CommentCreation from "../CommentCreation/CommentCreation";
import { useContext, useRef, useState } from "react";
import { TokenContext } from "../../Context/TokenContext";

export default function PostCard({ post, isPostDetails = false }) {
  const {
    user,
    createdAt,
    body,
    image,
    comments,
    privacy,
    likesCount,
    sharesCount,
    commentsCount,
    topComment,
    id,
  } = post;

  const navigate = useNavigate();

  const updatedInputValue = useRef(null);

  const query = useQueryClient();

  const [isEditeModeOn, setisEditeModeOn] = useState(false);

  const { photo, name, _id } = user;

  const { loggedUserId } = useContext(TokenContext);

  function deletePost() {
    return axios.delete(`https://route-posts.routemisr.com/posts/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
    });
  }

  function prepareUpdatedComment() {
    const formData = new FormData();

    if (updatedInputValue.current.value)
      formData.append("body", updatedInputValue.current.value);


    return formData
  }

  function getPostComment() {
    
    return axios.get(
      `https://route-posts.routemisr.com/posts/${id}/comments?`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      },
    );
  }

  function updatePost() {
    return axios.put(
      `https://route-posts.routemisr.com/posts/${id}`,
      prepareUpdatedComment(),
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      },
    );
  }

  const { isPending: isUpdating, mutate: update } = useMutation({
    mutationFn: updatePost,
    onSuccess: () => {
      query.invalidateQueries({
        queryKey: ["getFeed"],
      });
      setisEditeModeOn(false)
      console.log("post updated successfully")
    },
  });
  const { isPending, mutate } = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      query.invalidateQueries({
        queryKey: ["getFeed"],
      });
      console.log("post Deleted");
      isPostDetails ? navigate("/home") : "";
    },
  });

  const { data: postComments, isLoading } = useQuery({
    queryKey: ["getPostComment", id],
    queryFn: getPostComment,
    enabled: isPostDetails,
    select: (data) => data.data.data.comments,
  });

  return (
    <Card>
      <CardHeader className="block p-4">
        <div className="flex gap-3">
          <Image
            alt={`${name}'s profile pic`}
            height={40}
            radius="sm"
            src={photo}
            width={40}
          />
          <div className="flex flex-col ">
            <p className="font-extrabold text-foreground hover:underline cursor-pointer">
              {name}
            </p>
            <div className="flex flex-wrap items-center gap-1 text-xs text-muted-foreground">
              <p className="text-small text-default-500">
                {formatPostTime(createdAt)}
              </p>

              <span className="mx-1">·</span>
              <span className="capitalize flex items-center gap-0.5">
                <i className="fas fa-earth-africa"></i>
                {privacy}
              </span>
            </div>
          </div>

          <div className="ms-auto">
            <Dropdown>
              <DropdownTrigger className="cursor-pointer">
                <i className="fa-solid fa-ellipsis"></i>
              </DropdownTrigger>
              <DropdownMenu aria-label="Static Actions">
                <DropdownItem key="new">
                  <i className="fa-regular fa-bookmark me-1"></i>Save post
                </DropdownItem>
                {_id === loggedUserId && (
                  <>
                    <DropdownItem
                      key="edit"
                      onClick={() => setisEditeModeOn(true)}
                    >
                      <i className="fas fa-pen me-1"></i>Edit post
                    </DropdownItem>
                    <DropdownItem
                      key="delete"
                      className="text-danger"
                      color="danger"
                      onClick={mutate}
                    >
                      <i className="fa-regular fa-trash-can"></i> Delete post
                    </DropdownItem>
                  </>
                )}
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>

        <div className="mt-3">
          {body && !isEditeModeOn && (
            <p className="whitespace-pre-wrap text-sm leading-relaxed text-foreground">
              {body}
            </p>
          )}

          {isEditeModeOn && (
            <>
              <Textarea
                variant="bordered"
                minRows={4}
                ref={updatedInputValue}
                defaultValue={body}
                classNames={{
                  inputWrapper:
                    "border border-slate-300 bg-white rounded-2xl px-3 py-2 focus-within:border-[#1877f2] focus-within:ring-2 focus-within:ring-[#1877f2]/20",
                  input: "text-sm outline-none",
                }}
              />

              <div class="mt-2 flex items-center justify-end gap-2">
                <button
                  className="rounded-full border border-slate-300 bg-white px-3 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-100 cursor-pointer"
                  onClick={() => setisEditeModeOn(false)}
                >
                  Cancel
                </button>
                <button
                  className="rounded-full bg-[#1877f2] px-3 py-1.5 text-xs cursor-pointer font-bold text-white hover:bg-[#166fe5] disabled:opacity-60 disabled:cursor-not-allowed disabled:bg-blue-300"
                  onClick={update}
                  disabled={isUpdating}
                >
                  {isUpdating ? "Saving..." : "Save"}
                </button>
              </div>
            </>
          )}
        </div>
      </CardHeader>
      <CardBody className="p-0 pb-3">
        {image && <img src={image} />}

        <div className="px-4  pt-3 text-sm text-slate-500">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#1877f2] text-white">
                <i
                  className="fa-regular fa-thumbs-up"
                  style={{ color: "rgb(255, 255, 255)" }}
                ></i>
              </span>
              <span className="font-semibold transition cursor-default">
                {likesCount} Likes
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2 text-xs sm:gap-3 sm:text-sm">
              <span className="inline-flex items-center gap-1">
                <i className="fa-solid fa-share"></i>
                {sharesCount} Shares
              </span>

              <span>{commentsCount} Comments</span>

              <Link
                className="rounded-md px-2 py-1 text-xs font-bold text-[#1877f2] hover:bg-[#e7f3ff] cursor-pointer"
                to={`/postDetails/${id}`}
              >
                View details
              </Link>
            </div>
          </div>
        </div>
      </CardBody>
      <Divider />
      <CardFooter>
        <div className="grid grid-cols-3 gap-1 w-full">
          <button className="cursor-pointer flex items-center justify-center gap-1.5 rounded-md p-2 text-xs font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50 sm:gap-2 sm:text-sm text-slate-600 hover:bg-slate-100">
            <i className="fa-regular fa-thumbs-up text-xl"></i>
            <span>Like</span>
          </button>

          <Link
            className="cursor-pointer flex items-center justify-center gap-1.5 rounded-md p-2 text-xs font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50 sm:gap-2 sm:text-sm text-slate-600 hover:bg-slate-100"
            to={`/home`}
          >
            <i className="fa-regular fa-comment text-xl"></i>
            <span>Comment</span>
          </Link>

          <button className="cursor-pointer flex items-center justify-center gap-1.5 rounded-md p-2 text-xs font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50 sm:gap-2 sm:text-sm text-slate-600 hover:bg-slate-100">
            <i className="fa-solid fa-share text-xl"></i>
            <span>share</span>
          </button>
        </div>
      </CardFooter>

      {!isPostDetails && topComment && <Comment comment={topComment} showTopLabel={true}  />}
      {isLoading && <PlaceHolder />}
      {isPostDetails &&
        !isLoading &&
        postComments?.map((currComment) => {
          return <Comment comment={currComment} key={currComment.id} />;
        })}

      {isPostDetails && !isLoading && postComments?.length === 0 && (
        <div className="space-y-2">
          <div className="rounded-2xl border border-slate-200 bg-white px-4 py-8 text-center">
            <div className="mx-auto mb-3 inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#eef3ff] text-[#1877f2]">
              <i
                className="fa-regular fa-comment"
                style={{ color: "rgb(251, 251, 251);" }}
              ></i>
            </div>
            <p className="text-lg font-extrabold text-slate-800">
              No comments yet
            </p>
            <p className="mt-1 text-sm font-medium text-slate-500">
              Be the first to comment.
            </p>
          </div>
        </div>
      )}

      <div className="mt-3 p-3">
        <div className="flex items-start gap-2">
          <img
            alt="Paloma Gilliam"
            className="h-9 w-9 rounded-full object-cover"
            src="https://pub-3cba56bacf9f4965bbb0989e07dada12.r2.dev/linkedPosts/default-profile.png"
          />

          <div className="flex-1">
            <CommentCreation postId={id} queryKey={["getPostComment", id]} />
          </div>
        </div>
      </div>
    </Card>
  );
}
{
  /* <button class="flex w-full items-center gap-2 px-3 py-2 text-left text-sm font-semibold text-slate-700 hover:bg-slate-50">…</button>flex */
}
{
  /* <textarea maxlength="5000" class="min-h-[110px] w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm outline-none ring-[#1877f2]/20 focus:border-[#1877f2] focus:ring-2">update</textarea> */
}
