
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowUpRight,
  BedDouble,
  Bath,
  CarFront,
  Check,
  ChevronDown,
  ImagePlus,
  MapPin,
  Plus,
  Trash2,
  Upload,
  X,
  House,
  Sofa,
  Tag,
  Wallet,
  FileText,
  Sparkles,
} from "lucide-react";

const initialForm = {
  name: "",
  description: "",
  address: "",
  regularPrice: "",
  discountedPrice: "",
  bathrooms: "",
  bedrooms: "",
  furnished: false,
  parking: "",
  type: "rent",
  offer: false,
  imageUrl: [],
};

export default function CreateListing() {
  const [formData, setFormData] = useState(initialForm);
  const [imageInput, setImageInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageAdd = () => {
    const url = imageInput.trim();

    if (!url) return;

    try {
      new URL(url);
    } catch {
      setError("Please enter a valid image URL.");
      return;
    }

    if (formData.imageUrl.length >= 6) {
      setError("You can add a maximum of 6 images.");
      return;
    }

    if (formData.imageUrl.includes(url)) {
      setError("This image has already been added.");
      return;
    }

    setFormData((prev) => ({
      ...prev,
      imageUrl: [...prev.imageUrl, url],
    }));

    setImageInput("");
    setError("");
  };

  const removeImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      imageUrl: prev.imageUrl.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.imageUrl.length === 0) {
      setError("Please add at least one property image.");
      return;
    }

    if (
      formData.offer &&
      Number(formData.discountedPrice) >= Number(formData.regularPrice)
    ) {
      setError("The discounted price must be lower than the regular price.");
      return;
    }

    if (
      Number(formData.regularPrice) <= 0 ||
      Number(formData.discountedPrice) <= 0
    ) {
      setError("Prices must be greater than zero.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/backend/listing/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          ...formData,
          regularPrice: Number(formData.regularPrice),
          discountedPrice: Number(formData.discountedPrice),
          bedrooms: Number(formData.bedrooms),
          bathrooms: Number(formData.bathrooms),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to create listing.");
      }

      setFormData(initialForm);
      setError("");
      alert("Property listing created successfully!");
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full rounded-xl border border-[#dfe5df] bg-white px-4 py-3.5 text-sm text-[#17241c] outline-none transition placeholder:text-[#9aa59c] focus:border-[#9caa45] focus:ring-4 focus:ring-[#9caa45]/10";

  const labelClass =
    "mb-2 block text-sm font-semibold text-[#25352b]";

  const sectionClass =
    "rounded-2xl border border-[#e6eae4] bg-white p-5 sm:p-7";

  return (
    <div className="min-h-screen bg-[#f5f7f3] text-[#17241c]">
      <header className="sticky top-0 z-40 border-b border-[#e6eae4] bg-white/95 backdrop-blur-xl">
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link
            to="/"
            className="flex items-center gap-2 text-xl font-extrabold tracking-tight"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#17291e] text-[#e8e98c]">
              <House size={19} />
            </span>
            Zion's<span className="text-[#9caa45]">Homes</span>
          </Link>

          <Link
            to="/profile"
            className="flex items-center gap-2 rounded-xl border border-[#e6eae4] px-3 py-2 text-sm font-semibold transition hover:bg-[#f5f7f3] sm:px-4"
          >
            <ArrowLeft size={16} />
            <span className="hidden sm:inline">Back to profile</span>
            <span className="sm:hidden">Back</span>
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#e9edda] px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-[#58652a]">
              <Sparkles size={14} />
              Property management
            </div>

            <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
              Create a listing
            </h1>

            <p className="mt-3 max-w-xl text-sm leading-6 text-[#758078] sm:text-base">
              Share your property with the world. Add the details, photos, and
              pricing to create a listing people will love.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start rounded-xl border border-[#e2e7df] bg-white px-4 py-3 text-sm text-[#758078] md:self-auto">
            <span className="h-2 w-2 rounded-full bg-[#a4b54e]" />
            New property
          </div>
        </div>

        <div className="grid grid-cols-1 items-start gap-7 lg:grid-cols-[minmax(0,1fr)_320px] xl:grid-cols-[minmax(0,1fr)_350px]">
          <form onSubmit={handleSubmit} className="min-w-0 space-y-6">
            <section className={sectionClass}>
              <div className="mb-6 flex items-start gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#edf0e4] text-[#758437]">
                  <House size={21} />
                </div>

                <div>
                  <h2 className="text-lg font-bold">Property information</h2>
                  <p className="mt-1 text-sm text-[#879087]">
                    Give your property a name and describe what makes it special.
                  </p>
                </div>
              </div>

              <div className="space-y-5">
                <div>
                  <label className={labelClass}>Property name</label>
                  <input
                    className={inputClass}
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Modern 3 Bedroom Villa in Karen"
                    required
                    maxLength={100}
                  />
                </div>

                <div>
                  <label className={labelClass}>Property address</label>
                  <div className="relative">
                    <MapPin
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9aa59c]"
                    />
                    <input
                      className={`${inputClass} pl-11`}
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="Street, neighborhood, city"
                      required
                    />
                  </div>
                </div>

                <div>
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <label className={labelClass}>Property description</label>
                    <span className="text-xs text-[#929c93]">
                      {formData.description.length}/2000
                    </span>
                  </div>

                  <textarea
                    className={`${inputClass} min-h-[160px] resize-y leading-7`}
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Describe the property, its location, nearby amenities, interior features, security, views, and anything else a potential buyer or tenant should know..."
                    required
                    maxLength={2000}
                  />

                  <p className="mt-2 text-xs leading-5 text-[#929c93]">
                    Include useful details about the neighborhood, amenities,
                    and what makes the property unique.
                  </p>
                </div>
              </div>
            </section>

            <section className={sectionClass}>
              <div className="mb-6 flex items-start gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#edf0e4] text-[#758437]">
                  <Wallet size={21} />
                </div>

                <div>
                  <h2 className="text-lg font-bold">Pricing and availability</h2>
                  <p className="mt-1 text-sm text-[#879087]">
                    Set your price and choose how the property is offered.
                  </p>
                </div>
              </div>

              <div className="mb-5">
                <label className={labelClass}>Listing type</label>
                <div className="grid grid-cols-2 gap-3">
                  {["sale", "rent"].map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          type,
                        }))
                      }
                      className={`flex items-center justify-center gap-2 rounded-xl border px-4 py-4 text-sm font-bold capitalize transition ${
                        formData.type === type
                          ? "border-[#667637] bg-[#eef1e5] text-[#52612c] ring-1 ring-[#667637]"
                          : "border-[#e1e6df] text-[#758078] hover:bg-[#f8f9f6]"
                      }`}
                    >
                      {formData.type === type && <Check size={17} />}
                      For {type}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label className={labelClass}>
                    Regular price (KSh)
                  </label>
                  <input
                    className={inputClass}
                    type="number"
                    name="regularPrice"
                    value={formData.regularPrice}
                    onChange={handleChange}
                    placeholder="e.g. 15000000"
                    min="1"
                    required
                  />
                  <p className="mt-2 text-xs text-[#929c93]">
                    {formData.type === "rent"
                      ? "Enter the rental price per month."
                      : "Enter the property's selling price."}
                  </p>
                </div>

                <div>
                  <label className={labelClass}>
                    {formData.offer ? "Discounted price (KSh)" : "Listing price (KSh)"}
                  </label>
                  <input
                    className={inputClass}
                    type="number"
                    name="discountedPrice"
                    value={formData.discountedPrice}
                    onChange={handleChange}
                    placeholder="e.g. 12000000"
                    min="1"
                    required
                  />
                  <p className="mt-2 text-xs text-[#929c93]">
                    {formData.offer
                      ? "The reduced price displayed to customers."
                      : "Enter the same price if there is no discount."}
                  </p>
                </div>
              </div>

              <div className="mt-6 rounded-xl border border-[#e6eae4] bg-[#f8f9f6] p-4">
                <label className="flex cursor-pointer items-start gap-3">
                  <input
                    className="mt-1 h-4 w-4 accent-[#78863b]"
                    type="checkbox"
                    name="offer"
                    checked={formData.offer}
                    onChange={handleChange}
                  />
                  <span>
                    <span className="block text-sm font-bold">
                      Special offer
                    </span>
                    <span className="mt-1 block text-xs leading-5 text-[#879087]">
                      Highlight this property as a special deal and display the
                      discounted price.
                    </span>
                  </span>
                  <Tag className="ml-auto shrink-0 text-[#899747]" size={19} />
                </label>
              </div>
            </section>

            <section className={sectionClass}>
              <div className="mb-6 flex items-start gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#edf0e4] text-[#758437]">
                  <BedDouble size={21} />
                </div>

                <div>
                  <h2 className="text-lg font-bold">Property features</h2>
                  <p className="mt-1 text-sm text-[#879087]">
                    Help people understand the space and facilities available.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label className={labelClass}>Bedrooms</label>
                  <div className="relative">
                    <BedDouble
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9aa59c]"
                    />
                    <input
                      className={`${inputClass} pl-11`}
                      type="number"
                      name="bedrooms"
                      value={formData.bedrooms}
                      onChange={handleChange}
                      placeholder="Number of bedrooms"
                      min="0"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className={labelClass}>Bathrooms</label>
                  <div className="relative">
                    <Bath
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9aa59c]"
                    />
                    <input
                      className={`${inputClass} pl-11`}
                      type="number"
                      name="bathrooms"
                      value={formData.bathrooms}
                      onChange={handleChange}
                      placeholder="Number of bathrooms"
                      min="0"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className={labelClass}>Parking</label>
                  <div className="relative">
                    <CarFront
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9aa59c]"
                    />
                    <select
                      className={`${inputClass} appearance-none pl-11`}
                      name="parking"
                      value={formData.parking}
                      onChange={handleChange}
                      required
                    >
                      <option value="" disabled>
                        Select parking availability
                      </option>
                      <option value="Available">Parking available</option>
                      <option value="Not available">No parking</option>
                      <option value="Garage">Private garage</option>
                      <option value="Covered">Covered parking</option>
                    </select>
                    <ChevronDown
                      size={16}
                      className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#879087]"
                    />
                  </div>
                </div>

                <div>
                  <label className={labelClass}>Furnishing</label>
                  <div className="flex h-[50px] items-center justify-between rounded-xl border border-[#dfe5df] px-4">
                    <div className="flex items-center gap-2 text-sm text-[#526057]">
                      <Sofa size={18} className="text-[#9aa59c]" />
                      Furnished
                    </div>
                    <button
                      type="button"
                      role="switch"
                      aria-checked={formData.furnished}
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          furnished: !prev.furnished,
                        }))
                      }
                      className={`relative h-6 w-11 rounded-full transition ${
                        formData.furnished ? "bg-[#78863b]" : "bg-[#d6ddd5]"
                      }`}
                    >
                      <span
                        className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${
                          formData.furnished ? "left-6" : "left-1"
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>
            </section>

            <section className={sectionClass}>
              <div className="mb-6 flex items-start gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#edf0e4] text-[#758437]">
                  <ImagePlus size={21} />
                </div>

                <div>
                  <h2 className="text-lg font-bold">Property images</h2>
                  <p className="mt-1 text-sm text-[#879087]">
                    Add high-quality photos that showcase your property.
                  </p>
                </div>
              </div>

              <div className="rounded-2xl border-2 border-dashed border-[#dce3d8] bg-[#f9faf7] p-5 sm:p-8">
                <div className="mx-auto flex max-w-md flex-col items-center text-center">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#e9edda] text-[#758437]">
                    <Upload size={25} />
                  </div>

                  <h3 className="text-sm font-bold">Add property photos</h3>
                  <p className="mt-2 text-xs leading-5 text-[#879087]">
                    Paste an image URL below. Add up to 6 images to showcase
                    different areas of the property.
                  </p>
                </div>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <input
                    className={`${inputClass} min-w-0 flex-1`}
                    type="url"
                    value={imageInput}
                    onChange={(e) => setImageInput(e.target.value)}
                    placeholder="https://example.com/property.jpg"
                  />

                  <button
                    type="button"
                    onClick={handleImageAdd}
                    className="flex items-center justify-center gap-2 rounded-xl bg-[#17291e] px-6 py-3.5 text-sm font-bold text-white transition hover:bg-[#293e30]"
                  >
                    <Plus size={18} />
                    Add image
                  </button>
                </div>
              </div>

              {formData.imageUrl.length > 0 && (
                <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3">
                  {formData.imageUrl.map((url, index) => (
                    <div
                      key={url}
                      className="group relative overflow-hidden rounded-xl border border-[#e1e6df]"
                    >
                      <img
                        src={url}
                        alt={`Property ${index + 1}`}
                        className="h-32 w-full object-cover sm:h-36"
                      />
                      {index === 0 && (
                        <span className="absolute bottom-2 left-2 rounded-md bg-[#17291e]/90 px-2 py-1 text-[10px] font-bold text-white">
                          Cover image
                        </span>
                      )}
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white text-red-500 shadow transition hover:bg-red-50"
                        aria-label="Remove image"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-4 flex items-center justify-between text-xs text-[#929c93]">
                <span>Image URLs</span>
                <span>{formData.imageUrl.length}/6 added</span>
              </div>
            </section>

            {error && (
              <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                <X size={18} className="mt-0.5 shrink-0" />
                {error}
              </div>
            )}

            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => {
                  setFormData(initialForm);
                  setError("");
                }}
                className="rounded-xl border border-[#dfe5df] bg-white px-6 py-4 text-sm font-bold text-[#526057] transition hover:bg-[#f5f7f3]"
              >
                Reset form
              </button>

              <button
                type="submit"
                disabled={loading}
                className="flex items-center justify-center gap-3 rounded-xl bg-[#17291e] px-8 py-4 text-sm font-bold text-white shadow-lg shadow-[#17291e]/10 transition hover:bg-[#293e30] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Creating listing..." : "Publish listing"}
                {!loading && <ArrowUpRight size={18} />}
              </button>
            </div>
          </form>

          <aside className="space-y-5 lg:sticky lg:top-24">
            <div className="overflow-hidden rounded-2xl bg-[#17291e] text-white">
              <div className="p-6">
                <div className="mb-5 flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#c2ce96]">
                    Listing preview
                  </span>
                  <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-[#dce6cb]">
                    Live
                  </span>
                </div>

                <div className="relative mb-5 overflow-hidden rounded-xl bg-white/10">
                  {formData.imageUrl.length > 0 ? (
                    <img
                      src={formData.imageUrl[0]}
                      alt="Property preview"
                      className="h-52 w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-52 flex-col items-center justify-center gap-3 text-[#a5b39e]">
                      <ImagePlus size={34} strokeWidth={1.5} />
                      <span className="text-xs">Your cover image appears here</span>
                    </div>
                  )}

                  <span className="absolute left-3 top-3 rounded-lg bg-[#e9edda] px-3 py-1.5 text-xs font-bold capitalize text-[#52612c]">
                    For {formData.type}
                  </span>
                </div>

                <h3 className="break-words text-xl font-bold">
                  {formData.name || "Your property name"}
                </h3>

                <div className="mt-3 flex items-center gap-2 text-sm text-[#b6c3b6]">
                  <MapPin size={16} className="shrink-0" />
                  <span className="break-words">
                    {formData.address || "Property location"}
                  </span>
                </div>

                <div className="mt-5 flex flex-wrap items-center gap-4 border-y border-white/10 py-4 text-sm text-[#d0d9cf]">
                  <span className="flex items-center gap-2">
                    <BedDouble size={17} />
                    {formData.bedrooms || "0"} beds
                  </span>
                  <span className="flex items-center gap-2">
                    <Bath size={17} />
                    {formData.bathrooms || "0"} baths
                  </span>
                  <span className="flex items-center gap-2">
                    <CarFront size={17} />
                    {formData.parking ? "Parking" : "Parking"}
                  </span>
                </div>

                <div className="mt-5">
                  {formData.offer &&
                    formData.regularPrice &&
                    Number(formData.regularPrice) >
                      Number(formData.discountedPrice) && (
                      <p className="mb-1 text-sm text-[#a5b39e] line-through">
                        KSh {Number(formData.regularPrice).toLocaleString()}
                      </p>
                    )}

                  <p className="text-2xl font-extrabold text-[#e8e98c]">
                    {formData.discountedPrice
                      ? `KSh ${Number(formData.discountedPrice).toLocaleString()}`
                      : "KSh 0"}
                  </p>
                  {formData.type === "rent" && (
                    <span className="mt-1 block text-xs text-[#a5b39e]">
                      Per month
                    </span>
                  )}
                </div>

                {formData.offer && (
                  <div className="mt-4 inline-flex items-center gap-2 rounded-lg bg-[#e8e98c]/10 px-3 py-2 text-xs font-bold text-[#e8e98c]">
                    <Tag size={14} />
                    Special offer
                  </div>
                )}
              </div>
            </div>

            <div className="rounded-2xl border border-[#e5e9e1] bg-white p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#edf0e4] text-[#758437]">
                  <FileText size={19} />
                </div>
                <div>
                  <h3 className="font-bold">Listing checklist</h3>
                  <p className="mt-1 text-xs text-[#879087]">
                    Complete your property details.
                  </p>
                </div>
              </div>

              <div className="mt-5 space-y-4">
                {[
                  ["Property name", !!formData.name],
                  ["Address", !!formData.address],
                  ["Description", !!formData.description],
                  ["Pricing", !!formData.regularPrice && !!formData.discountedPrice],
                  ["Property features", !!formData.bedrooms && !!formData.bathrooms],
                  ["At least one image", formData.imageUrl.length > 0],
                ].map(([label, complete]) => (
                  <div
                    key={label}
                    className="flex items-center justify-between gap-3 text-sm"
                  >
                    <span className="text-[#647067]">{label}</span>
                    <span
                      className={`flex h-5 w-5 items-center justify-center rounded-full ${
                        complete
                          ? "bg-[#e9edda] text-[#758437]"
                          : "bg-[#f0f2ee] text-[#a5aea5]"
                      }`}
                    >
                      {complete ? <Check size={13} /> : <Plus size={13} />}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-6 h-2 overflow-hidden rounded-full bg-[#edf0e9]">
                <div
                  className="h-full rounded-full bg-[#9caa45] transition-all"
                  style={{
                    width: `${
                      [
                        formData.name,
                        formData.address,
                        formData.description,
                        formData.regularPrice && formData.discountedPrice,
                        formData.bedrooms && formData.bathrooms,
                        formData.imageUrl.length > 0,
                      ].filter(Boolean).length * (100 / 6)
                    }%`,
                  }}
                />
              </div>
            </div>

            <div className="rounded-2xl border border-[#e5e9e1] bg-[#eef1e5] p-5">
              <div className="flex items-start gap-3">
                <Sparkles size={20} className="mt-0.5 shrink-0 text-[#758437]" />
                <div>
                  <h3 className="text-sm font-bold text-[#34432b]">
                    Make your listing stand out
                  </h3>
                  <p className="mt-2 text-xs leading-6 text-[#68745e]">
                    Use clear photos, accurate pricing, and a detailed
                    description to help people understand what your property
                    offers.
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>

      <footer className="border-t border-[#e6eae4] bg-white">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-6 text-xs text-[#879087] sm:flex-row sm:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} Zion'sHomes. All rights reserved.</p>
          <Link to="/" className="font-semibold transition hover:text-[#758437]">
            Explore properties
          </Link>
        </div>
      </footer>
    </div>
  );
}