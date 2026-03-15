import { Textarea } from "@heroui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useForm } from "react-hook-form";

export default function CommentInput({ postId, queryKey }) {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      content: "",
      image: "",
    },
  });

 

  const query = useQueryClient();

  const {isPending, mutate } = useMutation({
    mutationFn: sendComment,
    onSuccess: () => {
      console.log("success");
      query.invalidateQueries({
        queryKey: queryKey,
      });
      reset();
    },
  });

  function sendComment(formData) {
    return axios.post(
      `https://route-posts.routemisr.com/posts/${postId}/comments`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      },
    );
  }

  function createComment(obj) {

     const formData = new FormData();
    if (!obj.content && !obj.image) return;

    if (obj.content) {
      formData.append("content", obj.content);
    }
    if (obj.image[0]) {
      formData.append("image", obj.image[0]);
    }

    mutate(formData);
  }

  return (
    <>
      <form onSubmit={handleSubmit(createComment)}>
        <div className="relative">
          <Textarea
            {...register("content")}
            placeholder="Comment as Paloma Gilliam..."
            minRows={2}
            classNames={{
              inputWrapper: "bg-gray-100 rounded-xl pr-16 pb-10 pt-3",
              input: "text-sm",
            }}
          />

          <div className="absolute bottom-2 left-3 flex items-center gap-3 text-gray-500 ">
            <label className="hover:text-gray-700 cursor-pointer">
              <i className="fa-regular fa-image"></i>
              <input type="file" hidden {...register("image")} />
            </label>
          </div>

          <button
            type="submit"
            className={`absolute bottom-2 right-3 bg-blue-400 rounded-2xl p-2 grid place-items-center text-white ${isPending ? "cursor-not-allowed" : "cursor-pointer"} `}
            disabled={isPending}
          >
            {!isPending ? (
              <i className="fa-solid fa-paper-plane"></i>
            ) : (
              <i className="fa-solid fa-circle-notch animate-spin"></i>
            )}
          </button>
        </div>
      </form>
    </>
  );
}
