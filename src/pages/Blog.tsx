import { Link, useSearchParams } from "react-router-dom";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { posts } from "@/data/blog";
import { Calendar, Clock, Tag } from "lucide-react";

const wordsPerMinute = 200;
const readingTime = (text: string) => Math.max(1, Math.ceil(text.split(/\s+/).length / wordsPerMinute));

const Blog = () => {
  const [params, setParams] = useSearchParams();
  const activeTag = params.get("tag");

  const allTags = Array.from(new Set(posts.flatMap((p) => p.tags))).sort();
  const filtered = activeTag ? posts.filter((p) => p.tags.includes(activeTag)) : posts;
  const sorted = [...filtered].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <div className="min-h-screen bg-background">
      <div className="container px-4 py-12">
        <nav className="text-sm text-muted-foreground mb-6">
          <Link to="/" className="hover:text-primary">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">Blog</span>
        </nav>

        <div className="space-y-3 mb-8 text-center">
          <Badge variant="outline" className="mb-2">Blog</Badge>
          <h1 className="text-3xl lg:text-4xl font-bold">Remote Support & IT Guides for Lombardy East</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Long‑form, practical articles for Johannesburg homes and small businesses: Remote Support, Windows, Wi‑Fi, printers, upgrades and security.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 mb-8">
          <Tag className="h-4 w-4 text-primary" />
          <Button
            variant={activeTag ? "outline" : "secondary"}
            size="sm"
            onClick={() => setParams({})}
          >
            All
          </Button>
          {allTags.map((t) => (
            <Button
              key={t}
              variant={activeTag === t ? "secondary" : "outline"}
              size="sm"
              onClick={() => setParams({ tag: t })}
            >
              {t}
            </Button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sorted.map((p) => (
            <Card key={p.slug} className="bg-gradient-card border-0 shadow-soft hover:shadow-medium transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-xl">
                  <Link to={`/blog/${p.slug}`} className="hover:text-primary">{p.title}</Link>
                </CardTitle>
                <CardDescription className="flex items-center gap-4">
                  <span className="inline-flex items-center gap-1"><Calendar className="h-4 w-4" />{new Date(p.date).toLocaleDateString()}</span>
                  <span className="inline-flex items-center gap-1"><Clock className="h-4 w-4" />{readingTime(p.content)} min read</span>
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">{p.description}</p>
                <div className="flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <Badge key={t} variant="secondary">{t}</Badge>
                  ))}
                </div>
                <Button asChild className="bg-gradient-primary">
                  <Link to={`/blog/${p.slug}`}>Read Article</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Blog;
