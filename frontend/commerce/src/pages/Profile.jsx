
import React, { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { siginInSuccess } from "../redux/user/userSlice";
import {
  UserRound,
  Camera,
  LogOut,
  Trash2,
  ShieldCheck,
  House,
  Settings,
  ChevronRight,
  Menu,
  X,
  CheckCircle2,
  AlertCircle,
  Mail,
  Pencil,
} from "lucide-react";

export const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fileRef = useRef(null);

  const [formData, setFormData] = useState({
    username: currentUser?.username || "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [signingOut, setSigningOut] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [accountError, setAccountError] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  const avatar =
    currentUser?.avatar ||
    "https://cdn-icons-png.flaticon.com/512/149/149071.png";

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
    setMessage("");
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    try {
      const response = await fetch(
        `/backend/user/update/${currentUser._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            username: formData.username,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Failed to update profile");
        return;
      }

      dispatch(siginInSuccess(data));
      setFormData({
        username: data.username || "",
      });
      setMessage("Your profile has been updated successfully.");
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    setSigningOut(true);
    setAccountError("");

    try {
      const response = await fetch("/backend/user/signout", {
        method: "POST",
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        setAccountError(data.message || "Unable to sign out");
        return;
      }

      dispatch(siginInSuccess(null));
      localStorage.removeItem("persist:root");
      navigate("/signin");
    } catch (err) {
      setAccountError("Unable to sign out. Please try again.");
    } finally {
      setSigningOut(false);
    }
  };

  const handleDeleteAccount = async () => {
    setDeleting(true);
    setAccountError("");

    try {
      const response = await fetch(
        `/backend/user/delete/${currentUser._id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setAccountError(data.message || "Unable to delete account");
        return;
      }

      dispatch(siginInSuccess(null));
      localStorage.removeItem("persist:root");
      setShowDeleteModal(false);
      navigate("/signup");
    } catch (err) {
      setAccountError("Unable to delete account. Please try again.");
    } finally {
      setDeleting(false);
    }
  };

  const handleCreateListing = () => {
    setMobileMenu(false);
    navigate("/create-listing");
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center max-w-sm w-full">
          <UserRound className="w-12 h-12 text-slate-400 mx-auto mb-4" />

          <h2 className="text-xl font-bold text-slate-800">
            Sign in required
          </h2>

          <p className="text-slate-500 text-sm mt-2">
            Please sign in to access your account dashboard.
          </p>

          <button
            onClick={() => navigate("/signin")}
            className="mt-6 w-full bg-slate-900 text-white py-3 rounded-xl font-semibold hover:bg-slate-700 transition"
          >
            Sign In
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f6f8] text-slate-800">
      <div className="flex min-h-screen">
        <aside className="hidden lg:flex w-64 shrink-0 bg-[#111827] text-white flex-col">
          <div className="px-7 py-8 border-b border-white/10">
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-3 text-left"
            >
              <div className="w-10 h-10 rounded-xl bg-yellow-400 flex items-center justify-center">
                <House className="w-5 h-5 text-slate-900" />
              </div>

              <div>
                <h1 className="text-lg font-bold tracking-tight">
                  Zion'sHomes
                </h1>
                <p className="text-xs text-slate-400">
                  Property dashboard
                </p>
              </div>
            </button>
          </div>

          <div className="px-5 py-8">
            <p className="text-xs uppercase tracking-widest text-slate-500 font-semibold px-3 mb-4">
              Workspace
            </p>

            <button
              onClick={() => navigate("/")}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-300 hover:bg-white/5 hover:text-white transition"
            >
              <House className="w-5 h-5" />
              <span className="text-sm font-medium">Home</span>
              <ChevronRight className="w-4 h-4 ml-auto" />
            </button>

            <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-yellow-400 text-slate-900 mt-2">
              <UserRound className="w-5 h-5" />
              <span className="text-sm font-semibold">My Profile</span>
            </div>

            <button
              onClick={handleCreateListing}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-300 hover:bg-yellow-400 hover:text-slate-900 transition mt-2"
            >
              <House className="w-5 h-5" />
              <span className="text-sm font-semibold">
                Create Listing
              </span>
              <ChevronRight className="w-4 h-4 ml-auto" />
            </button>

            <div className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-300 mt-2">
              <Settings className="w-5 h-5" />
              <span className="text-sm font-medium">
                Account Settings
              </span>
            </div>
          </div>

          <div className="mt-auto p-5">
            <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
              <div className="flex items-center gap-3">
                <img
                  src={avatar}
                  alt="Profile"
                  className="w-10 h-10 rounded-full object-cover border border-white/20"
                />

                <div className="min-w-0">
                  <p className="text-sm font-semibold truncate">
                    {currentUser.username}
                  </p>
                  <p className="text-xs text-slate-400 truncate">
                    {currentUser.email}
                  </p>
                </div>
              </div>

              <button
                onClick={handleSignOut}
                disabled={signingOut}
                className="mt-5 flex items-center gap-2 text-sm text-slate-300 hover:text-white transition disabled:opacity-50"
              >
                <LogOut className="w-4 h-4" />
                {signingOut ? "Signing out..." : "Sign out"}
              </button>
            </div>
          </div>
        </aside>

        <div className="flex-1 min-w-0">
          <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 h-16 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setMobileMenu(!mobileMenu)}
                  className="lg:hidden p-2 rounded-lg hover:bg-slate-100"
                >
                  {mobileMenu ? (
                    <X className="w-5 h-5" />
                  ) : (
                    <Menu className="w-5 h-5" />
                  )}
                </button>

                <div>
                  <p className="text-sm font-semibold text-slate-800">
                    Account Dashboard
                  </p>
                  <p className="text-xs text-slate-400 hidden sm:block">
                    Manage your personal information
                  </p>
                </div>
              </div>

              <button
                onClick={() => navigate("/")}
                className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition"
              >
                <House className="w-4 h-4" />
                <span className="hidden sm:inline">Back to Home</span>
              </button>
            </div>
          </header>

          {mobileMenu && (
            <div className="lg:hidden bg-white border-b border-slate-200 px-4 py-4 space-y-2">
              <button
                onClick={() => {
                  navigate("/");
                  setMobileMenu(false);
                }}
                className="flex items-center gap-3 w-full rounded-xl p-3 text-sm text-slate-600 hover:bg-slate-100"
              >
                <House className="w-5 h-5" />
                Home
              </button>

              <button
                onClick={() => setMobileMenu(false)}
                className="flex items-center gap-3 w-full rounded-xl p-3 text-sm font-semibold bg-yellow-50 text-slate-900"
              >
                <UserRound className="w-5 h-5" />
                My Profile
              </button>

              <button
                onClick={handleCreateListing}
                className="flex items-center gap-3 w-full rounded-xl p-3 text-sm font-semibold text-slate-600 hover:bg-yellow-50 hover:text-slate-900 transition"
              >
                <House className="w-5 h-5" />
                Create Listing
                <ChevronRight className="w-4 h-4 ml-auto" />
              </button>

              <button
                onClick={handleSignOut}
                disabled={signingOut}
                className="flex items-center gap-3 w-full rounded-xl p-3 text-sm text-red-600 hover:bg-red-50 disabled:opacity-50"
              >
                <LogOut className="w-5 h-5" />
                {signingOut ? "Signing out..." : "Sign out"}
              </button>
            </div>
          )}

          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-8 lg:py-10">
            <div className="mb-8">
              <p className="text-sm text-slate-500 mb-2">
                Dashboard / My Profile
              </p>

              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
                My Profile
              </h1>

              <p className="text-slate-500 mt-2 text-sm sm:text-base">
                Manage your personal details and account preferences.
              </p>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              <div className="xl:col-span-2 space-y-6">
                <section className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                  <div className="h-28 sm:h-36 bg-[#172033] relative">
                    <div className="absolute inset-0 opacity-10">
                      <div className="w-full h-full bg-[radial-gradient(circle_at_top_right,_#facc15,_transparent_55%)]" />
                    </div>
                  </div>

                  <div className="px-5 sm:px-8 pb-7">
                    <div className="flex flex-col sm:flex-row sm:items-end gap-4 -mt-12 relative">
                      <div className="relative w-fit">
                        <img
                          src={avatar}
                          alt="Profile"
                          className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover border-4 border-white shadow-md bg-white"
                        />

                        <button
                          type="button"
                          onClick={() => fileRef.current?.click()}
                          className="absolute -bottom-2 -right-2 w-9 h-9 rounded-xl bg-yellow-400 text-slate-900 flex items-center justify-center shadow-md hover:bg-yellow-300 transition"
                          title="Change profile photo"
                        >
                          <Camera className="w-4 h-4" />
                        </button>

                        <input
                          type="file"
                          ref={fileRef}
                          hidden
                          accept="image/*"
                        />
                      </div>

                      <div className="sm:pb-1 flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 break-words">
                            {currentUser.username}
                          </h2>

                          <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2.5 py-1 text-xs font-semibold text-green-700">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            Active
                          </span>
                        </div>

                        <p className="text-sm text-slate-500 mt-1 break-all">
                          {currentUser.email}
                        </p>
                      </div>

                      <div className="sm:pb-1">
                        <span className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-xs font-medium text-slate-500">
                          <ShieldCheck className="w-4 h-4 text-green-600" />
                          Account holder
                        </span>
                      </div>
                    </div>
                  </div>
                </section>

                <section className="bg-white rounded-2xl border border-slate-200 shadow-sm">
                  <div className="px-5 sm:px-8 py-6 border-b border-slate-100 flex items-center justify-between">
                    <div>
                      <h2 className="text-lg font-bold text-slate-900">
                        Personal Information
                      </h2>

                      <p className="text-sm text-slate-500 mt-1">
                        Update your account details.
                      </p>
                    </div>

                    <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">
                      <Pencil className="w-5 h-5 text-slate-600" />
                    </div>
                  </div>

                  <form
                    onSubmit={handleSubmit}
                    className="p-5 sm:p-8 space-y-6"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label
                          htmlFor="username"
                          className="block text-sm font-semibold text-slate-700 mb-2"
                        >
                          Username
                        </label>

                        <div className="relative">
                          <UserRound className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />

                          <input
                            type="text"
                            id="username"
                            value={formData.username}
                            onChange={handleChange}
                            placeholder="Enter your username"
                            required
                            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-800 outline-none transition focus:border-yellow-400 focus:bg-white focus:ring-4 focus:ring-yellow-100"
                          />
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-semibold text-slate-700 mb-2"
                        >
                          Email Address
                        </label>

                        <div className="relative">
                          <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />

                          <input
                            type="email"
                            id="email"
                            value={currentUser.email || ""}
                            readOnly
                            className="w-full rounded-xl border border-slate-200 bg-slate-100 py-3 pl-11 pr-4 text-sm text-slate-500 outline-none cursor-not-allowed"
                          />
                        </div>

                        <p className="text-xs text-slate-400 mt-2">
                          Your email address cannot be changed here.
                        </p>
                      </div>
                    </div>

                    {message && (
                      <div className="flex items-start gap-2 rounded-xl bg-green-50 border border-green-100 p-4 text-sm text-green-700">
                        <CheckCircle2 className="w-5 h-5 shrink-0" />
                        {message}
                      </div>
                    )}

                    {error && (
                      <div className="flex items-start gap-2 rounded-xl bg-red-50 border border-red-100 p-4 text-sm text-red-700">
                        <AlertCircle className="w-5 h-5 shrink-0" />
                        {error}
                      </div>
                    )}

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
                      <p className="text-xs text-slate-400">
                        Make sure your information is accurate.
                      </p>

                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:opacity-50"
                      >
                        {loading ? "Saving Changes..." : "Save Changes"}

                        {!loading && (
                          <ChevronRight className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </form>
                </section>
              </div>

              <div className="space-y-6">
                <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 sm:p-6">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-11 h-11 rounded-xl bg-yellow-50 flex items-center justify-center">
                      <ShieldCheck className="w-5 h-5 text-yellow-700" />
                    </div>

                    <div>
                      <h3 className="font-bold text-slate-900">
                        Account Security
                      </h3>
                      <p className="text-xs text-slate-500 mt-1">
                        Your account status
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-sm text-slate-500">
                        Account status
                      </span>

                      <span className="text-xs font-semibold text-green-700 bg-green-50 px-2.5 py-1 rounded-full">
                        Active
                      </span>
                    </div>

                    <div className="flex items-center justify-between gap-3">
                      <span className="text-sm text-slate-500">
                        Authentication
                      </span>

                      <span className="text-sm font-semibold text-slate-800">
                        Protected
                      </span>
                    </div>

                    <div className="border-t border-slate-100 pt-4">
                      <p className="text-xs leading-5 text-slate-500">
                        Keep your sign-in information private and sign out
                        when using a shared device.
                      </p>
                    </div>
                  </div>
                </section>

                <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 sm:p-6">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-11 h-11 rounded-xl bg-slate-100 flex items-center justify-center">
                      <Settings className="w-5 h-5 text-slate-700" />
                    </div>

                    <div>
                      <h3 className="font-bold text-slate-900">
                        Account Actions
                      </h3>

                      <p className="text-xs text-slate-500 mt-1">
                        Manage your account
                      </p>
                    </div>
                  </div>

                  {accountError && (
                    <div className="mb-4 rounded-xl bg-red-50 border border-red-100 p-3 text-sm text-red-600">
                      {accountError}
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={handleSignOut}
                    disabled={signingOut}
                    className="w-full flex items-center justify-between gap-3 rounded-xl border border-slate-200 p-4 text-left transition hover:bg-slate-50 disabled:opacity-50"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center">
                        <LogOut className="w-4 h-4 text-slate-600" />
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-slate-800">
                          {signingOut ? "Signing Out..." : "Sign Out"}
                        </p>

                        <p className="text-xs text-slate-400 mt-1">
                          End your current session
                        </p>
                      </div>
                    </div>

                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setAccountError("");
                      setShowDeleteModal(true);
                    }}
                    disabled={deleting}
                    className="mt-3 w-full flex items-center justify-between gap-3 rounded-xl border border-red-100 p-4 text-left transition hover:bg-red-50 disabled:opacity-50"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-red-50 flex items-center justify-center">
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-red-600">
                          Delete Account
                        </p>

                        <p className="text-xs text-slate-400 mt-1">
                          Permanently remove your account
                        </p>
                      </div>
                    </div>

                    <ChevronRight className="w-4 h-4 text-red-400" />
                  </button>
                </section>

                <div className="rounded-2xl bg-[#172033] p-5 sm:p-6 text-white">
                  <div className="w-10 h-10 rounded-xl bg-yellow-400 flex items-center justify-center mb-4">
                    <House className="w-5 h-5 text-slate-900" />
                  </div>

                  <h3 className="font-bold text-lg">
                    Welcome to Zion'sHomes
                  </h3>

                  <p className="text-sm text-slate-300 leading-6 mt-2">
                    Your space to manage your account and explore your next
                    property.
                  </p>

                  <button
                    onClick={() => navigate("/")}
                    className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-yellow-400 hover:text-yellow-300 transition"
                  >
                    Explore properties
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            <footer className="mt-10 border-t border-slate-200 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
              <p>© {new Date().getFullYear()} Zion'sHomes</p>
              <p>Account Dashboard</p>
            </footer>
          </main>
        </div>
      </div>

      {showDeleteModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/60 px-4 py-6 backdrop-blur-sm">
          <div className="relative w-full max-w-md rounded-2xl bg-white p-6 sm:p-8 shadow-2xl">
            <button
              type="button"
              onClick={() => setShowDeleteModal(false)}
              disabled={deleting}
              className="absolute right-4 top-4 rounded-full p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 disabled:opacity-50"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50">
              <Trash2 className="h-7 w-7 text-red-600" />
            </div>

            <h2 className="text-center text-2xl font-bold text-slate-900">
              Delete Account?
            </h2>

            <p className="mt-3 text-center text-sm leading-6 text-slate-500">
              Are you sure you want to permanently delete your Zion'sHomes
              account? Your account information will be removed. This action
              cannot be undone.
            </p>

            {accountError && (
              <p className="mt-4 text-center text-sm text-red-600">
                {accountError}
              </p>
            )}

            <div className="mt-7 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setShowDeleteModal(false)}
                disabled={deleting}
                className="w-full rounded-xl border border-slate-200 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleDeleteAccount}
                disabled={deleting}
                className="w-full rounded-xl bg-red-600 py-3 text-sm font-semibold text-white transition hover:bg-red-700 disabled:opacity-50"
              >
                {deleting ? "Deleting..." : "Yes, Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};