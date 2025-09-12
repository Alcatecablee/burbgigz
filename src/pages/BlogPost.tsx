import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { posts } from "@/data/blog";
import { Calendar, Clock, Share2, Copy, ChevronLeft, ChevronRight, Tag as TagIcon } from "lucide-react";

const wordsPerMinute = 200;
const readingTime = (text: string) => Math.max(1, Math.ceil(text.split(/\s+/).length / wordsPerMinute));

const BlogPost = () => {
  const { slug } = useParams();
  const index = posts.findIndex((p) => p.slug === slug);
  const post = index >= 0 ? posts[index] : undefined;
  const prev = index > 0 ? posts[index - 1] : undefined;
  const next = index >= 0 && index < posts.length - 1 ? posts[index + 1] : undefined;

  useEffect(() => {
    if (post) {
      document.title = `${post.title} | Blog`;
    }
  }, [post]);

  if (!post) {
    return (
      <div className="container px-4 py-16">
        <h1 className="text-2xl font-bold mb-4">Article not found</h1>
        <Button asChild variant="outline">
          <Link to="/blog">Back to Blog</Link>
        </Button>
      </div>
    );
  }

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
    } catch {}
  };

  const rtime = readingTime(post.content);
  const related = posts.filter((p) => p.slug !== post.slug && p.tags.some((t) => post.tags.includes(t))).slice(0, 3);
  const processMarkdown = (text: string): React.ReactNode[] => {
    const parts: React.ReactNode[] = [];
    let lastIndex = 0;
    let keyCounter = 0;

    // Process **bold** and *italic* patterns
    const markdownRegex = /(\*\*([^*]+)\*\*|\*([^*]+)\*)/g;
    let match;

    while ((match = markdownRegex.exec(text)) !== null) {
      // Add text before the match
      if (match.index > lastIndex) {
        parts.push(text.slice(lastIndex, match.index));
      }

      // Add the formatted text
      if (match[0].startsWith('**')) {
        // Bold text
        parts.push(<strong key={keyCounter++}>{match[2]}</strong>);
      } else {
        // Italic text  
        parts.push(<em key={keyCounter++}>{match[3]}</em>);
      }

      lastIndex = match.index + match[0].length;
    }

    // Add remaining text
    if (lastIndex < text.length) {
      parts.push(text.slice(lastIndex));
    }

    return parts.length > 0 ? parts : [text];
  };

  const renderContent = (raw: string) => {
    const blocks = raw.split(/\n\n+/);
    const elements: JSX.Element[] = [];
    let k = 0;

    const isBullet = (s: string) => /^([\u2022\-])\s+/.test(s.trim());
    const isNumbered = (s: string) => /^\d+[\).]\s+/.test(s.trim());
    const stripBullet = (s: string) => s.replace(/^([\u2022\-])\s+/, "");
    const stripNumber = (s: string) => s.replace(/^\d+[\).]\s+/, "");

    for (const block of blocks) {
      const lines = block.split(/\n/).filter((l) => l.trim().length > 0);
      if (lines.length === 0) continue;

      const allBullets = lines.every(isBullet);
      const allNumbers = lines.every(isNumbered);

      if (allBullets) {
        elements.push(
          <ul key={k++} className="list-disc pl-6">
            {lines.map((l, i) => (
              <li key={i}>{processMarkdown(stripBullet(l))}</li>
            ))}
          </ul>,
        );
        continue;
      }

      if (allNumbers) {
        elements.push(
          <ol key={k++} className="list-decimal pl-6">
            {lines.map((l, i) => (
              <li key={i}>{processMarkdown(stripNumber(l))}</li>
            ))}
          </ol>,
        );
        continue;
      }

      // Mixed: leading sentence then bullets or numbers
      const firstNonList = lines.findIndex((l) => !isBullet(l) && !isNumbered(l));
      if (firstNonList !== -1) {
        const head = lines[firstNonList];
        const before = lines.slice(0, firstNonList);
        const after = lines.slice(firstNonList + 1);

        if (before.length) {
          // If bullets/numbers before, render as list
          if (before.every(isBullet)) {
            elements.push(
              <ul key={k++} className="list-disc pl-6">
                {before.map((l, i) => (
                  <li key={i}>{processMarkdown(stripBullet(l))}</li>
                ))}
              </ul>,
            );
          } else if (before.every(isNumbered)) {
            elements.push(
              <ol key={k++} className="list-decimal pl-6">
                {before.map((l, i) => (
                  <li key={i}>{processMarkdown(stripNumber(l))}</li>
                ))}
              </ol>,
            );
          }
        }

        elements.push(
          <p key={k++} className="whitespace-pre-line">
            {processMarkdown(head)}
          </p>,
        );

        if (after.length) {
          if (after.every(isBullet)) {
            elements.push(
              <ul key={k++} className="list-disc pl-6">
                {after.map((l, i) => (
                  <li key={i}>{processMarkdown(stripBullet(l))}</li>
                ))}
              </ul>,
            );
          } else if (after.every(isNumbered)) {
            elements.push(
              <ol key={k++} className="list-decimal pl-6">
                {after.map((l, i) => (
                  <li key={i}>{processMarkdown(stripNumber(l))}</li>
                ))}
              </ol>,
            );
          } else {
            elements.push(
              <p key={k++} className="whitespace-pre-line">
                {processMarkdown(after.join("\n"))}
              </p>,
            );
          }
        }
        continue;
      }

      // Fallback paragraph with preserved line breaks
      elements.push(
        <p key={k++} className="whitespace-pre-line">
          {processMarkdown(lines.join("\n"))}
        </p>,
      );
    }

    return elements;
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container px-4 py-10 max-w-3xl">
        <nav className="text-sm text-muted-foreground mb-6">
          <Link to="/" className="hover:text-primary">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/blog" className="hover:text-primary">Blog</Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">{post.title}</span>
        </nav>

        <header className="space-y-4 mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold leading-tight">{post.title}</h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1"><Calendar className="h-4 w-4" />{new Date(post.date).toLocaleDateString()}</span>
            <span className="inline-flex items-center gap-1"><Clock className="h-4 w-4" />{rtime} min read</span>
            <span className="inline-flex items-center gap-1"><TagIcon className="h-4 w-4" />{post.tags.join(", ")}</span>
            <div className="ml-auto flex items-center gap-2">
              <Button size="sm" variant="outline" onClick={onCopy}>
                <Copy className="h-4 w-4" /> Copy link
              </Button>
              <Button asChild size="sm" className="bg-gradient-primary">
                <a href={`https://wa.me/?text=${encodeURIComponent(post.title + " " + window.location.href)}`} target="_blank" rel="noreferrer">
                  <Share2 className="h-4 w-4" /> Share
                </a>
              </Button>
            </div>
          </div>
        </header>

        <article className="prose prose-lg prose-neutral dark:prose-invert prose-p:my-4 prose-ul:my-4 prose-ol:my-4 max-w-none">
          {renderContent(post.content)}
        </article>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <Button asChild variant="outline">
            <Link to="/blog">Back to Blog</Link>
          </Button>
          {prev && (
            <Button asChild variant="ghost">
              <Link to={`/blog/${prev.slug}`} className="inline-flex items-center"><ChevronLeft className="h-4 w-4" />Prev</Link>
            </Button>
          )}
          {next && (
            <Button asChild variant="ghost">
              <Link to={`/blog/${next.slug}`} className="inline-flex items-center">Next<ChevronRight className="h-4 w-4" /></Link>
            </Button>
          )}
        </div>

        {related.length > 0 && (
          <section className="mt-12">
            <h2 className="text-xl font-semibold mb-4">Related articles</h2>
            <ul className="list-disc pl-5 space-y-2">
              {related.map((r) => (
                <li key={r.slug}>
                  <Link to={`/blog/${r.slug}`} className="hover:text-primary">{r.title}</Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default BlogPost;
