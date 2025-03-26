import createDOMPurify from 'isomorphic-dompurify';

const DOMPurify = createDOMPurify();

export function sanitizeHtml(htmlString: string) {
	if (typeof window !== 'undefined') {
	  return DOMPurify.sanitize(htmlString);
	}
	// Optionally handle server-side rendering case
	return htmlString;
  }