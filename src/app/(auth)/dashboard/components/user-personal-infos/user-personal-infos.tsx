"use client";

import { useAuth } from "@/hooks/use-auth";
import { useEffect, useState } from "react";
import { UserStats } from "@/types/user";
import { getUserStats } from "@/lib/api/user";
import { updateUserProfile } from "@/lib/api/user";
import { transformLinkImage } from "@/lib/utils/transform-link-image";
import ShowEditUserForm from "@/components/ui/forms/show-edit-user-form";

import {
  EyeIcon,
  FileTextIcon,
  MessageSquareIcon,
  StarIcon,
  UserRoundPenIcon,
  UsersIcon,
  CameraIcon,
} from "lucide-react";
import ImageEditModal from "../image-edit-modal/image-edit-modal";
import StatsCard from "../stats-card/stats-card";

export default function UserPersonalInfos() {
  const { user, setUser } = useAuth();
  const [userStats, setUserStats] = useState<UserStats | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [editEnabled, setEditEnabled] = useState(true);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [updateError, setUpdateError] = useState<string | null>(null);
  const [updateSuccess, setUpdateSuccess] = useState(false);

  useEffect(() => {
    async function loadUserInfos() {
      if (!user) return;
      try {
        setLoading(true);
        setError("");

        const { data: statsData, statusCode: statusCode } = await getUserStats(
          user.username,
        );

        if (statusCode === 200) {
          setUserStats(statsData);
        } else {
          setError("Error loading user stats");
        }
      } catch (err: any) {
        setError("Unexpected error loading user info");
      } finally {
        setLoading(false);
      }
    }

    loadUserInfos();
  }, [user?.username]);

  const handleImageUploadSuccess = async (url: string) => {
    try {
      setUpdateError(null);
      setUpdateSuccess(false);

      const response = await updateUserProfile({ avatarUrl: url });

      if (user) {
        setUser({
          ...user,
          avatarUrl: url,
        });
      }

      setUpdateSuccess(true);

      setTimeout(() => {
        setIsImageModalOpen(false);
        setUpdateSuccess(false);
      }, 1500);
    } catch (err: any) {
      const errorMsg = err.message || "Error updating profile picture.";
      setUpdateError(errorMsg);
    }
  };

  const handleImageUploadError = (error: string) => {
    setUpdateError(error);
  };

  if (!user) {
    return (
      <div className="max-w-6xl mx-auto sx:p-6">
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 text-center">
          <p className="text-gray-600 dark:text-gray-400">User not found</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto sx:p-6">
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 text-center">
          <p className="text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="max-w-6xl mx-auto sx:p-6 space-y-6">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-8 text-white shadow-xl">
          <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
            <div className="relative group">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
                <img
                  src={transformLinkImage(user.avatarUrl || "/mock-user.jpg")}
                  alt={user.username}
                  className="w-full h-full object-cover"
                />
              </div>

              <button
                onClick={() => setIsImageModalOpen(true)}
                className="absolute inset-0 bg-black bg-opacity-40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center cursor-pointer"
                aria-label="Editar foto de perfil"
              >
                <div className="flex flex-col items-center gap-1">
                  <CameraIcon className="w-6 h-6" />
                  <span className="text-sm font-medium">Edit photo</span>
                </div>
              </button>
            </div>

            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-bold mb-2">{user.username}</h1>
              <p className="text-lg opacity-90 mb-1">@{user.username}</p>
              <p className="text-base opacity-80 max-w-2xl">
                {user.bio || "Nenhuma bio disponível"}
              </p>
            </div>
          </div>
        </div>

        {updateError && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
            <p className="text-sm text-red-700 dark:text-red-400">
              {updateError}
            </p>
          </div>
        )}

        {updateSuccess && (
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
            <p className="text-sm text-green-700 dark:text-green-400">
              Profile picture updated successfully!
            </p>
          </div>
        )}

        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Your Statistics
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <StatsCard
              icon={FileTextIcon}
              label="Published Stories"
              value={userStats?.storiesCount || 0}
              color="bg-gradient-to-br from-blue-500 to-blue-600"
            />

            <StatsCard
              icon={EyeIcon}
              label="Total Views"
              value={userStats?.totalViews || 0}
              color="bg-gradient-to-br from-purple-500 to-purple-600"
            />

            <StatsCard
              icon={UsersIcon}
              label="Followers"
              value={userStats?.totalFollowers || 0}
              color="bg-gradient-to-br from-pink-500 to-pink-600"
            />

            <StatsCard
              icon={MessageSquareIcon}
              label="Comments Made"
              value={userStats?.commentsCount || 0}
              color="bg-gradient-to-br from-green-500 to-green-600"
            />

            <StatsCard
              icon={StarIcon}
              label="Ratings Given"
              value={userStats?.ratingsCount || 0}
              color="bg-gradient-to-br from-yellow-500 to-yellow-600"
            />

            <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl p-5 text-white hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="text-center">
                <p className="text-sm opacity-90 font-medium mb-2">
                  Engagement Rate
                </p>
                <p className="text-3xl font-bold">
                  {userStats && userStats.storiesCount > 0
                    ? (
                        (userStats.commentsCount + userStats.ratingsCount) /
                        userStats.storiesCount
                      ).toFixed(1)
                    : "0"}
                </p>
                <p className="text-xs opacity-75 mt-1">interactions by story</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="flex xms:flex-nowrap flex-wrap justify-between bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 dark:to-gray-750 sx:px-8 px-4 sx:py-6 py-2 border-b border-gray-200 dark:border-gray-700">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Edit Profile
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Update your personal information and biography.
              </p>
            </div>
            <button
              onClick={() => setEditEnabled(!editEnabled)}
              className={`self-start flex gap-0.5 items-center py-1 px-1.5 ${editEnabled ? "bg-indigo-500 hover:bg-indigo-400" : "bg-indigo-400 hover:bg-indigo-600"} transition text-white rounded-sm cursor-pointer`}
            >
              <UserRoundPenIcon className="w-5 h-5" />
              <p className="text-sm">Edit profile</p>
            </button>
          </div>

          <div className="sx:p-8 p-4">
            <ShowEditUserForm enabled={editEnabled} userProfile={user} />
          </div>
        </div>
      </div>

      <ImageEditModal
        isOpen={isImageModalOpen}
        onClose={() => setIsImageModalOpen(false)}
        currentImageUrl={user.avatarUrl || undefined}
        onUploadSuccess={handleImageUploadSuccess}
        onUploadError={handleImageUploadError}
      />
    </>
  );
}
