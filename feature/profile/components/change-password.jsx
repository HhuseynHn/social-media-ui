/** @format */
"use client";

import { useState } from "react";
import {
  Label,
  Input,
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/common/components";
import { toast } from "sonner";

const ChangePasswordModal = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      toast(`❌ Password don't mach`, {
        duration: 3000,
        position: "top-center",
        className: "bg-red-500 text-white",
      });
      return;
    }
    toast("✅ Password changed successful!", {
      duration: 3000,
      position: "top-center",
    });
    onSave(formData.oldPassword, formData.newPassword);
    onClose();
    console.log("FormData", formData.oldPassword, formData.newPassword);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Change password</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="oldPassword">Old password</Label>

              <Input
                type="text"
                name="oldPassword"
                id="oldPassword"
                value={formData.oldPassword}
                onChange={handleChange}
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="newPassword">New Password</Label>
              <Input
                type="text"
                name="newPassword"
                id="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <Input
                type="text"
                name="confirmPassword"
                id="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
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

export default ChangePasswordModal;
