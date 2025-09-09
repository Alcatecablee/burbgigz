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
  const paragraphs = post.content.split("\n\n");

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

        <article className="prose prose-neutral dark:prose-invert max-w-none">
          {paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
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
