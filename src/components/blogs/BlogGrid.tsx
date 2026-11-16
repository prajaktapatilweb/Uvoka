"use client";

import { useState, useMemo } from "react";
import { Search, Filter, BookOpen } from "lucide-react";
import { BlogPost } from "@/sanity/types";
import { BlogCard } from "./BlogCard";

interface BlogGridProps {
  initialPosts: BlogPost[];
}

export function BlogGrid({ initialPosts }: BlogGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Extract unique categories from posts
  const categories = useMemo(() => {
    const set = new Set<string>();
    set.add("All");
    initialPosts.forEach((post) => {
      post.categories?.forEach((cat) => {
        if (cat.title) set.add(cat.title);
      });
    });
    return Array.from(set);
  }, [initialPosts]);

  // Filter posts based on category and search query
  const filteredPosts = useMemo(() => {
    return initialPosts.filter((post) => {
      const matchesCategory =
        selectedCategory === "All" ||
        post.categories?.some((cat) => cat.title.toLowerCase() === selectedCategory.toLowerCase());

      const matchesSearch =
        searchQuery.trim() === "" ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt?.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [initialPosts, selectedCategory, searchQuery]);

  const featuredPost = useMemo(() => {
    return initialPosts.find((p) => p.featured) || initialPosts[0];
  }, [initialPosts]);

  const gridPosts = useMemo(() => {
    if (selectedCategory === "All" && !searchQuery.trim() && featuredPost) {
      return filteredPosts.filter((p) => p._id !== featuredPost._id);
    }
    return filteredPosts;
  }, [filteredPosts, selectedCategory, searchQuery, featuredPost]);

  return (
    <div className="space-y-12">
      {/* ── Search & Filter Controls ── */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-6 p-4 rounded-2xl bg-[var(--color-ivory)]/40 border border-[var(--color-border)]">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider flex items-center gap-1.5 mr-2">
            <Filter className="w-3.5 h-3.5" />
            Topic:
          </span>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                selectedCategory === category
                  ? "bg-[var(--color-primary)] text-white shadow-sm"
                  : "bg-white text-[var(--color-text-secondary)] hover:text-[var(--color-charcoal)] border border-[var(--color-border)]"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative min-w-[260px]">
          <Search className="w-4 h-4 text-[var(--color-text-muted)] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search articles..."
            className="w-full pl-10 pr-4 py-2 rounded-xl text-xs sm:text-sm bg-white border border-[var(--color-border)] focus:border-[var(--color-primary)] focus:outline-none text-[var(--color-charcoal)] placeholder:text-[var(--color-text-muted)]"
          />
        </div>
      </div>

      {/* ── Featured Post Banner (Only when on 'All' and no search filter) ── */}
      {selectedCategory === "All" && !searchQuery.trim() && featuredPost && (
        <div>
          <BlogCard post={featuredPost} variant="featured" />
        </div>
      )}

      {/* ── Articles Grid ── */}
      {gridPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {gridPosts.map((post) => (
            <BlogCard key={post._id} post={post} variant="standard" />
          ))}
        </div>
      ) : (
        <div className="py-16 text-center space-y-4 card-premium bg-[var(--color-ivory)]/30 p-8">
          <BookOpen className="w-8 h-8 text-[var(--color-text-muted)] mx-auto opacity-60" />
          <h3 className="text-lg font-heading font-bold text-[var(--color-charcoal)]">
            No Articles Found
          </h3>
          <p className="text-sm text-[var(--color-text-secondary)] max-w-sm mx-auto">
            No published essays match the current topic or search keyword. Try selecting &ldquo;All&rdquo; or adjusting your search term.
          </p>
        </div>
      )}
    </div>
  );
}
