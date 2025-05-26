/** @format */

"use client";

import { useState, useRef, useEffect } from "react";
import {
  Button,
  Textarea,
  Card,
  CardContent,
  CardFooter,
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/common/components";
import { Image, X } from "lucide-react";
import { postPost } from "../services/post-service";
import { useRouter } from "next/navigation";
import { getMe } from "@/feature/profile/services/profile-service";

const CreatePost = ({ currentUser, userAvatar, setPosts, posts }) => {
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const fileInputRef = useRef(null);
  const router = useRouter();

  const [userName, setUserName] = useState("");
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    getMe().then((res) => {
      setUserName(res.data.userName);
      setAvatar(res.data.avatar?.url);
    });
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      console.log("Seçilen dosya:", file);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    
    if (image) {
      formData.append("image", image);
    }

    if (content.trim()) {
      formData.append("content", content.trim());
    }
    try {
      if (image || content.trim()) {
        const res = await postPost(formData);
        if (res.success) {
          setPosts((prevPosts) => [res.data, ...prevPosts]);
          setImage(null);
          setContent("");
        } else {
          console.log("Yükləmə uğursuz oldu!");
        }
      }
    } catch (error) {
      console.error("Upload Hatası:", error);
    }
  };

  return (
    <Card className="w-full max-w-2xl mb-6">
      <form onSubmit={handleUpload}>
        <CardContent className="pt-6">
          <div className="flex items-start space-x-4">
            <Avatar>
              {avatar ? (
                <AvatarImage src={avatar} />
              ) : (
                <AvatarFallback>{userName[0]}</AvatarFallback>
              )}
            </Avatar>
            <div className="flex-grow space-y-4">
              <Textarea
                placeholder={`What's on your mind, ${currentUser}?`}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full"
              />
              {image && (
                <div className="relative">
                  <img
                    src={URL.createObjectURL(image)}
                    alt="Preview"
                    className="max-w-full max-h-80 rounded-lg"
                  />
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2"
                    onClick={() => setImage(null)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={() => fileInputRef.current.click()}>
            <Image className="mr-2 h-4 w-4" />
            Add Image
          </Button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageChange}
            accept="image/*"
            className="hidden"
          />
          {/* <Button type="button" onClick={handleUpload}>
            Yüklə
          </Button> */}
          {/* {imageUrl && <img src={imageUrl} alt="Uploaded" width={150} />} */}
          <Button type="submit" onClick={handleUpload}>
            Create Post
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default CreatePost;
