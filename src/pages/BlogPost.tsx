import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { posts } from "@/data/blog";
import { Calendar, Clock, Share2, Copy, ChevronLeft, ChevronRight, Tag as TagIcon, AlertCircle, Lightbulb, Terminal } from "lucide-react";

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
  const processInlineMarkdown = (text: string): React.ReactNode[] => {
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

  const isHeading = (text: string) => /^\s*#{1,4}\s+/.test(text);
  
  const isCodeBlock = (text: string) => text.trim().startsWith('```');
  const renderCodeBlock = (text: string, key: number) => {
    const lines = text.split('\n');
    const language = lines[0].replace('```', '').trim() || 'text';
    const code = lines.slice(1, -1).join('\n');
    
    return (
      <Card key={key} className="my-6 overflow-hidden bg-muted/50 border-primary/10">
        <div className="flex items-center gap-2 px-4 py-2 bg-muted/80 border-b border-primary/10">
          <Terminal className="h-4 w-4 text-primary" />
          <span className="text-xs font-medium text-muted-foreground uppercase">{language}</span>
          <Button 
            variant="ghost" 
            size="sm" 
            className="ml-auto h-7 text-xs"
            onClick={() => navigator.clipboard.writeText(code)}
          >
            <Copy className="h-3 w-3 mr-1" /> Copy
          </Button>
        </div>
        <pre className="p-4 overflow-x-auto">
          <code className="text-sm font-mono text-foreground leading-relaxed">{code}</code>
        </pre>
      </Card>
    );
  };
  
  const renderHeading = (text: string, key: number) => {
    const match = text.trim().match(/^(#{1,3})\s+(.+)$/);
    if (!match) return null;
    
    const level = match[1].length;
    const content = match[2];
    
    if (level === 1) {
      return <h1 key={key} className="text-3xl font-bold mt-12 mb-6 pb-3 border-b-2 border-primary/20 text-foreground">{processInlineMarkdown(content)}</h1>;
    } else if (level === 2) {
      return <h2 key={key} className="text-2xl font-semibold mt-10 mb-5 text-foreground flex items-center gap-3"><span className="inline-block w-1 h-6 bg-gradient-primary rounded"></span>{processInlineMarkdown(content)}</h2>;
    } else if (level === 3) {
      return <h3 key={key} className="text-xl font-semibold mt-8 mb-4 text-foreground">{processInlineMarkdown(content)}</h3>;
    } else if (level === 4) {
      return <h4 key={key} className="text-lg font-medium mt-6 mb-3 text-primary">{processInlineMarkdown(content)}</h4>;
    }
    return null;
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
      // Check for code blocks first
      if (isCodeBlock(block)) {
        elements.push(renderCodeBlock(block, k++));
        continue;
      }
      
      const lines = block.split(/\n/).filter((l) => l.trim().length > 0);
      if (lines.length === 0) continue;

      // Check if this block starts with a heading
      if (isHeading(lines[0])) {
        const heading = renderHeading(lines[0], k++);
        if (heading) {
          elements.push(heading);
        }
        
        // Process remaining lines in this block
        const remainingLines = lines.slice(1);
        if (remainingLines.length === 0) continue;
        
        // Continue with the remaining lines as a new block
        const remainingAllBullets = remainingLines.every(isBullet);
        const remainingAllNumbers = remainingLines.every(isNumbered);
        
        if (remainingAllBullets) {
          elements.push(
            <ul key={k++} className="list-disc pl-6">
              {remainingLines.map((l, i) => (
                <li key={i}>{processInlineMarkdown(stripBullet(l))}</li>
              ))}
            </ul>,
          );
          continue;
        }
        
        if (remainingAllNumbers) {
          elements.push(
            <ol key={k++} className="list-decimal pl-6">
              {remainingLines.map((l, i) => (
                <li key={i}>{processInlineMarkdown(stripNumber(l))}</li>
              ))}
            </ol>,
          );
          continue;
        }
        
        // Fallback paragraph for remaining lines
        elements.push(
          <p key={k++} className="whitespace-pre-line text-foreground leading-relaxed my-4">
            {processInlineMarkdown(remainingLines.join("\n"))}
          </p>,
        );
        continue;
      }

      const allBullets = lines.every(isBullet);
      const allNumbers = lines.every(isNumbered);

      if (allBullets) {
        elements.push(
          <ul key={k++} className="list-disc pl-7 space-y-2 my-6 marker:text-primary text-foreground">
            {lines.map((l, i) => (
              <li key={i} className="pl-2 leading-relaxed">{processInlineMarkdown(stripBullet(l))}</li>
            ))}
          </ul>,
        );
        continue;
      }

      if (allNumbers) {
        elements.push(
          <ol key={k++} className="list-decimal pl-7 space-y-2 my-6 marker:text-primary marker:font-semibold text-foreground">
            {lines.map((l, i) => (
              <li key={i} className="pl-2 leading-relaxed">{processInlineMarkdown(stripNumber(l))}</li>
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
                  <li key={i}>{processInlineMarkdown(stripBullet(l))}</li>
                ))}
              </ul>,
            );
          } else if (before.every(isNumbered)) {
            elements.push(
              <ol key={k++} className="list-decimal pl-6">
                {before.map((l, i) => (
                  <li key={i}>{processInlineMarkdown(stripNumber(l))}</li>
                ))}
              </ol>,
            );
          }
        }

        elements.push(
          <p key={k++} className="whitespace-pre-line text-foreground leading-relaxed my-4">
            {processInlineMarkdown(head)}
          </p>,
        );

        if (after.length) {
          if (after.every(isBullet)) {
            elements.push(
              <ul key={k++} className="list-disc pl-6">
                {after.map((l, i) => (
                  <li key={i}>{processInlineMarkdown(stripBullet(l))}</li>
                ))}
              </ul>,
            );
          } else if (after.every(isNumbered)) {
            elements.push(
              <ol key={k++} className="list-decimal pl-6">
                {after.map((l, i) => (
                  <li key={i}>{processInlineMarkdown(stripNumber(l))}</li>
                ))}
              </ol>,
            );
          } else {
            elements.push(
              <p key={k++} className="whitespace-pre-line">
                {processInlineMarkdown(after.join("\n"))}
              </p>,
            );
          }
        }
        continue;
      }

      // Fallback paragraph with preserved line breaks
      elements.push(
        <p key={k++} className="whitespace-pre-line leading-relaxed text-lg my-5 text-foreground">
          {processInlineMarkdown(lines.join("\n"))}
        </p>,
      );
    }

    return elements;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section with Featured Image */}
      <div className="relative w-full h-[450px] bg-gradient-to-br from-primary/10 via-background to-primary/5 overflow-hidden">
        {post.featuredImage && (
          <div className="absolute inset-0">
            <img 
              src={post.featuredImage.src} 
              alt={post.featuredImage.alt}
              className="w-full h-full object-cover opacity-30"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/80 to-background"></div>
          </div>
        )}
        <div className="relative container px-4 h-full flex flex-col justify-end pb-12 max-w-4xl">
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="secondary" className="bg-primary/20 text-primary border-primary/30">
                {tag}
              </Badge>
            ))}
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold leading-tight text-foreground mb-4">
            {post.title}
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl">{post.description}</p>
        </div>
      </div>

      <div className="container px-4 py-10 max-w-4xl">
        <nav className="text-sm text-muted-foreground mb-8">
          <Link to="/" className="hover:text-primary">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/blog" className="hover:text-primary">Blog</Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">{post.title}</span>
        </nav>

        {/* Article Meta */}
        <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground mb-10 pb-6 border-b border-border">
          <span className="inline-flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            <span className="font-medium">{new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
          </span>
          <span className="inline-flex items-center gap-2">
            <Clock className="h-5 w-5 text-primary" />
            <span className="font-medium">{rtime} min read</span>
          </span>
          <div className="ml-auto flex items-center gap-2">
            <Button size="sm" variant="outline" onClick={onCopy} className="hover:bg-primary/10">
              <Copy className="h-4 w-4 mr-1" /> Copy link
            </Button>
            <Button asChild size="sm" className="bg-gradient-primary hover:opacity-90">
              <a href={`https://wa.me/?text=${encodeURIComponent(post.title + " " + window.location.href)}`} target="_blank" rel="noreferrer">
                <Share2 className="h-4 w-4 mr-1" /> Share
              </a>
            </Button>
          </div>
        </div>

        <article className="prose prose-lg max-w-none">
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
