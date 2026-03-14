import type { Citation } from "@/types";

function formatAuthors(authors: string[]): string {
  if (authors.length === 1) return authors[0];
  if (authors.length === 2) return `${authors[0]}, & ${authors[1]}`;
  if (authors.length <= 20) {
    const allButLast = authors.slice(0, -1).join(", ");
    return `${allButLast}, & ${authors[authors.length - 1]}`;
  }
  // 21+ authors: first 19, ..., last
  const first19 = authors.slice(0, 19).join(", ");
  return `${first19}, ... ${authors[authors.length - 1]}`;
}

export function formatApa(citation: Citation): string {
  const authors = formatAuthors(citation.authors);
  const year = `(${citation.year})`;

  switch (citation.type) {
    case "journal": {
      let ref = `${authors} ${year}. ${citation.title}. *${citation.source}*`;
      if (citation.volume) {
        ref += `, *${citation.volume}*`;
        if (citation.issue) ref += `(${citation.issue})`;
      }
      if (citation.pages) ref += `, ${citation.pages}`;
      ref += ".";
      if (citation.doi) ref += ` https://doi.org/${citation.doi}`;
      return ref;
    }
    case "book": {
      let ref = `${authors} ${year}. *${citation.title}*. ${citation.source}.`;
      if (citation.url) ref += ` ${citation.url}`;
      return ref;
    }
    case "website": {
      let ref = `${authors} ${year}. *${citation.title}*. ${citation.source}.`;
      if (citation.url) ref += ` ${citation.url}`;
      return ref;
    }
    case "report": {
      let ref = `${authors} ${year}. *${citation.title}*. ${citation.source}.`;
      if (citation.url) ref += ` ${citation.url}`;
      return ref;
    }
  }
}
