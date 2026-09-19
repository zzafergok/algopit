import { ExternalLink } from 'lucide-react';
import { Link } from '@/components/core/link';
import { FooterSection as FooterSectionType } from '@/types/navigation';
import { cn } from '@/lib/utils';

interface FooterSectionProps {
  section: FooterSectionType;
}

export const FooterSection = ({ section }: FooterSectionProps) => {
  return (
    <div className="space-y-4">
      <h4 className="text-sm font-semibold text-ink font-mono uppercase tracking-wide">
        {section.title}
      </h4>
      <nav className="space-y-3">
        {section.links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              'flex items-center gap-2 text-sm text-muted font-mono',
              'hover:text-ink transition-colors duration-200',
              'hover:translate-x-1 transform transition-transform',
              'group',
            )}
            target={link.isExternal ? '_blank' : undefined}
          >
            <span className="group-hover:underline underline-offset-2">
              {link.label}
            </span>
            {link.isExternal && (
              <ExternalLink className="h-3 w-3 opacity-60 transition-opacity group-hover:opacity-100" />
            )}
          </Link>
        ))}
      </nav>
    </div>
  );
};
