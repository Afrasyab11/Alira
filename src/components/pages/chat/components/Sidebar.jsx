import React, { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { FiUpload, FiX } from "react-icons/fi";
import { supabase } from "../../../../lib/supabase";

const Sidebar = ({ onImageSelect, selectedImages }) => {
  const [uploadedImages, setUploadedImages] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({});
  const [session, setSession] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Load existing images when session is available
  useEffect(() => {
    const loadExistingImages = async () => {
      if (!session?.user) return;

      try {
        setIsLoading(true);
        // List all files in the user's folder
        const { data: files, error } = await supabase.storage
          .from("alira")
          .list(session.user.id);

        if (error) throw error;

        // Get public URLs for all files
        const images = await Promise.all(
          files.map(async (file) => {
            const {
              data: { publicUrl },
            } = supabase.storage
              .from("alira")
              .getPublicUrl(`${session.user.id}/${file.name}`);

            return {
              id: file.name.split(".")[0], // Remove extension to get the slug
              preview: publicUrl,
              path: `${session.user.id}/${file.name}`,
              isUploading: false,
            };
          })
        );

        setUploadedImages(images);
      } catch (error) {
        console.error("Error loading existing images:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (session?.user) {
      loadExistingImages();
    }
  }, [session]);

  console.log("Current session:", session);
  console.log("Selected images:", selectedImages);
  console.log("Uploaded images:", uploadedImages);
  console.log("Upload progress:", uploadProgress);

  const createSlug = (filename) => {
    const nameWithoutExt = filename.replace(/\.[^/.]+$/, "");
    const slug = nameWithoutExt
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
    const randomNum = Math.floor(Math.random() * 10000);
    const finalSlug = `${slug}-${randomNum}`;
    console.log("Generated slug:", finalSlug, "from filename:", filename);
    return finalSlug;
  };

  const uploadToSupabase = async (file, tempId) => {
    try {
      if (!session?.user) {
        throw new Error("No authenticated user");
      }

      const fileExt = file.name.split(".").pop();
      const slug = createSlug(file.name);
      const fileName = `${slug}.${fileExt}`;
      const filePath = `${session.user.id}/${fileName}`;

      // Upload file to Supabase Storage
      const { data, error } = await supabase.storage
        .from("alira")
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (error) throw error;

      // Get public URL
      const {
        data: { publicUrl },
      } = supabase.storage.from("alira").getPublicUrl(filePath);

      console.log("Uploaded image:", {
        id: slug,
        url: publicUrl,
        path: filePath,
      });

      return {
        id: slug,
        url: publicUrl,
        path: filePath,
      };
    } catch (error) {
      console.error("Error in uploadToSupabase:", error);
      throw error;
    }
  };

  const onDrop = useCallback(
    async (acceptedFiles) => {
      if (!session?.user) {
        console.error("No authenticated user");
        return;
      }

      for (const file of acceptedFiles) {
        // Create a temporary ID for this upload
        const tempId = Math.random().toString(36).substr(2, 9);

        // Create immediate preview
        const previewUrl = URL.createObjectURL(file);

        // Add to uploaded images immediately with preview
        setUploadedImages((prev) => [
          ...prev,
          {
            id: tempId,
            preview: previewUrl,
            path: null,
            isUploading: true,
          },
        ]);

        // Start upload process
        uploadToSupabase(file, tempId)
          .then((uploadedImage) => {
            // Update the image with the uploaded data
            setUploadedImages((prev) =>
              prev.map((img) =>
                img.id === tempId
                  ? {
                      id: uploadedImage.id,
                      preview: uploadedImage.url,
                      path: uploadedImage.path,
                      isUploading: false,
                    }
                  : img
              )
            );

            // Clean up preview URL
            URL.revokeObjectURL(previewUrl);
          })
          .catch((error) => {
            console.error("Upload failed:", error);
            // Remove the failed upload
            setUploadedImages((prev) =>
              prev.filter((img) => img.id !== tempId)
            );
            URL.revokeObjectURL(previewUrl);
          });
      }
    },
    [session]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".gif"],
    },
    onDragEnter: () => setIsDragging(true),
    onDragLeave: () => setIsDragging(false),
  });

  const handleImageSelect = (image) => {
    if (image.isUploading) return;
    onImageSelect(image);
  };

  const removeImage = async (imageId, imagePath) => {
    if (!session?.user) return;

    try {
      if (imagePath) {
        const { error } = await supabase.storage
          .from("alira")
          .remove([imagePath]);

        if (error) throw error;
      }

      setUploadedImages((prev) => prev.filter((img) => img.id !== imageId));
    } catch (error) {
      console.error("Error in removeImage:", error);
    }
  };

  return (
    <div className="fixed  w-80 rounded-2xl top-[20px] bottom-5 right-5 h-[100vh-20px] bg-gray-50 dark:bg-[#1D1D1F]/30 backdrop-blur-xl border-l border-gray-200 dark:border-gray-800 p-4 overflow-y-auto z-50 shadow-lg">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Upload Images
        </h2>
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors
            ${
              isDragActive
                ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                : "border-gray-300 dark:border-gray-700"
            }
            hover:border-blue-500 dark:hover:border-blue-500`}
        >
          <input {...getInputProps()} />
          <FiUpload className="mx-auto h-8 w-8 text-gray-400 dark:text-gray-500 mb-2" />
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {isDragActive
              ? "Drop the images here..."
              : "Drag & drop images here, or click to select"}
          </p>
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {[...uploadedImages].map((image) => (
            <div
              key={image.id}
              className={`relative group aspect-square rounded-lg overflow-hidden transition-all duration-200
                  ${
                    selectedImages.includes(image.preview)
                      ? "ring-4 ring-[#0071E3] ring-offset-2 dark:ring-offset-[#1D1D1F]"
                      : ""
                  }`}
            >
              <img
                src={image.preview}
                alt="Uploaded"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-200 flex items-center justify-center">
                <button
                  onClick={() => handleImageSelect(image)}
                  disabled={image.isUploading}
                  className={`opacity-0 group-hover:opacity-100 transition-opacity duration-200
                      ${
                        selectedImages.includes(image.preview)
                          ? "bg-[#0071E3] text-white"
                          : "bg-white text-gray-900"
                      } px-3 py-1 rounded-full text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {image.isUploading
                    ? "Uploading..."
                    : selectedImages.includes(image.preview)
                    ? "Selected"
                    : "Select"}
                </button>
                <button
                  onClick={() => removeImage(image.preview, image.path)}
                  disabled={image.isUploading}
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-red-500 text-white p-1 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FiX className="h-4 w-4" />
                </button>
              </div>
              {image.isUploading && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200 dark:bg-gray-700">
                  <div className="h-full bg-[#0071E3] transition-all duration-300 animate-pulse" />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Sidebar;
