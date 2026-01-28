import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CreateCourseForm from "../../components/CreateCourseForm";
import { messageHandler } from "../../utils/messageHandler";

const CreateCourse = () => {
  const navigate = useNavigate();


  const handleSuccess = () => {
    // Navigate back to course list after successful creation
    navigate("/admin/courses");
  };

  const handleCancel = () => {
    navigate("/admin/courses");
  };

  return (
    <CreateCourseForm
      isModal={false}
      onSuccess={handleSuccess}
      onCancel={handleCancel}
      title="Create New Course"
    />
  );
};

export default CreateCourse;
