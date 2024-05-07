export default function Footer({ isTable }: { isTable?: boolean }) {
  if (isTable) {
    return (
      <footer className="absolute bottom-1 right-4">
        <a
          className="text-sm"
          href="https://www.yascastro.com.br"
          target="_blank"
        >
          © 2024 Yas Castro.
        </a>
      </footer>
    );
  }
  return (
    <footer className="absolute bottom-1">
      <a
        className="text-sm"
        href="https://www.yascastro.com.br"
        target="_blank"
      >
        © 2024 Yas Castro.
      </a>
    </footer>
  );
}
