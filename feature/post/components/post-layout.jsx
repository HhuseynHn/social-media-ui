/** @format */

"use client";

import { useEffect, useState } from "react";
import Post from "./post";
import CreatePost from "./create-post";
import EditPostDialog from "./edit-post-dialog";
import DeleteConfirmDialog from "./delete-confirm-dialog";
import { deletePost, getPosts } from "../services/post-service";

export default function PostLayout() {
  const currentUser = "Current User"; // This would typically come from an authentication system
  const userAvatar = "/placeholder.svg?height=40&width=40"; // This would typically come from user data
  const [image, setImage] = useState(null);
  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState("");
  const [editingPost, setEditingPost] = useState(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);

  useEffect(() => {
    getPosts()
      .then((data) => {
        if (data.success) {
          setPosts(data.data);
          console.log(data);
        }
      })
      .catch((error) => {
        console.log("err in post", error);
      });
  }, []);

  const handleEdit = (post) => {
    console.log("pst", post)
    setEditingPost(post);
    setIsEditDialogOpen(true);
  };

  const handleSaveEdit = async (updatedPost) => {
    console.log("handleSaveEdit")
    const formData = new FormData();
    console.log("Image_PLYT", image);
    if (image) {
      formData.append("image", image);
    }

    if (content.trim()) {
      formData.append("content", content.trim());
    }
    try {
      if (image || content.trim()) {
        const res = await updatedPost(formData);
        if (res.success) {
          setPosts((prevPosts) => [res.data, ...prevPosts]);
          console.log("HandleSave", res)
          setImage(null);
          setContent("");
        } else {
          console.log("Yükləmə uğursuz oldu!");
        }
      }
    } catch (error) {
      console.error("Upload Hatası:", error);
    }
    setIsEditDialogOpen(false);
    setEditingPost(null);
  };

  const handleDeleteConfirm = (postId) => {
    setPostToDelete(postId);
    setIsDeleteDialogOpen(true);
  };

  const handleDelete = async () => {
    if (!postToDelete) return;
    try {
      const response = await deletePost(postToDelete);
      if (response.success) {
        setPosts(posts.filter((post) => post._id !== postToDelete));
      }
    } catch (error) { }
    setIsDeleteDialogOpen(false);
    setPostToDelete(null);
  };

  const handleReact = (postId, user, reactionType) => {
    setPosts(
      posts.map((post) =>
        post.id === postId
          ? {
            ...post,
            reactions: post.reactions.some((r) => r.user === user)
              ? post.reactions.map((r) =>
                r.user === user ? { ...r, type: reactionType } : r
              )
              : [...post.reactions, { user, type: reactionType }],
          }
          : post
      )
    );
  };

  const handleAddComment = (postId, content) => {
    setPosts(
      posts.map((post) =>
        post.id === postId
          ? {
            ...post,
            comments: [
              ...post.comments,
              {
                id: Date.now(),
                author: currentUser,
                avatar: userAvatar,
                content,
              },
            ],
          }
          : post
      )
    );
  };

  const closeEditDialog = () => {
    setIsEditDialogOpen(false);
    setEditingPost(null);
  };

  const closeDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
    setPostToDelete(null);
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-6">
      <CreatePost
        currentUser={currentUser}
        userAvatar={userAvatar}
        setPosts={setPosts}
        posts={posts}
      />

      {posts?.map((post, index) => (
        <Post
          key={index + post._id}
          {...post}
          currentUser={currentUser}
          onEdit={() => handleEdit(post)}
          onDeleteConfirm={handleDeleteConfirm}
          onReact={handleReact}
          onAddComment={handleAddComment}
        />
      ))}

      {editingPost && (
        <EditPostDialog
          post={editingPost}
          posts={posts}
          setPosts={setPosts}
          isOpen={isEditDialogOpen}
          onClose={closeEditDialog}
          // onSave={handleSaveEdit}
          onSave={() => { console.log("Salam men isledim") }}
        />
      )}

      <DeleteConfirmDialog
        isOpen={isDeleteDialogOpen}
        onClose={closeDeleteDialog}
        onConfirm={() => handleDelete()}
      />
    </main>
  );
}
