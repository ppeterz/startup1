export default function Footer() {
  return (
    <footer className="py-6 border-t border-border/50">
      <div className="container mx-auto flex items-center justify-center px-4">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} CompetitorLens. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
