import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { posts } from "@/data/blog";

const BlogPost = () => {
  const { slug } = useParams();
  const post = posts.find((p) => p.slug === slug);

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

  const paragraphs = post.content.split("\n\n");

  return (
    <div className="min-h-screen bg-background">
      <div className="container px-4 py-16 max-w-3xl">
        <div className="space-y-3 mb-6">
          <Badge variant="outline">{new Date(post.date).toLocaleDateString()}</Badge>
          <h1 className="text-3xl lg:text-4xl font-bold">{post.title}</h1>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((t) => (
              <Badge key={t} variant="secondary">{t}</Badge>
            ))}
          </div>
        </div>

        <article className="prose prose-neutral dark:prose-invert max-w-none">
          {paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </article>

        <div className="mt-10 flex items-center gap-3">
          <Button asChild variant="outline">
            <Link to="/blog">Back to Blog</Link>
          </Button>
          <Button asChild className="bg-gradient-primary">
            <a href="/">Home</a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
