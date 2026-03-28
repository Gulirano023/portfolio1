const Footer = () => (
  <footer className="border-t border-border py-8">
    <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
      <p className="text-sm text-muted-foreground">
        © {new Date().getFullYear()} Gulirano Jumanazarova. All rights reserved.
      </p>
      <p className="text-xs text-muted-foreground">
        Designed & built with 💜
      </p>
    </div>
  </footer>
);

export default Footer;
