/** @format */

"use client";

import { useState, useRef } from "react";
import {
  Textarea,
  Label,
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/common/components";
import { Image, X } from "lucide-react";
import { updatePost } from "../services/post-service";

const EditPostDialog = ({ post, setPosts, posts, isOpen, onClose }) => {
  const [formData, setFormData] = useState({ content: post.content, image: post.image });
  const [image, setImage] = useState(null); // Yalnız yeni seçilən şəkil
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) =>
        setFormData((prev) => ({ ...prev, image: { url: e.target.result } }));
      reader.readAsDataURL(file);
      setImage(file);
    }
  };

  const handleRemoveImage = () => {
    setFormData((prev) => ({ ...prev, image: null }));
    setImage(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const index = posts.findIndex((el) => post._id === el._id);
    const form = new FormData();

    form.append("content", formData.content);
    if (image) {
      form.append("image", image); // Yalnız yeni şəkil varsa göndər
    }

    const { data, success } = await updatePost(post._id, form);

    if (success) {
      posts[index] = data;
      setPosts([...posts]);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Post</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleChange}
                rows={5}
                required
              />
            </div>

            <div className="grid gap-2">
              <Label>Image</Label>
              {formData.image?.url ? (
                <div className="relative">
                  <img
                    src={formData.image.url}
                    alt="Post image"
                    className="max-w-full h-72 rounded-lg"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2"
                    onClick={handleRemoveImage}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => fileInputRef.current.click()}>
                  <Image className="mr-2 h-4 w-4" />
                  Add Image
                </Button>
              )}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                accept="image/*"
                className="hidden"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditPostDialog;
