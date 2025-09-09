import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { posts } from "@/data/blog";

const Blog = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container px-4 py-16">
        <div className="text-center space-y-4 mb-12">
          <Badge variant="outline" className="mb-2">Blog</Badge>
          <h1 className="text-3xl lg:text-4xl font-bold">IT Support Tips for Lombardy East & Johannesburg</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Long‑form guides on Remote Support, upgrades, Wi‑Fi, Windows and more — written for local homes and small businesses.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((p) => (
            <Card key={p.slug} className="bg-gradient-card border-0 shadow-soft hover:shadow-medium transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-xl">{p.title}</CardTitle>
                <CardDescription>{new Date(p.date).toLocaleDateString()}</CardDescription>
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
    </div>
  );
};

export default Blog;
